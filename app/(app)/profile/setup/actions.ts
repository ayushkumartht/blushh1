'use server'

import { createClient } from '@/lib/supabase/server'
import { profileSchema } from '@/lib/schemas'
import { mutationRateLimit } from '@/lib/ratelimit'
import { sanitizeContent } from '@/lib/validations'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function setupProfile(formData: FormData) {
  const head = await headers()
  const ip = head.get('x-forwarded-for') || '127.0.0.1'
  
  const { success } = await mutationRateLimit.limit(ip)
  if (!success) {
    return { error: 'Rate limit exceeded. Please wait.' }
  }

  const rawData = Object.fromEntries(formData.entries())
  const validation = profileSchema.safeParse({
    ...rawData,
    age: parseInt(rawData.age as string)
  })

  if (!validation.success) {
    return { error: validation.error.format()._errors?.[0] || 'Invalid profile data' }
  }

  const { bio, age, gender, instagram_handle } = validation.data
  const photo = formData.get('photo') as File

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  let photo_url = null
  if (photo && photo.size > 0) {
    // Only allow common image formats
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(photo.type)) {
      return { error: 'Invalid photo format. Use JPG, PNG or WebP.' }
    }

    const fileExt = photo.name.split('.').pop()
    const fileName = `${user.id}-${Math.random()}.${fileExt}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, photo)
    
    if (uploadError) return { error: uploadError.message }
    photo_url = uploadData.path
  }

  // Insert profile row
  const { error } = await supabase
    .from('profiles')
    .insert({
      id: user.id, // IDOR protection: force user ID from session
      name: user.user_metadata.full_name, // Always take name from auth metadata
      college_email: user.email,
      bio: sanitizeContent(bio || ''),
      age,
      gender,
      photo_url,
      instagram_handle,
    })

  if (error) {
    return { error: error.message }
  }

  return redirect('/feed')
}

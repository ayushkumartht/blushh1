'use server'

import { createClient, createAdminClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function setupProfile(formData: FormData) {
  const bio = formData.get('bio') as string
  const age = parseInt(formData.get('age') as string)
  const gender = formData.get('gender') as string
  const instagram_handle = formData.get('instagram_handle') as string
  const photo = formData.get('photo') as File

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  let photo_url = null
  if (photo && photo.size > 0) {
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
      id: user.id,
      name: user.user_metadata.full_name,
      college_email: user.email,
      bio,
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

'use server'

import { createClient, createAdminClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
  const bio = formData.get('bio') as string
  const age = parseInt(formData.get('age') as string)
  const gender = formData.get('gender') as string
  const instagram_handle = formData.get('instagram_handle') as string

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Supabase RLS will block the `name` column from being updated
  const { error } = await supabase
    .from('profiles')
    .update({ bio, age, gender, instagram_handle })
    .eq('id', user.id)

  if (error) return { error: error.message }
  return { success: true }
}

export async function deleteAccount() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Soft delete first
  const { error } = await supabase
    .from('profiles')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', user.id)

  if (error) return { error: error.message }

  // Logout and delete auth session
  await supabase.auth.signOut()
  return redirect('/login')
}

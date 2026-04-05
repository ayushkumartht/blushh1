'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function sendRequest(receiver_id: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('requests')
    .insert({
      sender_id: user.id,
      receiver_id,
      status: 'pending'
    })

  if (error) return { error: error.message }
  revalidatePath('/feed')
  return { success: true }
}

export async function updateRequestStatus(request_id: string, status: 'accepted' | 'declined') {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('requests')
    .update({ status })
    .eq('id', request_id)
    .eq('receiver_id', user.id) // Security: only receiver can update

  if (error) return { error: error.message }
  revalidatePath('/requests')
  return { success: true }
}

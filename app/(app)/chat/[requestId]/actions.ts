'use server'

import { createClient } from '@/lib/supabase/server'
import { messageSchema } from '@/lib/schemas'
import { sanitizeContent } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function sendMessage(requestId: string, content: string) {

  const validation = messageSchema.safeParse({ content })
  if (!validation.success) {
    return { error: validation.error.format()._errors?.[0] || 'Invalid message' }
  }

  const sanitizedContent = sanitizeContent(validation.data.content)
  if (!sanitizedContent) return { error: 'Message cannot be empty' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // RLS will double check if they are part of an accepted request
  const { error } = await supabase
    .from('messages')
    .insert({
      request_id: requestId,
      sender_id: user.id, // Always overwrite with auth user ID
      content: sanitizedContent
    })

  if (error) return { error: error.message }
  revalidatePath(`/chat/${requestId}`)
  return { success: true }
}

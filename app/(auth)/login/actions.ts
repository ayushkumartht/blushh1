'use server'

import { createClient } from '@/lib/supabase/server'
import { loginSchema } from '@/lib/schemas'
import { authRateLimit } from '@/lib/ratelimit'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const head = await headers()
  const ip = head.get('x-forwarded-for') || '127.0.0.1'
  
  const { success } = await authRateLimit.limit(ip)
  if (!success) {
    return { error: 'Too many requests. Please try again later.' }
  }

  const rawData = Object.fromEntries(formData.entries())
  const validation = loginSchema.safeParse(rawData)

  if (!validation.success) {
    return { error: 'Invalid email or password format' }
  }

  const { email, password } = validation.data

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return redirect('/feed')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}

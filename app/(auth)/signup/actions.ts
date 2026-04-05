'use server'

import { createClient } from '@/lib/supabase/server'
import { signupSchema } from '@/lib/schemas'
import { authRateLimit } from '@/lib/ratelimit'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
  const head = await headers()
  const ip = head.get('x-forwarded-for') || '127.0.0.1'
  
  const { success } = await authRateLimit.limit(ip)
  if (!success) {
    return { error: 'Too many requests. Please try again later.' }
  }

  const rawData = Object.fromEntries(formData.entries())
  const validation = signupSchema.safeParse(rawData)

  if (!validation.success) {
    return { error: validation.error.format()._errors?.[0] || 'Invalid input' }
  }

  const { email, password, name } = validation.data

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  return redirect('/verify')
}

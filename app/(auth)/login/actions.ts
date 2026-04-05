'use server'

import { createClient } from '@/lib/supabase/server'
import { loginSchema, otpSchema, verifyOtpSchema } from '@/lib/schemas'
import { redirect } from 'next/navigation'

/**
 * Standard Password Login
 */
export async function signIn(formData: FormData) {
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

/**
 * Send Email OTP
 */
export async function sendOtp(formData: FormData) {
  const email = formData.get('email') as string
  const validation = otpSchema.safeParse({ email })
  if (!validation.success) return { error: validation.error.format()._errors?.[0] }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithOtp({
    email: validation.data.email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
      shouldCreateUser: true,
    }
  })

  if (error) return { error: error.message }
  return { success: true }
}

/**
 * Verify Email OTP Token
 */
export async function verifyOtp(formData: FormData) {
  const email = formData.get('email') as string
  const token = formData.get('token') as string
  
  const validation = verifyOtpSchema.safeParse({ email, token })
  if (!validation.success) return { error: validation.error.format()._errors?.[0] }

  const supabase = await createClient()
  const { error } = await supabase.auth.verifyOtp({
    email: validation.data.email,
    token: validation.data.token,
    type: 'email',
  })

  if (error) return { error: error.message }
  return redirect('/feed')
}

/**
 * Google Login with KIET Restriction
 */
export async function signInWithGoogle() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
      queryParams: {
        hd: 'kiet.edu', // Strictly restrict to KIET domain at Google level
        prompt: 'select_account',
      },
    },
  })

  if (error) return { error: error.message }
  if (data.url) redirect(data.url)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}

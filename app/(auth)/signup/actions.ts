'use server'

import { createClient } from '@/lib/supabase/server'
import { isAllowedCollegeDomain, validateEmail } from '@/lib/validations'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  if (!validateEmail(email)) {
    return { error: 'Invalid email format' }
  }

  if (!isAllowedCollegeDomain(email)) {
    return { error: 'Only allowed college domains can register' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' }
  }

  const supabase = createClient()
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

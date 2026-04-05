import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a server-side Supabase client.
 * In development, if environment variables are missing, it returns a 
 * Proxy to prevent immediate crash, allowing the UI to render.
 */
export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are missing. Auth features will be disabled.')
    return new Proxy({} as any, {
      get: (target, prop) => {
        // If they try to access 'auth' or other properties, return a dummy function/object
        return () => { 
          return {
            error: { message: 'Supabase not configured' },
            data: { session: null, user: null, url: null }
          }
        }
      }
    })
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Can be ignored if middleware handles refresh
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Can be ignored if middleware handles refresh
          }
        },
      },
    }
  )
}

/**
 * Admin client with full privileges.
 */
export async function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
     throw new Error('Missing Supabase Service Role configuration')
  }

  return createServerClient(
    supabaseUrl,
    serviceRoleKey,
    {
      cookies: {}, 
    }
  )
}

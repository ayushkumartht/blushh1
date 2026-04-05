import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a client-side Supabase client.
 * Safe for development when environment variables are missing.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase Client environment variables are missing.')
    // Return a dummy client to prevent runtime crashes during initial UI development
    return new Proxy({} as any, {
      get: () => () => ({
        data: { session: null, user: null },
        error: { message: 'Supabase URL or Key missing in .env.local' }
      })
    })
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

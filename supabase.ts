import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL
export const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using demo mode.')
}

export const isDemoMode = !supabaseUrl || !supabaseAnonKey

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://demo.supabase.co', 'demo-key')

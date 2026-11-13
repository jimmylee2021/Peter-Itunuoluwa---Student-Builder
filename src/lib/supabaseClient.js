import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// This exports the boolean flag your component checks:
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

let supabaseInstance = null

// This exports the async client getter your component calls:
export async function getSupabaseClient() {
  if (!supabaseInstance && isSupabaseConfigured) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}
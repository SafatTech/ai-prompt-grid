/**
 * Supabase public env helpers.
 * Supports both classic anon key and newer publishable key names.
 */

export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || undefined;
}

/** anon key OR publishable key (Supabase dashboard naming varies). */
export function getSupabaseAnonKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    undefined
  );
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}

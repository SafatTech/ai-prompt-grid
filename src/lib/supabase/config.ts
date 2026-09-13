/**
 * Returns true when public Supabase env vars are present.
 * Foundation pages stay usable without a project configured yet.
 */
export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

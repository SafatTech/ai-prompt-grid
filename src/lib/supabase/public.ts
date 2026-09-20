import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getPublicSupabaseConfig } from "@/lib/env";

/**
 * Cookie-free anon client for public catalog reads.
 * Safe in generateStaticParams / build — does not call next/headers cookies().
 */
export function createPublicSupabaseClient(): SupabaseClient | null {
  const config = getPublicSupabaseConfig();
  if (!config) return null;

  return createClient(config.url, config.anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

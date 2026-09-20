import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getPublicSupabaseConfig } from "@/lib/env";

/**
 * Browser Supabase client. Returns null when env is not configured
 * (catalog falls back to static seed).
 * Do not import the service role key into any client module.
 */
export function createBrowserSupabaseClient(): SupabaseClient | null {
  const config = getPublicSupabaseConfig();
  if (!config) return null;
  return createBrowserClient(config.url, config.anonKey);
}

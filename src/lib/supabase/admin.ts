import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getPublicSupabaseConfig, getServiceRoleKey } from "@/lib/env";

/**
 * Service-role client for seeding and trusted server jobs only.
 * Never import this module from client components or expose the key.
 */
export function createAdminSupabaseClient(): SupabaseClient {
  const config = getPublicSupabaseConfig();
  const serviceRoleKey = getServiceRoleKey();

  if (!config || !serviceRoleKey) {
    throw new Error(
      "Admin Supabase client requires NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createClient(config.url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

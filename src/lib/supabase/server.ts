import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { getPublicSupabaseConfig } from "@/lib/env";

/**
 * Server Supabase client with cookie session handling.
 * Returns null when env is not configured (catalog falls back to static seed).
 */
export async function createServerSupabaseClient(): Promise<SupabaseClient | null> {
  const config = getPublicSupabaseConfig();
  if (!config) return null;

  const cookieStore = await cookies();

  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component where cookies are read-only.
          // Middleware (Phase 4) will refresh sessions when Auth is wired.
        }
      },
    },
  });
}

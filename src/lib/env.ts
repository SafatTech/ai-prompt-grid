import { z } from "zod";
import {
  getPublicSupabaseConfig as getPublicSupabaseConfigLite,
  isSupabaseConfigured as isSupabaseConfiguredLite,
  type PublicSupabaseConfig,
} from "@/lib/env-public";

export type { PublicSupabaseConfig };

/**
 * Shared env schema. Validated when Supabase clients are created on the server.
 * Public keys may be empty so the app can run on static seed fallback.
 */
export const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().optional().or(z.literal("")),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional().or(z.literal("")),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
});

export const serverEnvSchema = publicEnvSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
});

/** Client-safe: no zod. Prefer this from "use client" modules. */
export function getPublicSupabaseConfig(): PublicSupabaseConfig | null {
  return getPublicSupabaseConfigLite();
}

/** Client-safe: no zod. Prefer this from "use client" modules. */
export function isSupabaseConfigured(): boolean {
  return isSupabaseConfiguredLite();
}

export function getServiceRoleKey(): string | null {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return key && key.length > 0 ? key : null;
}

import { z } from "zod";

/**
 * Shared env schema. Validated when Supabase clients are created.
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

export type PublicSupabaseConfig = {
  url: string;
  anonKey: string;
};

export function getPublicSupabaseConfig(): PublicSupabaseConfig | null {
  const parsed = publicEnvSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "",
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  });

  if (!parsed.success) return null;

  const url = parsed.data.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = parsed.data.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  return getPublicSupabaseConfig() !== null;
}

export function getServiceRoleKey(): string | null {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return key && key.length > 0 ? key : null;
}

/**
 * Client-safe public env helpers — no zod (keeps ~90 KB out of every page).
 * Server boot validation stays in env.ts via zod schemas.
 */

export type PublicSupabaseConfig = {
  url: string;
  anonKey: string;
};

function readPublicUrl(value: string | undefined): string {
  return (value ?? "").trim();
}

export function getPublicSupabaseConfig(): PublicSupabaseConfig | null {
  const url = readPublicUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const anonKey = readPublicUrl(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (!url || !anonKey) return null;
  if (!/^https?:\/\//i.test(url)) return null;
  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  return getPublicSupabaseConfig() !== null;
}

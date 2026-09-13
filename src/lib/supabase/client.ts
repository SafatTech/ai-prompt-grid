import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function createClient() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

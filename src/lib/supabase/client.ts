import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";
import {
  getSupabaseAnonKey,
  getSupabaseUrl,
  isSupabaseConfigured,
} from "@/lib/supabase/config";

export function createClient() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    );
  }

  return createBrowserClient<Database>(
    getSupabaseUrl()!,
    getSupabaseAnonKey()!,
  );
}

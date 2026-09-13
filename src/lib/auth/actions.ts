"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

function siteOrigin() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return "http://localhost:3000";
}

async function callbackUrl(next?: string) {
  const origin = siteOrigin();
  const url = new URL("/auth/callback", origin);
  if (next) url.searchParams.set("next", next);
  return url.toString();
}

export type AuthActionResult = {
  ok: boolean;
  message: string;
};

export async function signInWithMagicLink(
  _prev: AuthActionResult | null,
  formData: FormData,
): Promise<AuthActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message: "Supabase is not configured. Add keys to .env.local.",
    };
  }

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const next = String(formData.get("next") ?? "/account");
  const mode = String(formData.get("mode") ?? "login");

  if (!email || !email.includes("@")) {
    return { ok: false, message: "Enter a valid email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: await callbackUrl(next),
      shouldCreateUser: true,
      data: { signup_source: mode },
    },
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  return {
    ok: true,
    message: "Check your email for the magic link to continue.",
  };
}

export async function signInWithGoogleAction(formData: FormData) {
  const next = String(formData.get("next") ?? "/account");
  await signInWithGoogle(next.startsWith("/") ? next : "/account");
}

export async function signInWithGoogle(next = "/account") {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  const supabase = await createClient();
  const headerStore = await headers();
  const origin =
    headerStore.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin.replace(/\/$/, "")}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error || !data.url) {
    redirect(`/login?error=${encodeURIComponent(error?.message ?? "oauth_failed")}`);
  }

  redirect(data.url);
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}

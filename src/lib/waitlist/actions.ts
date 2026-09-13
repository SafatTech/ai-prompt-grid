"use server";

import type { WaitlistInterest } from "@/lib/database.types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type WaitlistResult = {
  ok: boolean;
  message: string;
};

export async function joinWaitlist(
  _prev: WaitlistResult | null,
  formData: FormData,
): Promise<WaitlistResult> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const interest = String(formData.get("interest") ?? "") as WaitlistInterest;

  if (!email.includes("@")) {
    return { ok: false, message: "Enter a valid email address." };
  }
  if (interest !== "video" && interest !== "generator") {
    return { ok: false, message: "Invalid waitlist." };
  }

  if (!isSupabaseConfigured()) {
    return {
      ok: true,
      message:
        "Thanks — you’re on the list locally. Connect Supabase to store waitlist emails for real.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("waitlist_entries").insert({
    email,
    interest,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        ok: true,
        message: "You’re already on this waitlist. We’ll email you when it’s ready.",
      };
    }
    return { ok: false, message: error.message };
  }

  return {
    ok: true,
    message: "You’re on the waitlist. We’ll email you when it’s ready.",
  };
}

import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  fetchOwnProfile,
  isEditorRole,
  type AdminProfile,
} from "@/lib/admin/access";
import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AdminGate =
  | { ok: true; supabase: SupabaseClient; profile: AdminProfile; userId: string }
  | { ok: false; node: ReactNode };

export async function requireAdminPage(): Promise<AdminGate> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      node: (
        <section className="container py-[88px]">
          <h1 className="m-0 mb-2 text-[clamp(32px,4vw,48px)] tracking-[-0.04em]">
            Editorial admin
          </h1>
          <p className="m-0 text-[var(--muted)]">
            Configure Supabase to manage styles. Without a database, use the seed
            script only.
          </p>
        </section>
      ),
    };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    redirect("/sign-in?next=/admin");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/sign-in?next=/admin");
  }

  const profile = await fetchOwnProfile(supabase, user.id);
  if (!profile || !isEditorRole(profile.role)) {
    return {
      ok: false,
      node: (
        <section className="container py-[88px]">
          <h1 className="m-0 mb-2 text-[clamp(32px,4vw,48px)] tracking-[-0.04em]">
            Access denied
          </h1>
          <p className="m-0 mb-6 text-[var(--muted)]">
            Editorial tools are limited to editor and admin roles.
          </p>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-[18px] text-sm font-bold"
          >
            Back home
          </Link>
        </section>
      ),
    };
  }

  return { ok: true, supabase, profile, userId: user.id };
}

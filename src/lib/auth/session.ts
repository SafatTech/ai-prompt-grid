import { redirect } from "next/navigation";
import type { Profile, UserRole } from "@/lib/database.types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type SessionUser = {
  id: string;
  email: string | null;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  return { id: user.id, email: user.email ?? null };
}

export async function getProfile(): Promise<Profile | null> {
  const session = await getSessionUser();
  if (!session) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.id)
    .maybeSingle();

  if (error) {
    console.error("getProfile", error.message);
    return null;
  }
  return data;
}

export async function getAuthState(): Promise<{
  user: SessionUser | null;
  profile: Profile | null;
  role: UserRole | null;
  isAdmin: boolean;
}> {
  const user = await getSessionUser();
  if (!user) {
    return { user: null, profile: null, role: null, isAdmin: false };
  }
  const profile = await getProfile();
  const role = profile?.role ?? "user";
  return {
    user,
    profile,
    role,
    isAdmin: role === "admin",
  };
}

export async function requireUser(nextPath = "/account") {
  const user = await getSessionUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  return user;
}

export async function requireAdmin() {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  const { user, isAdmin } = await getAuthState();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent("/admin")}`);
  }
  if (!isAdmin) {
    redirect("/?error=admin_required");
  }
  return user;
}

import type { SupabaseClient } from "@supabase/supabase-js";
import type { PublishStatus } from "@/lib/catalog/types";

export type ProfileRole = "user" | "editor" | "admin";

export type AdminProfile = {
  id: string;
  role: ProfileRole;
  displayName: string | null;
};

export function isEditorRole(role: string | null | undefined): boolean {
  return role === "editor" || role === "admin";
}

export async function fetchOwnProfile(
  client: SupabaseClient,
  userId: string,
): Promise<AdminProfile | null> {
  const { data, error } = await client
    .from("profiles")
    .select("id, role, display_name")
    .eq("id", userId)
    .maybeSingle();
  if (error || !data) {
    if (error) console.warn("[admin] profile fetch failed", error.message);
    return null;
  }
  const role = data.role as ProfileRole;
  if (role !== "user" && role !== "editor" && role !== "admin") {
    return { id: data.id as string, role: "user", displayName: data.display_name };
  }
  return {
    id: data.id as string,
    role,
    displayName: (data.display_name as string | null) ?? null,
  };
}

export async function requireEditor(
  client: SupabaseClient,
): Promise<
  | { ok: true; userId: string; profile: AdminProfile }
  | { ok: false; status: 401 | 403; error: string }
> {
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) {
    return { ok: false, status: 401, error: "Sign in required." };
  }
  const profile = await fetchOwnProfile(client, user.id);
  if (!profile || !isEditorRole(profile.role)) {
    return { ok: false, status: 403, error: "Editor access required." };
  }
  return { ok: true, userId: user.id, profile };
}

export type AdminStyleRow = {
  id: string;
  slug: string;
  title: string;
  status: PublishStatus;
  category: string;
  tool: string;
  variantStatus: PublishStatus | "none";
  publishedAt: string | null;
  updatedAt: string;
};

export async function listAdminStyles(
  client: SupabaseClient,
): Promise<AdminStyleRow[]> {
  const { data, error } = await client
    .from("styles")
    .select(
      "id, slug, title, status, published_at, updated_at, categories ( name ), prompt_variants ( tool, status, is_primary )",
    )
    .order("updated_at", { ascending: false });

  if (error || !data) {
    if (error) console.warn("[admin] styles list failed", error.message);
    return [];
  }

  return data.map((row) => {
    const categories = row.categories as
      | { name: string }
      | { name: string }[]
      | null;
    const category = Array.isArray(categories)
      ? categories[0]?.name
      : categories?.name;
    const variants = (row.prompt_variants ?? []) as Array<{
      tool: string;
      status: string;
      is_primary: boolean;
    }>;
    const primary =
      variants.find((v) => v.is_primary) ?? variants[0] ?? null;
    return {
      id: row.id as string,
      slug: row.slug as string,
      title: row.title as string,
      status: row.status as PublishStatus,
      category: category ?? "—",
      tool: primary?.tool ?? "—",
      variantStatus: (primary?.status as PublishStatus) ?? "none",
      publishedAt: (row.published_at as string | null) ?? null,
      updatedAt: row.updated_at as string,
    };
  });
}

export const STYLE_STATUS_TRANSITIONS: Record<
  PublishStatus,
  PublishStatus[]
> = {
  draft: ["in_review", "published"],
  in_review: ["draft", "published", "archived"],
  published: ["archived", "in_review"],
  archived: ["draft"],
};

export function canTransition(
  from: PublishStatus,
  to: PublishStatus,
): boolean {
  return STYLE_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

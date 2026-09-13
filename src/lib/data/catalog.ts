import { CATEGORY_SEEDS } from "@/lib/constants";
import type { Category, Style } from "@/lib/database.types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function listCategories(): Promise<
  Pick<Category, "id" | "name" | "slug" | "description" | "sort_order">[]
> {
  if (!isSupabaseConfigured()) {
    return CATEGORY_SEEDS.map((c, i) => ({
      id: c.slug,
      name: c.name,
      slug: c.slug,
      description: null,
      sort_order: (i + 1) * 10,
    }));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, sort_order")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    console.error("listCategories", error?.message);
    return CATEGORY_SEEDS.map((c, i) => ({
      id: c.slug,
      name: c.name,
      slug: c.slug,
      description: null,
      sort_order: (i + 1) * 10,
    }));
  }

  return data;
}

export async function listAdminStyles(): Promise<Style[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("styles")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("listAdminStyles", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAdminDashboardCounts() {
  if (!isSupabaseConfigured()) {
    return { categories: CATEGORY_SEEDS.length, drafts: 0, published: 0, waitlist: 0 };
  }

  const supabase = await createClient();
  const [categories, drafts, published, waitlist] = await Promise.all([
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase
      .from("styles")
      .select("*", { count: "exact", head: true })
      .eq("status", "draft"),
    supabase
      .from("styles")
      .select("*", { count: "exact", head: true })
      .eq("status", "published"),
    supabase.from("waitlist_entries").select("*", { count: "exact", head: true }),
  ]);

  return {
    categories: categories.count ?? 0,
    drafts: drafts.count ?? 0,
    published: published.count ?? 0,
    waitlist: waitlist.count ?? 0,
  };
}

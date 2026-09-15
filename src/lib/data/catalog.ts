import { CATEGORY_SEEDS, MODEL_LABELS } from "@/lib/constants";
import type { Category, Style } from "@/lib/database.types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type StyleCardData = {
  id: string;
  title: string;
  slug: string;
  model_slugs: string[];
  category_slug?: string;
  short_description?: string | null;
  thumbnail_url: string | null;
  thumbnail_alt: string;
};

export type StyleDetailData = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  prompt: string;
  how_to_use: string | null;
  model_slugs: string[];
  category: { name: string; slug: string } | null;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  result_image: { url: string; alt: string } | null;
  copy_count: number;
};

export type StyleListFilters = {
  q?: string;
  category?: string;
  model?: string;
};

type DemoStyleSeed = StyleCardData & {
  prompt: string;
  how_to_use: string;
  category_name: string;
  copy_count?: number;
};

/** Static demo cards when Supabase is not configured (matches seed assets). */
export const FEATURED_DEMO: DemoStyleSeed[] = [
  {
    id: "demo-vintage-film-portrait",
    title: "Vintage Film Portrait",
    slug: "vintage-film-portrait",
    category_slug: "vintage-film",
    category_name: "Vintage Film",
    short_description:
      "Warm faded tones with soft film grain — copy-ready and tested.",
    prompt:
      "Transform this photo into an authentic vintage film portrait. Keep facial features and identity strictly unchanged. Apply warm faded tones, soft focus, realistic film grain, subtle vignette, and natural skin texture. Photorealistic, high detail.",
    how_to_use:
      "Paste into Gemini or ChatGPT with your photo attached. Keep identity lock; let wardrobe and color grade shift.",
    model_slugs: ["gemini", "chatgpt"],
    thumbnail_url: "/images/featured/vintage-film-portrait-after.png",
    thumbnail_alt: "Vintage film portrait style preview",
    copy_count: 1842,
  },
  {
    id: "demo-golden-hour-cinematic",
    title: "Golden Hour Cinematic",
    slug: "golden-hour-cinematic",
    category_slug: "cinematic",
    category_name: "Cinematic",
    short_description:
      "Warm sidelight and shallow depth of field for a filmic dusk look.",
    prompt:
      "Transform this photo into a cinematic golden-hour portrait. Keep identity unchanged. Use warm sidelight, soft rim light, shallow depth of field, natural skin texture, and filmic contrast. Photorealistic.",
    how_to_use: "Best tested on Gemini or ChatGPT with your photo attached.",
    model_slugs: ["gemini", "chatgpt"],
    thumbnail_url: "/images/featured/golden-hour-cinematic-after.png",
    thumbnail_alt: "Golden hour cinematic style preview",
    copy_count: 1267,
  },
  {
    id: "demo-editorial-fashion-cover",
    title: "Editorial Fashion Cover",
    slug: "editorial-fashion-cover",
    category_slug: "fashion",
    category_name: "Fashion",
    short_description: "Magazine-cover framing with sharp fashion lighting.",
    prompt:
      "Transform this photo into an editorial fashion magazine cover portrait. Keep facial identity unchanged. Use confident cover framing, sharp fashion lighting, polished wardrobe, and clean composition. Photorealistic, high detail.",
    how_to_use:
      "Paste into Midjourney or Flux with your reference photo. Keep identity locked; style the wardrobe and lighting.",
    model_slugs: ["midjourney", "flux"],
    thumbnail_url: "/images/featured/editorial-fashion-cover-after.png",
    thumbnail_alt: "Editorial fashion cover style preview",
    copy_count: 953,
  },
  {
    id: "demo-soft-studio-portrait",
    title: "Soft Studio Portrait",
    slug: "soft-studio-portrait",
    category_slug: "portrait",
    category_name: "Portrait",
    short_description: "Clean backdrop and gentle beauty light.",
    prompt:
      "Transform this photo into a soft studio portrait. Keep identity unchanged. Use a clean backdrop, soft beauty lighting, gentle catchlights, natural skin texture, and calm expression. Photorealistic.",
    how_to_use: "Paste into Gemini or ChatGPT with your photo attached.",
    model_slugs: ["gemini", "chatgpt"],
    thumbnail_url: "/images/featured/soft-studio-portrait-after.png",
    thumbnail_alt: "Soft studio portrait style preview",
    copy_count: 2104,
  },
  {
    id: "demo-moody-noir-portrait",
    title: "Moody Noir Portrait",
    slug: "moody-noir-portrait",
    category_slug: "cinematic",
    category_name: "Cinematic",
    short_description:
      "High-contrast near black-and-white with dramatic side light.",
    prompt:
      "Transform this photo into a moody noir portrait. Keep identity unchanged. Use high-contrast near black-and-white, dramatic side light, deep shadows, and cinematic film-noir atmosphere. Photorealistic.",
    how_to_use: "Paste into ChatGPT or Midjourney with your photo attached.",
    model_slugs: ["chatgpt", "midjourney"],
    thumbnail_url: "/images/featured/moody-noir-portrait-after.png",
    thumbnail_alt: "Moody noir portrait style preview",
    copy_count: 1488,
  },
  {
    id: "demo-viral-selfie-glow-up",
    title: "Viral Selfie Glow-Up",
    slug: "viral-selfie-glow-up",
    category_slug: "selfie-transformation",
    category_name: "Selfie Transformation",
    short_description: "Polished social glow while keeping likeness locked.",
    prompt:
      "Transform this selfie into a polished viral glow-up look. Keep facial features, skin tone, and identity strictly unchanged. Refine lighting, soften harsh shadows, and keep natural skin texture — no heavy plastic filters. Photorealistic.",
    how_to_use:
      "Paste into Gemini or ChatGPT with your selfie attached. Identity stays locked.",
    model_slugs: ["gemini", "chatgpt"],
    thumbnail_url: "/images/featured/viral-selfie-glow-up-after.png",
    thumbnail_alt: "Viral selfie glow-up style preview",
    copy_count: 3219,
  },
];

function demoToCard(style: DemoStyleSeed): StyleCardData {
  return {
    id: style.id,
    title: style.title,
    slug: style.slug,
    model_slugs: style.model_slugs,
    category_slug: style.category_slug,
    short_description: style.short_description,
    thumbnail_url: style.thumbnail_url,
    thumbnail_alt: style.thumbnail_alt,
  };
}

function demoToDetail(style: DemoStyleSeed): StyleDetailData {
  return {
    id: style.id,
    title: style.title,
    slug: style.slug,
    short_description: style.short_description ?? null,
    prompt: style.prompt,
    how_to_use: style.how_to_use,
    model_slugs: style.model_slugs,
    category: style.category_slug
      ? { name: style.category_name, slug: style.category_slug }
      : null,
    published_at: null,
    seo_title: null,
    seo_description: null,
    result_image: style.thumbnail_url
      ? { url: style.thumbnail_url, alt: style.thumbnail_alt }
      : null,
    copy_count: style.copy_count ?? 0,
  };
}

function getDemoCards(): StyleCardData[] {
  return FEATURED_DEMO.map(demoToCard);
}

type StyleListRow = {
  id: string;
  title: string;
  slug: string;
  model_slugs: string[];
  short_description?: string | null;
  published_at: string | null;
  categories?:
    | { name?: string; slug: string }
    | { name?: string; slug: string }[]
    | null;
  style_images:
    | {
        public_url: string;
        alt_text: string;
        role: string;
        sort_order: number;
      }[]
    | null;
};

type StyleDetailRow = StyleListRow & {
  prompt: string;
  how_to_use: string | null;
  seo_title: string | null;
  seo_description: string | null;
  copy_count: number;
};

const STYLE_CARD_SELECT = `
  id,
  title,
  slug,
  model_slugs,
  short_description,
  published_at,
  categories ( name, slug ),
  style_images ( public_url, alt_text, role, sort_order )
`;

const STYLE_DETAIL_SELECT = `
  id,
  title,
  slug,
  short_description,
  prompt,
  how_to_use,
  model_slugs,
  published_at,
  seo_title,
  seo_description,
  copy_count,
  categories ( name, slug ),
  style_images ( public_url, alt_text, role, sort_order )
`;

function pickThumbnail(images: StyleListRow["style_images"]): {
  url: string | null;
  alt: string;
} {
  if (!images?.length) return { url: null, alt: "" };
  const after = images.find((img) => img.role === "after");
  const gallery = [...images]
    .filter((img) => img.role === "gallery")
    .sort((a, b) => a.sort_order - b.sort_order)[0];
  const chosen = after ?? gallery ?? images[0];
  return {
    url: chosen.public_url,
    alt: chosen.alt_text || "",
  };
}

function categoryFromRow(row: StyleListRow): {
  name: string;
  slug: string;
} | null {
  if (!row.categories) return null;
  const cat = Array.isArray(row.categories) ? row.categories[0] : row.categories;
  if (!cat?.slug) return null;
  return {
    name: cat.name ?? cat.slug,
    slug: cat.slug,
  };
}

function categorySlugFromRow(row: StyleListRow): string | undefined {
  return categoryFromRow(row)?.slug;
}

function mapStyleRowsToCards(rows: StyleListRow[]): StyleCardData[] {
  return rows.map((row) => {
    const thumb = pickThumbnail(row.style_images);
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      model_slugs: row.model_slugs ?? [],
      category_slug: categorySlugFromRow(row),
      short_description: row.short_description ?? null,
      thumbnail_url: thumb.url,
      thumbnail_alt: thumb.alt || `${row.title} style preview`,
    };
  });
}

function mapDetailRow(row: StyleDetailRow): StyleDetailData {
  const thumb = pickThumbnail(row.style_images);
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    short_description: row.short_description ?? null,
    prompt: row.prompt,
    how_to_use: row.how_to_use,
    model_slugs: row.model_slugs ?? [],
    category: categoryFromRow(row),
    published_at: row.published_at,
    seo_title: row.seo_title,
    seo_description: row.seo_description,
    result_image: thumb.url
      ? { url: thumb.url, alt: thumb.alt || `${row.title} result` }
      : null,
    copy_count: row.copy_count ?? 0,
  };
}

function normalizeFilters(filters: StyleListFilters = {}): StyleListFilters {
  const q = filters.q?.trim() || undefined;
  const category = filters.category?.trim() || undefined;
  const model = filters.model?.trim() || undefined;
  return {
    q,
    category,
    model,
  };
}

function filterDemoStyles(filters: StyleListFilters): StyleCardData[] {
  const { q, category, model } = normalizeFilters(filters);
  const needle = q?.toLowerCase();

  if (category && !CATEGORY_SEEDS.some((c) => c.slug === category)) {
    return [];
  }
  if (model && !(model in MODEL_LABELS)) {
    return [];
  }

  return getDemoCards().filter((style) => {
    if (category && style.category_slug !== category) return false;
    if (model && !style.model_slugs.includes(model)) return false;
    if (needle) {
      const haystack = `${style.title} ${style.short_description ?? ""}`.toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });
}

function escapeIlike(value: string) {
  return value.replace(/[%_,]/g, (ch) => `\\${ch}`);
}

export async function listFeaturedStyles(): Promise<StyleCardData[]> {
  if (!isSupabaseConfigured()) {
    return getDemoCards();
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("styles")
    .select(STYLE_CARD_SELECT)
    .eq("status", "published")
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(8);

  if (error) {
    console.error("listFeaturedStyles", error.message);
    return getDemoCards();
  }

  if (!data?.length) {
    return getDemoCards();
  }

  return mapStyleRowsToCards(data as StyleListRow[]);
}

export async function getStyleBySlug(
  slug: string,
): Promise<StyleDetailData | null> {
  const normalized = slug.trim();
  if (!normalized) return null;

  if (!isSupabaseConfigured()) {
    const demo = FEATURED_DEMO.find((style) => style.slug === normalized);
    return demo ? demoToDetail(demo) : null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("styles")
    .select(STYLE_DETAIL_SELECT)
    .eq("slug", normalized)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("getStyleBySlug", error.message);
    const demo = FEATURED_DEMO.find((style) => style.slug === normalized);
    return demo ? demoToDetail(demo) : null;
  }

  if (!data) {
    const demo = FEATURED_DEMO.find((style) => style.slug === normalized);
    return demo ? demoToDetail(demo) : null;
  }

  return mapDetailRow(data as StyleDetailRow);
}

export async function getRelatedStyles(
  style: Pick<StyleDetailData, "id" | "slug" | "category">,
  limit = 4,
): Promise<StyleCardData[]> {
  if (limit < 1) return [];

  const useDemo =
    !isSupabaseConfigured() || style.id.startsWith("demo-");

  if (useDemo) {
    return getDemoCards()
      .filter((item) => item.slug !== style.slug)
      .sort((a, b) => {
        const aMatch = a.category_slug === style.category?.slug ? 0 : 1;
        const bMatch = b.category_slug === style.category?.slug ? 0 : 1;
        return aMatch - bMatch;
      })
      .slice(0, limit);
  }

  const supabase = await createClient();
  const related: StyleCardData[] = [];
  const seen = new Set<string>([style.id]);

  if (style.category?.slug) {
    const { data: categoryRow } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", style.category.slug)
      .maybeSingle();

    if (categoryRow) {
      const { data, error } = await supabase
        .from("styles")
        .select(STYLE_CARD_SELECT)
        .eq("status", "published")
        .eq("category_id", categoryRow.id)
        .neq("id", style.id)
        .order("published_at", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("getRelatedStyles category", error.message);
      } else {
        for (const card of mapStyleRowsToCards((data ?? []) as StyleListRow[])) {
          if (seen.has(card.id)) continue;
          seen.add(card.id);
          related.push(card);
        }
      }
    }
  }

  if (related.length < limit) {
    const { data, error } = await supabase
      .from("styles")
      .select(STYLE_CARD_SELECT)
      .eq("status", "published")
      .order("is_featured", { ascending: false })
      .order("published_at", { ascending: false })
      .limit(limit * 3);

    if (error) {
      console.error("getRelatedStyles fill", error.message);
    } else {
      for (const card of mapStyleRowsToCards((data ?? []) as StyleListRow[])) {
        if (seen.has(card.id)) continue;
        seen.add(card.id);
        related.push(card);
        if (related.length >= limit) break;
      }
    }
  }

  if (!related.length) {
    return getDemoCards()
      .filter((item) => item.slug !== style.slug)
      .slice(0, limit);
  }

  return related.slice(0, limit);
}

export async function listPublishedStyles(
  filters: StyleListFilters = {},
): Promise<StyleCardData[]> {
  const normalized = normalizeFilters(filters);

  if (!isSupabaseConfigured()) {
    return filterDemoStyles(normalized);
  }

  if (normalized.model && !(normalized.model in MODEL_LABELS)) {
    return [];
  }

  const supabase = await createClient();

  let categoryId: string | undefined;
  if (normalized.category) {
    const { data: categoryRow, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", normalized.category)
      .maybeSingle();

    if (categoryError) {
      console.error("listPublishedStyles category", categoryError.message);
      return filterDemoStyles(normalized);
    }
    if (!categoryRow) {
      return [];
    }
    categoryId = categoryRow.id;
  }

  let query = supabase
    .from("styles")
    .select(STYLE_CARD_SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }
  if (normalized.model) {
    query = query.contains("model_slugs", [normalized.model]);
  }
  if (normalized.q) {
    const safe = escapeIlike(normalized.q.replace(/[,()]/g, " ").trim());
    if (safe) {
      const pattern = `%${safe}%`;
      query = query.or(
        `title.ilike.${pattern},short_description.ilike.${pattern}`,
      );
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("listPublishedStyles", error.message);
    return filterDemoStyles(normalized);
  }

  if (!data?.length) {
    const hasActiveFilters = Boolean(
      normalized.q || normalized.category || normalized.model,
    );

    if (hasActiveFilters) {
      const { count, error: countError } = await supabase
        .from("styles")
        .select("*", { count: "exact", head: true })
        .eq("status", "published");

      if (countError) {
        console.error("listPublishedStyles count", countError.message);
        return filterDemoStyles(normalized);
      }

      // No published catalog yet — keep Explore usable with demo assets.
      if (!count) {
        return filterDemoStyles(normalized);
      }

      return [];
    }

    return getDemoCards();
  }

  return mapStyleRowsToCards(data as StyleListRow[]);
}

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

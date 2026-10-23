import { cache } from "react";
import { getPublicSupabaseConfig, isSupabaseConfigured } from "@/lib/env";
import { createPublicSupabaseClient } from "@/lib/supabase/public";
import {
  compareNewestDesc,
  compareSavedDesc,
  createEmptyFilters,
  filterStyles,
} from "./filters";
import { mapDbStyleToCatalog, type DbStyleRow } from "./mapper";
import { getPublishedStyleById, getPublishedStyles } from "./styles";
import type { CatalogStyle } from "./types";

/** Nested asset columns must stay explicit so new fields (blur) are never dropped by a stale schema cache. */
const STYLE_ASSET_SELECT = `
  id,
  kind,
  source_storage_key,
  result_storage_key,
  alt_text,
  sort_order,
  provenance,
  result_blur_data_url
`;

const STYLE_SELECT = `
  id,
  slug,
  title,
  summary,
  description,
  supported_subjects,
  edit_intent,
  input_requirement,
  photo_requirements,
  preservation_targets,
  change_targets,
  target_source_photo,
  card_height,
  save_count,
  published_at,
  created_at,
  trending_rank,
  status,
  categories ( name, slug ),
  prompt_variants ( * ),
  style_assets ( ${STYLE_ASSET_SELECT} )
`;

function publicBaseUrl(): string | null {
  return getPublicSupabaseConfig()?.url ?? null;
}

function mapRows(rows: DbStyleRow[]): CatalogStyle[] {
  const base = publicBaseUrl();
  return rows
    .map((row) => mapDbStyleToCatalog(row, base))
    .filter((style): style is CatalogStyle => style !== null)
    .filter((style) => style.status === "published");
}

/**
 * Published catalog for guest UI.
 * Prefers Supabase when configured; falls back to static seed otherwise.
 * Uses a cookie-free anon client so catalog pages can prerender.
 * Cached per request so homepage rails share one fetch.
 */
export const listPublishedStyles = cache(async (): Promise<CatalogStyle[]> => {
  if (!isSupabaseConfigured()) {
    return [...getPublishedStyles()].sort(compareSavedDesc);
  }

  try {
    const supabase = createPublicSupabaseClient();
    if (!supabase) return [...getPublishedStyles()].sort(compareSavedDesc);

    const { data, error } = await supabase
      .from("styles")
      .select(STYLE_SELECT)
      .eq("status", "published")
      .order("save_count", { ascending: false })
      .order("published_at", { ascending: false })
      .order("slug", { ascending: true });

    if (error) {
      console.warn(
        "[catalog] Supabase query failed; using seed fallback.",
        error.message,
      );
      return [...getPublishedStyles()].sort(compareSavedDesc);
    }

    const mapped = mapRows((data ?? []) as DbStyleRow[]);
    if (mapped.length === 0) {
      console.warn("[catalog] No published styles in database; using seed fallback.");
      return [...getPublishedStyles()].sort(compareSavedDesc);
    }

    // Client-side tie-break: published_at + id keep offset/exclude paging stable.
    return mapped.sort(compareSavedDesc);
  } catch (err) {
    console.warn("[catalog] Unexpected catalog error; using seed fallback.", err);
    return [...getPublishedStyles()].sort(compareSavedDesc);
  }
});

/**
 * Homepage "New styles" rail (~10–12).
 * Orders by published_at / created_at desc; seed fallback uses reverse catalog order.
 */
export async function listNewestStyles(limit = 12): Promise<CatalogStyle[]> {
  const capped = Math.min(Math.max(limit, 1), 12);
  const all = await listPublishedStyles();
  const hasDates = all.some((style) => Boolean(style.publishedAt));
  if (!hasDates) {
    return [...getPublishedStyles()].reverse().slice(0, capped);
  }
  const indexed = all.map((style, index) => ({ style, index }));
  indexed.sort((a, b) => compareNewestDesc(a.style, b.style, a.index, b.index));
  return indexed.slice(0, capped).map((entry) => entry.style);
}

/**
 * Homepage trending rail (up to 10).
 * Uses editor-assigned trending_rank when set; otherwise falls back to top published styles.
 */
export async function listTrendingStyles(limit = 6): Promise<CatalogStyle[]> {
  const capped = Math.min(Math.max(limit, 1), 10);
  const all = await listPublishedStyles();

  if (!isSupabaseConfigured()) {
    return all.slice(0, capped);
  }

  try {
    const supabase = createPublicSupabaseClient();
    if (!supabase) return all.slice(0, capped);

    const { data, error } = await supabase
      .from("styles")
      .select(STYLE_SELECT)
      .eq("status", "published")
      .not("trending_rank", "is", null)
      .order("trending_rank", { ascending: true })
      .limit(capped);

    if (error) {
      console.warn(
        "[catalog] Trending query failed; using catalog fallback.",
        error.message,
      );
      return all.slice(0, capped);
    }

    const mapped = mapRows((data ?? []) as DbStyleRow[]);
    if (mapped.length === 0) {
      return all.slice(0, capped);
    }

    if (mapped.length < capped) {
      const seen = new Set(mapped.map((style) => style.id));
      for (const style of all) {
        if (seen.has(style.id)) continue;
        mapped.push(style);
        if (mapped.length >= capped) break;
      }
    }
    return mapped;
  } catch (err) {
    console.warn("[catalog] Unexpected trending error; using catalog fallback.", err);
    return all.slice(0, capped);
  }
}

export type HeroWallImage = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

/**
 * Full-bleed hero wall tiles: published card_pair results, trending first, then save_count.
 * Optionally mixes in ~8 season style slugs when provided.
 */
export async function listHeroWallImages(
  limit = 30,
  preferSlugs: string[] = [],
): Promise<HeroWallImage[]> {
  const styles = await listPublishedStyles();
  const bySlug = new Map(styles.map((style) => [style.id, style]));
  const picked: CatalogStyle[] = [];
  const seen = new Set<string>();

  for (const slug of preferSlugs) {
    const style = bySlug.get(slug);
    if (!style || !style.result || seen.has(style.id)) continue;
    picked.push(style);
    seen.add(style.id);
    if (picked.length >= Math.min(8, limit)) break;
  }

  const ranked = [...styles].sort(compareSavedDesc);
  for (const style of ranked) {
    if (!style.result || seen.has(style.id)) continue;
    picked.push(style);
    seen.add(style.id);
    if (picked.length >= limit) break;
  }

  return picked.slice(0, limit).map((style) => {
    const pair = style.examplePairs.find((p) => p.result === style.result) ?? style.examplePairs[0];
    const width = pair?.resultWidth && pair.resultWidth > 0 ? pair.resultWidth : 800;
    const height = pair?.resultHeight && pair.resultHeight > 0 ? pair.resultHeight : 1000;
    return {
      src: style.result,
      width,
      height,
      ...(style.resultBlur ? { blurDataURL: style.resultBlur } : {}),
    };
  });
}

/** Published styles in a category, ordered by save_count desc. */
export async function listStylesByCategory(
  category: string,
  limit = 10,
): Promise<CatalogStyle[]> {
  const capped = Math.min(Math.max(limit, 1), 24);
  if (!category.trim()) return [];
  return (await listPublishedStyles())
    .filter((style) => style.category === category)
    .slice(0, capped);
}

/** Thematic rail: case-insensitive match on title/summary/slug tokens. */
export async function listStylesMatchingQuery(
  query: string,
  limit = 10,
): Promise<CatalogStyle[]> {
  const capped = Math.min(Math.max(limit, 1), 24);
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const all = await listPublishedStyles();
  return filterStyles(all, createEmptyFilters(), q, "Trending").slice(0, capped);
}

export async function listStylesBySlugs(slugs: string[]): Promise<CatalogStyle[]> {
  if (slugs.length === 0) return [];
  const all = await listPublishedStyles();
  const bySlug = new Map(all.map((style) => [style.id, style]));
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((style): style is CatalogStyle => style !== undefined);
}

export type ExploreFeedPage = {
  styles: CatalogStyle[];
  page: number;
  pageSize: number;
  total: number;
};

/** Paginated explore masonry feed for the homepage. */
export async function listExploreFeed(options?: {
  page?: number;
  pageSize?: number;
  category?: string;
}): Promise<ExploreFeedPage> {
  const page = Math.max(1, options?.page ?? 1);
  // Homepage masonry SSR uses 50 (10×5 cols); allow up to 60.
  const pageSize = Math.min(Math.max(options?.pageSize ?? 24, 1), 60);
  const category = options?.category?.trim() || "";

  let all = await listPublishedStyles();
  if (category) {
    all = all.filter((style) => style.category === category);
  }

  const total = all.length;
  const start = (page - 1) * pageSize;
  return {
    styles: all.slice(start, start + pageSize),
    page,
    pageSize,
    total,
  };
}

/** Exact published style count for trust / CTA copy (no made-up padding). */
export async function countPublishedStyles(): Promise<number> {
  if (!isSupabaseConfigured()) {
    return (await listPublishedStyles()).length;
  }

  try {
    const supabase = createPublicSupabaseClient();
    if (!supabase) return (await listPublishedStyles()).length;

    const { count, error } = await supabase
      .from("styles")
      .select("id", { count: "exact", head: true })
      .eq("status", "published");

    if (error || count == null) {
      if (error) {
        console.warn("[catalog] Published count failed; using list length.", error.message);
      }
      return (await listPublishedStyles()).length;
    }
    return count;
  } catch (err) {
    console.warn("[catalog] Unexpected published count error; using list length.", err);
    return (await listPublishedStyles()).length;
  }
}

/** Lightweight published-style rows for sitemap generation. */
export type SitemapStyleEntry = {
  slug: string;
  lastModified: Date;
};

/**
 * Abort a stalled sitemap catalog read so the seed fallback can still run.
 * withTimeout fires slightly later, so an abort can reject, get logged, and
 * fall back. It only wins when the aborted request never settles.
 */
const SITEMAP_STYLE_QUERY_MS = 4_000;
const SITEMAP_STYLE_QUERY_BACKSTOP_MS = SITEMAP_STYLE_QUERY_MS + 1_000;

function withTimeout<T>(promise: PromiseLike<T>, ms: number): Promise<T> {
  const settled = Promise.resolve(promise);
  let timer: ReturnType<typeof setTimeout> | undefined;
  // A second consumer so a late rejection is not an unhandled rejection after
  // the timeout already won the race.
  settled.then(
    () => {},
    () => {},
  );
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`Timed out after ${ms}ms`));
    }, ms);
  });
  return Promise.race([settled, timeout]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

/**
 * Published style URLs for `/sitemap.xml`.
 * Prefers Supabase `updated_at` / `published_at`; falls back to seed catalog.
 * A stalled query is aborted and logged, then the seed catalog is used.
 */
export async function listPublishedStyleSitemapEntries(): Promise<SitemapStyleEntry[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createPublicSupabaseClient();
      if (supabase) {
        const { data, error } = await withTimeout(
          supabase
            .from("styles")
            .select("slug, updated_at, published_at")
            .eq("status", "published")
            .order("updated_at", { ascending: false })
            .abortSignal(AbortSignal.timeout(SITEMAP_STYLE_QUERY_MS)),
          SITEMAP_STYLE_QUERY_BACKSTOP_MS,
        );

        if (!error && data && data.length > 0) {
          return data
            .filter(
              (
                row,
              ): row is {
                slug: string;
                updated_at: string | null;
                published_at: string | null;
              } => typeof row.slug === "string" && row.slug.trim().length > 0,
            )
            .map((row) => ({
              slug: row.slug.trim(),
              lastModified: parseSitemapDate(row.updated_at || row.published_at || ""),
            }));
        }

        if (error) {
          console.warn(
            "[catalog] Sitemap style query failed; using seed fallback.",
            error.message,
          );
        }
      }
    } catch (err) {
      console.warn(
        "[catalog] Unexpected sitemap catalog error; using seed fallback.",
        err,
      );
    }
  }

  return getPublishedStyles().map((style) => ({
    slug: style.id,
    lastModified: parseSitemapDate(style.promptVariant.lastVerified),
  }));
}

function parseSitemapDate(value: string): Date {
  if (!value) return new Date();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export async function getPublishedStyleBySlug(
  slug: string,
): Promise<CatalogStyle | undefined> {
  if (!isSupabaseConfigured()) {
    return getPublishedStyleById(slug);
  }

  try {
    const supabase = createPublicSupabaseClient();
    if (!supabase) return getPublishedStyleById(slug);

    const { data, error } = await supabase
      .from("styles")
      .select(STYLE_SELECT)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      console.warn("[catalog] Style lookup failed; using seed fallback.", error.message);
      return getPublishedStyleById(slug);
    }

    if (!data) return getPublishedStyleById(slug);

    const mapped = mapDbStyleToCatalog(data as DbStyleRow, publicBaseUrl());
    return mapped?.status === "published" ? mapped : undefined;
  } catch (err) {
    console.warn("[catalog] Unexpected style lookup error; using seed fallback.", err);
    return getPublishedStyleById(slug);
  }
}

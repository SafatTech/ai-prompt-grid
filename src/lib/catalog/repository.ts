import { cache } from "react";
import { unstable_cache } from "next/cache";
import { getPublicSupabaseConfig, isSupabaseConfigured } from "@/lib/env";
import { createPublicSupabaseClient } from "@/lib/supabase/public";
import { PUBLIC_CATALOG_CACHE_TAG, PUBLIC_DATA_REVALIDATE_SECONDS } from "./public-cache";
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
  show_on_home,
  pin_new_rank,
  hide_from_new,
  explore_weight,
  exclude_from_explore,
  allow_in_hero,
  hero_priority,
  published_at,
  created_at,
  trending_rank,
  status,
  categories ( name, slug ),
  prompt_variants (
    id,
    tool,
    mode,
    input_image_count,
    input_image_roles,
    version,
    template,
    variables,
    test_record,
    is_primary,
    status
  ),
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
 * Cached across requests so all public routes and ISR renders share one read.
 */
async function fetchPublishedStyles(): Promise<CatalogStyle[]> {
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
}

const getCachedPublishedStyles = unstable_cache(
  fetchPublishedStyles,
  ["published-catalog-v2"],
  {
    tags: [PUBLIC_CATALOG_CACHE_TAG],
    revalidate: PUBLIC_DATA_REVALIDATE_SECONDS,
  },
);

/** React cache also deduplicates concurrent callers in a single render. */
export const listPublishedStyles = cache(async (): Promise<CatalogStyle[]> => {
  // Keep seed-only local/test use independent of Next's runtime cache context.
  if (!isSupabaseConfigured()) return fetchPublishedStyles();
  return getCachedPublishedStyles();
});

/**
 * Homepage "New styles" rail (~10–12).
 * Orders by published_at / created_at desc; seed fallback uses reverse catalog order.
 */
export async function listNewestStyles(limit = 12): Promise<CatalogStyle[]> {
  const capped = Math.min(Math.max(limit, 1), 12);
  const all = (await listPublishedStyles()).filter(
    (style) => style.showOnHome !== false && !style.hideFromNew,
  );
  const pinned = all
    .filter((style) => style.pinNewRank != null)
    .sort((a, b) => (a.pinNewRank ?? 99) - (b.pinNewRank ?? 99))
    .slice(0, 5);
  const pinnedIds = new Set(pinned.map((style) => style.id));
  const unpinned = all.filter((style) => !pinnedIds.has(style.id));
  const hasDates = all.some((style) => Boolean(style.publishedAt));
  if (!hasDates) {
    const seedNewest = [...getPublishedStyles()]
      .filter(
        (style) =>
          style.showOnHome !== false && !style.hideFromNew && !pinnedIds.has(style.id),
      )
      .reverse();
    return [...pinned, ...seedNewest].slice(0, capped);
  }
  const indexed = unpinned.map((style, index) => ({ style, index }));
  indexed.sort((a, b) => compareNewestDesc(a.style, b.style, a.index, b.index));
  return [...pinned, ...indexed.map((entry) => entry.style)].slice(0, capped);
}

/**
 * Homepage trending rail (up to 10).
 * Uses editor-assigned trending_rank when set; otherwise falls back to top published styles.
 */
export async function listTrendingStyles(limit = 6): Promise<CatalogStyle[]> {
  const capped = Math.min(Math.max(limit, 1), 12);
  const all = (await listPublishedStyles()).filter((style) => style.showOnHome !== false);
  const ranked = all
    .filter((style) => style.trendingRank != null)
    .sort((a, b) => (a.trendingRank ?? 0) - (b.trendingRank ?? 0))
    .slice(0, capped);
  if (ranked.length < capped) {
    const seen = new Set(ranked.map((style) => style.id));
    for (const style of all) {
      if (seen.has(style.id)) continue;
      ranked.push(style);
      if (ranked.length >= capped) break;
    }
  }
  return ranked;
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
  autoFill = true,
): Promise<HeroWallImage[]> {
  const styles = (await listPublishedStyles()).filter(
    (style) => style.showOnHome !== false && style.allowInHero !== false,
  );
  const bySlug = new Map(styles.map((style) => [style.id, style]));
  const picked: CatalogStyle[] = [];
  const seen = new Set<string>();

  for (const slug of preferSlugs) {
    const style = bySlug.get(slug);
    if (!style || !style.result || seen.has(style.id)) continue;
    picked.push(style);
    seen.add(style.id);
    if (picked.length >= limit) break;
  }

  if (autoFill) {
    const ranked = [...styles].sort(
      (a, b) => (b.heroPriority ?? 0) - (a.heroPriority ?? 0) || compareSavedDesc(a, b),
    );
    for (const style of ranked) {
      if (!style.result || seen.has(style.id)) continue;
      picked.push(style);
      seen.add(style.id);
      if (picked.length >= limit) break;
    }
  }

  // No per-tile blurDataURL — hero is decorative (aria-hidden) and unique blurs
  // were repeating ~0.5–1 KB × 18 in home HTML (LCP/TBT parse cost).
  return picked.slice(0, limit).map((style) => {
    const pair =
      style.examplePairs.find((p) => p.result === style.result) ?? style.examplePairs[0];
    const width = pair?.resultWidth && pair.resultWidth > 0 ? pair.resultWidth : 800;
    const height = pair?.resultHeight && pair.resultHeight > 0 ? pair.resultHeight : 1000;
    return {
      src: style.result,
      width,
      height,
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
    .filter((style) => style.showOnHome !== false && style.category === category)
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

  const all = (await listPublishedStyles()).filter((style) => style.showOnHome !== false);
  return filterStyles(all, createEmptyFilters(), q, "Trending").slice(0, capped);
}

export async function listStylesBySlugs(slugs: string[]): Promise<CatalogStyle[]> {
  if (slugs.length === 0) return [];
  const all = (await listPublishedStyles()).filter((style) => style.showOnHome !== false);
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

  let all = (await listPublishedStyles())
    .filter((style) => style.showOnHome !== false && !style.excludeFromExplore)
    .sort(
      (a, b) => (b.exploreWeight ?? 0) - (a.exploreWeight ?? 0) || compareSavedDesc(a, b),
    );
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
  return (await listPublishedStyles()).length;
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
 *
 * Keep this generous: a 4s timeout previously raced cold Supabase and silently
 * served a partial DB page while the seed already had the character and newer
 * editorial batches.
 */
export const SITEMAP_STYLE_QUERY_MS = 15_000;
const SITEMAP_STYLE_QUERY_BACKSTOP_MS = SITEMAP_STYLE_QUERY_MS + 2_000;
/** PostgREST default max-rows is often 1000; page explicitly so we never undercount. */
const SITEMAP_STYLE_PAGE_SIZE = 1_000;

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

function seedSitemapEntries(): SitemapStyleEntry[] {
  return getPublishedStyles().map((style) => ({
    slug: style.id,
    lastModified: parseSitemapDate(style.promptVariant.lastVerified),
  }));
}

/**
 * Union DB rows with seed so a partial Supabase response (or pre-character
 * cache) cannot drop published seed slugs from `/sitemap.xml`.
 */
export function mergeSitemapStyleEntries(
  primary: SitemapStyleEntry[],
  seed: SitemapStyleEntry[] = seedSitemapEntries(),
): SitemapStyleEntry[] {
  const bySlug = new Map<string, SitemapStyleEntry>();
  for (const entry of seed) {
    const slug = entry.slug.trim();
    if (!slug) continue;
    bySlug.set(slug, { slug, lastModified: entry.lastModified });
  }
  for (const entry of primary) {
    const slug = entry.slug.trim();
    if (!slug) continue;
    // Prefer DB lastModified when present.
    bySlug.set(slug, { slug, lastModified: entry.lastModified });
  }
  return [...bySlug.values()];
}

type SitemapStyleRow = {
  slug: string;
  updated_at: string | null;
  published_at: string | null;
};

function mapSitemapRows(data: unknown[]): SitemapStyleEntry[] {
  return data
    .filter(
      (row): row is SitemapStyleRow =>
        !!row &&
        typeof row === "object" &&
        typeof (row as SitemapStyleRow).slug === "string" &&
        (row as SitemapStyleRow).slug.trim().length > 0,
    )
    .map((row) => ({
      slug: row.slug.trim(),
      lastModified: parseSitemapDate(row.updated_at || row.published_at || ""),
    }));
}

/**
 * Published style URLs for `/sitemap.xml`.
 * Prefers Supabase `updated_at` / `published_at`, paginated to completion, then
 * always unioned with the seed catalog so character styles (and any other seed
 * rows missing from a partial DB read) still appear. A stalled query falls back
 * to seed alone.
 */
export async function listPublishedStyleSitemapEntries(): Promise<SitemapStyleEntry[]> {
  const seed = seedSitemapEntries();

  if (!isSupabaseConfigured()) {
    return seed;
  }

  try {
    const supabase = createPublicSupabaseClient();
    if (!supabase) return seed;

    const rows: unknown[] = [];
    let from = 0;
    for (;;) {
      const to = from + SITEMAP_STYLE_PAGE_SIZE - 1;
      const { data, error } = await withTimeout(
        supabase
          .from("styles")
          .select("slug, updated_at, published_at")
          .eq("status", "published")
          .order("slug", { ascending: true })
          .range(from, to)
          .abortSignal(AbortSignal.timeout(SITEMAP_STYLE_QUERY_MS)),
        SITEMAP_STYLE_QUERY_BACKSTOP_MS,
      );

      if (error) {
        console.warn(
          "[catalog] Sitemap style query failed; using seed fallback.",
          error.message,
        );
        return seed;
      }

      const page = data ?? [];
      rows.push(...page);
      if (page.length < SITEMAP_STYLE_PAGE_SIZE) break;
      from += SITEMAP_STYLE_PAGE_SIZE;
    }

    if (rows.length === 0) {
      console.warn("[catalog] Sitemap style query returned 0 rows; using seed fallback.");
      return seed;
    }

    const fromDb = mapSitemapRows(rows);
    const merged = mergeSitemapStyleEntries(fromDb, seed);
    if (fromDb.length < seed.length) {
      console.warn(
        `[catalog] Sitemap Supabase undercount (${fromDb.length} < seed ${seed.length}); unioned seed slugs.`,
      );
    }
    return merged;
  } catch (err) {
    console.warn("[catalog] Unexpected sitemap catalog error; using seed fallback.", err);
    return seed;
  }
}

function parseSitemapDate(value: string): Date {
  if (!value) return new Date();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

/**
 * Resolve from the shared catalog instead of issuing one PostgREST request per
 * style during generateStaticParams/build. The detail page needs this catalog
 * for related styles anyway.
 */
export const getPublishedStyleBySlug = cache(
  async (slug: string): Promise<CatalogStyle | undefined> =>
    (await listPublishedStyles()).find((style) => style.id === slug) ??
    getPublishedStyleById(slug),
);

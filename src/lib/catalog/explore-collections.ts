import {
  compareNewestDesc,
  compareSavedDesc,
  publishedAtMs,
} from "@/lib/catalog/filters";
import { getPublishedStyles } from "@/lib/catalog/styles";
import type { CatalogStyle } from "@/lib/catalog/types";

/** Quick-filter collections shown in the explore hero and chip bar. */
export const EXPLORE_COLLECTION_KEYS = [
  "Trending",
  "New",
  "Sari",
  "Diwali",
  "Winter",
  "Birthday",
] as const;

export type ExploreCollectionKey = (typeof EXPLORE_COLLECTION_KEYS)[number];

export function isExploreCollectionKey(value: string): value is ExploreCollectionKey {
  return (EXPLORE_COLLECTION_KEYS as readonly string[]).includes(value);
}

function styleHaystack(style: CatalogStyle): string {
  return [style.id, style.title, style.category, style.note, style.description]
    .join("\n")
    .toLowerCase();
}

/** Seasonal / theme matchers used by hero slides and collection chips. */
const COLLECTION_MATCHERS: Record<
  Exclude<ExploreCollectionKey, "Trending" | "New">,
  (hay: string) => boolean
> = {
  Sari: (hay) => /\bsaree\b|\bsari\b|\bsarees\b/.test(hay),
  Diwali: (hay) => /\bdiwali\b|\bdiya\b|\brangoli\b|\bphuljhadi\b/.test(hay),
  Winter: (hay) => /\bwinter\b|\bsnowfall\b|\bsnow\b|\bfoggy\b|\bshawl\b/.test(hay),
  Birthday: (hay) => /\bbirthday\b/.test(hay),
};

/**
 * Trending: editor ranks when present, else popularity (save_count) with a
 * featured/home preference as a soft boost for the fallback pool.
 */
export function selectTrendingCollection(
  published: CatalogStyle[],
  limit = 24,
): CatalogStyle[] {
  const capped = Math.max(limit, 1);
  const pool = published.filter((style) => style.status === "published");
  const ranked = pool
    .filter((style) => style.trendingRank != null)
    .sort((a, b) => (a.trendingRank ?? 0) - (b.trendingRank ?? 0));
  if (ranked.length >= Math.min(2, capped)) {
    return ranked.slice(0, capped);
  }
  const featured = pool
    .filter((style) => style.showOnHome !== false)
    .sort((a, b) => {
      const bySaved = compareSavedDesc(a, b);
      if (bySaved !== 0) return bySaved;
      return publishedAtMs(b) - publishedAtMs(a);
    });
  const seen = new Set(ranked.map((style) => style.id));
  const out = [...ranked];
  for (const style of featured) {
    if (seen.has(style.id)) continue;
    out.push(style);
    if (out.length >= capped) break;
  }
  if (out.length < capped) {
    for (const style of [...pool].sort(compareSavedDesc)) {
      if (seen.has(style.id) || out.some((s) => s.id === style.id)) continue;
      out.push(style);
      if (out.length >= capped) break;
    }
  }
  return out;
}

/**
 * New: most recently added styles only (published_at / created_at desc).
 * Admin pins do not override date order on explore; hideFromNew still excludes.
 * When dates are absent (seed), later catalog order wins so newest packs surface first.
 */
export function selectNewCollection(
  published: CatalogStyle[],
  limit = 24,
): CatalogStyle[] {
  const capped = Math.max(limit, 1);
  const pool = published.filter(
    (style) => style.status === "published" && !style.hideFromNew,
  );
  const hasDates = pool.some((style) => publishedAtMs(style) > 0);
  if (!hasDates) {
    // Repository pages may arrive popularity-sorted; map back to seed catalog
    // order so later packs (e.g. Saree 316–332) still win without publishedAt.
    const seedIndex = new Map(
      getPublishedStyles().map((style, index) => [style.id, index]),
    );
    return [...pool]
      .sort(
        (a, b) =>
          (seedIndex.get(b.id) ?? -1) - (seedIndex.get(a.id) ?? -1) ||
          a.id.localeCompare(b.id),
      )
      .slice(0, capped);
  }
  const indexed = pool.map((style, index) => ({ style, index }));
  indexed.sort((a, b) => compareNewestDesc(a.style, b.style, a.index, b.index));
  return indexed.map((entry) => entry.style).slice(0, capped);
}

export function stylesForCollection(
  published: CatalogStyle[],
  key: ExploreCollectionKey,
): CatalogStyle[] {
  if (key === "Trending") return selectTrendingCollection(published);
  if (key === "New") return selectNewCollection(published);
  const match = COLLECTION_MATCHERS[key];
  return published.filter(
    (style) => style.status === "published" && match(styleHaystack(style)),
  );
}

export type ExploreCollectionSets = {
  trendingIds: ReadonlySet<string>;
  newIds: ReadonlySet<string>;
};

export function buildExploreCollectionSets(
  published: CatalogStyle[],
): ExploreCollectionSets {
  return {
    trendingIds: new Set(selectTrendingCollection(published).map((s) => s.id)),
    newIds: new Set(selectNewCollection(published).map((s) => s.id)),
  };
}

export function styleMatchesCollection(
  style: CatalogStyle,
  key: ExploreCollectionKey,
  sets: ExploreCollectionSets,
): boolean {
  if (key === "Trending") return sets.trendingIds.has(style.id);
  if (key === "New") return sets.newIds.has(style.id);
  return COLLECTION_MATCHERS[key](styleHaystack(style));
}

/** True when a style should show the Hot badge on the catalog wall. */
export function styleIsHot(
  style: CatalogStyle,
  sets: ExploreCollectionSets,
): boolean {
  return sets.trendingIds.has(style.id) || style.trendingRank != null;
}

/** True when a style should show the New badge on the catalog wall. */
export function styleIsNew(
  style: CatalogStyle,
  sets: ExploreCollectionSets,
): boolean {
  return sets.newIds.has(style.id);
}

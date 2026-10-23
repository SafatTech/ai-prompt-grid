import type { CatalogStyle } from "./types";
import { filterGroups } from "./filter-constants";
import type { ExploreQuery } from "./schemas";

const SORT_OPTIONS = ["Trending", "Newest", "Most saved"] as const;

export type FilterState = {
  category: Set<string>;
  subject: Set<string>;
  intent: Set<string>;
  requirement: Set<string>;
  tool: Set<string>;
};

export type SortOption = ExploreQuery["sort"];

/**
 * Query tokens expand to these alternate terms so homepage chips like
 * "Shaadi", "Ghibli", and "80s retro" hit real catalog copy.
 * Keys are lower-case single tokens (multi-word queries are split first).
 */
export const SEARCH_SYNONYMS: Readonly<Record<string, readonly string[]>> = {
  shaadi: ["wedding", "couple", "mehndi", "baraat", "walima", "bridal"],
  wedding: ["shaadi", "couple", "bridal", "mehndi", "walima"],
  mehndi: ["wedding", "shaadi", "couple", "bridal"],
  baraat: ["wedding", "shaadi", "couple"],
  walima: ["wedding", "shaadi", "couple", "bridal"],
  bridal: ["wedding", "shaadi", "couple"],
  ghibli: ["anime"],
  anime: ["ghibli"],
  "80s": ["1980s", "retro", "vintage"],
  "1980s": ["80s", "retro", "vintage"],
  retro: ["80s", "1980s", "vintage"],
  vintage: ["retro", "80s", "1980s"],
  eid: ["family", "festive"],
  holi: ["colour", "color", "rangoli", "festive"],
  august: ["family", "couple", "flag", "independence"],
  linkedin: ["headshot", "professional", "corporate", "cv"],
  headshot: ["linkedin", "professional"],
  halloween: ["pumpkin", "witch", "vampire", "zombie", "costume", "spooky"],
  christmas: ["festive", "holiday", "tree", "ornament", "winter"],
};

export function createEmptyFilters(): FilterState {
  return {
    category: new Set(),
    subject: new Set(),
    intent: new Set(),
    requirement: new Set(),
    tool: new Set(),
  };
}

export function filtersFromExploreQuery(query: ExploreQuery): FilterState {
  return {
    category: new Set(query.category),
    subject: new Set(query.subject),
    intent: new Set(query.intent),
    requirement: new Set(query.requirement),
    tool: new Set(query.tool),
  };
}

/**
 * Parse explore URL params without zod (client-safe).
 * Mirrors exploreQuerySchema defaults / sort allow-list.
 */
export function parseExploreSearchParams(params: URLSearchParams): ExploreQuery {
  const multi = (key: string) => params.getAll(key).filter(Boolean);
  const q = (params.get("q") ?? "").slice(0, 120);
  const sortRaw = params.get("sort") ?? "Trending";
  const sort = (SORT_OPTIONS as readonly string[]).includes(sortRaw)
    ? (sortRaw as ExploreQuery["sort"])
    : "Trending";
  return {
    q,
    sort,
    category: multi("category"),
    subject: multi("subject"),
    intent: multi("intent"),
    requirement: multi("requirement"),
    tool: multi("tool"),
  };
}

export function exploreQueryToSearchParams(
  query: ExploreQuery,
): URLSearchParams {
  const params = new URLSearchParams();
  if (query.q.trim()) params.set("q", query.q.trim());
  if (query.sort !== "Trending") params.set("sort", query.sort);
  for (const key of ["category", "subject", "intent", "requirement", "tool"] as const) {
    for (const value of query[key]) params.append(key, value);
  }
  return params;
}

/** Split a free-text query into lower-case tokens (letters/digits only). */
export function tokenizeSearchQuery(search: string): string[] {
  return search
    .trim()
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .map((token) => token.trim())
    .filter(Boolean);
}

/** Terms that satisfy one query token: the token itself plus mapped synonyms. */
export function searchTermsForToken(token: string): string[] {
  const synonyms = SEARCH_SYNONYMS[token];
  if (!synonyms?.length) return [token];
  return [token, ...synonyms];
}

/**
 * Combined haystack for text search: title, slug/id, category, subject, and
 * the rest of the public catalog fields (no separate tags column in seed data).
 */
export function styleSearchHaystack(style: CatalogStyle): string {
  return [
    style.id,
    style.title,
    style.category,
    style.subject,
    style.intent,
    style.requirement,
    style.tool,
    style.description,
    style.note,
    style.targetSourcePhoto,
    style.promptVariant.defaults.mood,
    style.promptVariant.defaults.background,
    ...style.changes,
    ...style.stays,
    ...style.bestSourcePhoto,
  ]
    .join("\n")
    .toLowerCase();
}

function matchesSearchTokens(haystack: string, tokens: string[]): boolean {
  if (tokens.length === 0) return true;
  return tokens.every((token) =>
    searchTermsForToken(token).some((term) => haystack.includes(term)),
  );
}

/** Milliseconds for publishedAt; 0 when missing/invalid (seed fallback). */
export function publishedAtMs(style: CatalogStyle): number {
  if (!style.publishedAt) return 0;
  const t = Date.parse(style.publishedAt);
  return Number.isFinite(t) ? t : 0;
}

/** Stable id tie-breaker so page/offset slices never shuffle across cache generations. */
export function compareStyleIdAsc(a: CatalogStyle, b: CatalogStyle): number {
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

/** save_count desc, then published_at desc, then id asc (N-26). */
export function compareSavedDesc(a: CatalogStyle, b: CatalogStyle): number {
  const bySaved = (b.saved ?? 0) - (a.saved ?? 0);
  if (bySaved !== 0) return bySaved;
  const byPub = publishedAtMs(b) - publishedAtMs(a);
  if (byPub !== 0) return byPub;
  return compareStyleIdAsc(a, b);
}

/**
 * Newest first by published_at. When dates are equal/missing, `indexB - indexA`
 * lets callers prefer later catalog order (seed reverse); id is last resort.
 */
export function compareNewestDesc(
  a: CatalogStyle,
  b: CatalogStyle,
  indexA = 0,
  indexB = 0,
): number {
  const byPub = publishedAtMs(b) - publishedAtMs(a);
  if (byPub !== 0) return byPub;
  if (indexB !== indexA) return indexB - indexA;
  return compareStyleIdAsc(a, b);
}

export function filterStyles(
  styles: CatalogStyle[],
  filters: FilterState,
  search: string,
  sort: SortOption,
) {
  const tokens = tokenizeSearchQuery(search);
  let output = styles.filter((style) => {
    if (style.status !== "published") return false;
    const matchesSearch =
      tokens.length === 0 || matchesSearchTokens(styleSearchHaystack(style), tokens);
    const matchesFilters = (Object.keys(filterGroups) as (keyof FilterState)[]).every(
      (key) => filters[key].size === 0 || filters[key].has(style[key]),
    );
    return matchesSearch && matchesFilters;
  });

  if (sort === "Most saved" || sort === "Trending") {
    output = [...output].sort(compareSavedDesc);
  } else if (sort === "Newest") {
    // Preserve input order as seed-order fallback when publishedAt is absent.
    const indexed = output.map((style, index) => ({ style, index }));
    indexed.sort((a, b) => compareNewestDesc(a.style, b.style, a.index, b.index));
    output = indexed.map((entry) => entry.style);
  }
  return output;
}

export function activeFilterEntries(filters: FilterState) {
  return (Object.keys(filters) as (keyof FilterState)[]).flatMap((group) =>
    [...filters[group]].map((value) => ({ group, value })),
  );
}

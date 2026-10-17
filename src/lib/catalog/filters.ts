import type { CatalogStyle } from "./types";
import { filterGroups } from "./styles";
import { exploreQuerySchema, type ExploreQuery } from "./schemas";

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

export function parseExploreSearchParams(params: URLSearchParams): ExploreQuery {
  const multi = (key: string) => params.getAll(key).filter(Boolean);
  return exploreQuerySchema.parse({
    q: params.get("q") ?? "",
    sort: params.get("sort") ?? "Trending",
    category: multi("category"),
    subject: multi("subject"),
    intent: multi("intent"),
    requirement: multi("requirement"),
    tool: multi("tool"),
  });
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

  if (sort === "Most saved") {
    output = [...output].sort((a, b) => b.saved - a.saved);
  }
  if (sort === "Newest") {
    output = [...output].reverse();
  }
  return output;
}

export function activeFilterEntries(filters: FilterState) {
  return (Object.keys(filters) as (keyof FilterState)[]).flatMap((group) =>
    [...filters[group]].map((value) => ({ group, value })),
  );
}

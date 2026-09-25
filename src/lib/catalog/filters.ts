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

export function filterStyles(
  styles: CatalogStyle[],
  filters: FilterState,
  search: string,
  sort: SortOption,
) {
  let output = styles.filter((style) => {
    if (style.status !== "published") return false;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      [
        style.title,
        style.category,
        style.subject,
        style.intent,
        style.tool,
        style.description,
        style.note,
        style.promptVariant.defaults.mood,
      ].some((value) => value.toLowerCase().includes(q));
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

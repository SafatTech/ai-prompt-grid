import { exploreQueryToSearchParams, type FilterState } from "@/lib/catalog/filters";
import type { ExploreQuery } from "@/lib/catalog/schemas";

export {
  EXPLORE_PAGE_SIZE,
  explorePageCount,
  homeExploreContinueHref,
  homeExploreFallbackPage,
  isExplicitFirstExplorePage,
  parseExploreExclude,
  parseExploreOffset,
  parseExplorePage,
} from "@/lib/catalog/explore-paging";

import { EXPLORE_PAGE_SIZE } from "@/lib/catalog/explore-paging";

export function exploreQueryFromFilters(
  filters: FilterState,
  search: string,
  sort: ExploreQuery["sort"],
): ExploreQuery {
  return {
    q: search,
    sort,
    category: [...filters.category],
    subject: [...filters.subject],
    intent: [...filters.intent],
    requirement: [...filters.requirement],
    tool: [...filters.tool],
  };
}

/** Canonical explore path. Page 1 omits `page` so it does not duplicate `/explore`. */
export function explorePageHref(query: ExploreQuery, page: number): string {
  const params = exploreQueryToSearchParams(query);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/explore?${qs}` : "/explore";
}

/** True when the listing uses filters, search, or a non-default sort. */
export function exploreQueryHasFacets(query: ExploreQuery): boolean {
  return (
    query.q.trim().length > 0 ||
    query.sort !== "Trending" ||
    query.category.length > 0 ||
    query.subject.length > 0 ||
    query.intent.length > 0 ||
    query.requirement.length > 0 ||
    query.tool.length > 0
  );
}

/**
 * Indexable explore URLs are only the unfiltered page list.
 * Faceted URLs (`?category=…`, search, etc.) canonicalize to `/explore`.
 */
export function exploreCanonicalHref(query: ExploreQuery, page: number): string {
  if (exploreQueryHasFacets(query)) return "/explore";
  return explorePageHref(query, page);
}

export function exploreListingTitle(page: number): string {
  return page > 1 ? `Explore styles, Page ${page}` : "Explore styles";
}

export function exploreListingDescription(page: number): string {
  const base =
    "Browse tested AI photo-transformation styles for portraits, pets, places, products, and more. Copy prompts for ChatGPT, Gemini, and other editors.";
  return page > 1 ? `${base} Page ${page}.` : base;
}

/** Visible H1 — same on every page; Page N belongs in title/description only. */
export function exploreListingHeading(): string {
  return "Find a style for your photo";
}

export function explorePageSlice<T>(items: T[], page: number): T[] {
  const start = (page - 1) * EXPLORE_PAGE_SIZE;
  return items.slice(start, start + EXPLORE_PAGE_SIZE);
}

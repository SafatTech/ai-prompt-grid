import { exploreQueryToSearchParams, type FilterState } from "@/lib/catalog/filters";
import type { ExploreQuery } from "@/lib/catalog/schemas";

/** Matches the explore grid's first screen so each page stays a real listing. */
export const EXPLORE_PAGE_SIZE = 18;

/**
 * Page index from `?page=`.
 * Missing or blank means page 1. Anything that is not a positive integer is invalid.
 */
export function parseExplorePage(params: URLSearchParams): number | null {
  const raw = params.get("page");
  if (raw === null || raw.trim() === "") return 1;
  if (!/^[1-9]\d*$/.test(raw)) return null;
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < 1) return null;
  return value;
}

export function isExplicitFirstExplorePage(params: URLSearchParams): boolean {
  return params.get("page") === "1";
}

export function explorePageCount(total: number): number {
  if (total <= 0) return 1;
  return Math.ceil(total / EXPLORE_PAGE_SIZE);
}

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

export function explorePageSlice<T>(items: T[], page: number): T[] {
  const start = (page - 1) * EXPLORE_PAGE_SIZE;
  return items.slice(start, start + EXPLORE_PAGE_SIZE);
}

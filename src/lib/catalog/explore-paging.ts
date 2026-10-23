/**
 * Explore pagination math — safe for client bundles (no filters/zod/seeds).
 */

/** Matches the explore grid's first screen so each page stays a real listing. */
export const EXPLORE_PAGE_SIZE = 18;

/**
 * Homepage masonry uses a larger page size (24) than `/explore` (18).
 * After auto-load stops, "Load more styles" must land on the first explore page
 * whose start index is ≥ shown (no repeated cards).
 */
export function homeExploreFallbackPage(shown: number): number {
  return Math.max(2, Math.ceil(shown / EXPLORE_PAGE_SIZE) + 1);
}

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

/**
 * Explore pagination math — safe for client bundles (no filters/zod/seeds).
 */

/** Matches the explore grid's first screen so each page stays a real listing. */
export const EXPLORE_PAGE_SIZE = 18;

/**
 * Homepage masonry SSR/append uses a larger pageSize than `/explore` (18).
 * Prefer `?offset=${shown}` so the gallery continues without skipped cards (N-27).
 * Kept for tests / legacy `?page=` links.
 */
export function homeExploreFallbackPage(shown: number): number {
  if (shown <= 0) return 1;
  return Math.floor(shown / EXPLORE_PAGE_SIZE) + 1;
}

/** Homepage "Load more styles" continues the catalog from the next unseen index. */
export function homeExploreContinueHref(shown: number): string {
  const offset = Math.max(0, Math.floor(shown));
  if (offset <= 0) return "/explore";
  return `/explore?offset=${offset}`;
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

/** Non-negative catalog offset from `?offset=`. Invalid → null. */
export function parseExploreOffset(params: URLSearchParams): number | null {
  const raw = params.get("offset");
  if (raw === null || raw.trim() === "") return null;
  if (!/^\d+$/.test(raw)) return null;
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < 0) return null;
  return value;
}

/** Comma-separated style ids already shown (Load more exclude=). */
export function parseExploreExclude(params: URLSearchParams): string[] {
  const raw = params.get("exclude");
  if (!raw?.trim()) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of raw.split(",")) {
    const id = part.trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

export function isExplicitFirstExplorePage(params: URLSearchParams): boolean {
  return params.get("page") === "1";
}

export function explorePageCount(total: number): number {
  if (total <= 0) return 1;
  return Math.ceil(total / EXPLORE_PAGE_SIZE);
}

import type { Metadata } from "next";

type SearchParams = Record<string, string | string[] | undefined>;

/** Any query string on `/explore` is a faceted/paginated view → noindex. */
export function exploreHasSearchParams(searchParams: SearchParams): boolean {
  return Object.keys(searchParams).length > 0;
}

export function exploreRobots(searchParams: SearchParams): Metadata["robots"] {
  return exploreHasSearchParams(searchParams)
    ? { index: false, follow: true }
    : { index: true, follow: true };
}

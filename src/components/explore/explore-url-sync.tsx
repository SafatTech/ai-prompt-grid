"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Isolated `useSearchParams` island so the explore catalog can SSR.
 * Syncs browser back/forward and `?focus=search` into client filter state.
 *
 * Robots is owned by Next metadata only:
 * - `/explore` → generateMetadata(searchParams) → index when bare, noindex when faceted
 * - Middleware sets `x-robots-tag: noindex, follow` for `/explore?*`
 * Do not mutate `<head>` here — removing/replacing Next-managed robots nodes
 * causes `removeChild` crashes on the next soft navigation (N-21).
 */
export function ExploreUrlSync({
  onQueryString,
}: {
  onQueryString: (queryString: string, focusSearch: boolean) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    onQueryString(searchParams.toString(), searchParams.get("focus") === "search");
  }, [searchParams, onQueryString]);

  return null;
}

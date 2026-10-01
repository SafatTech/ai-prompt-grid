"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Isolated `useSearchParams` island so the explore catalog can SSR.
 * Syncs browser back/forward and `?focus=search` into client filter state.
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

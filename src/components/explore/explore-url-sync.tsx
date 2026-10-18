"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const INDEXABLE = "index, follow";
const NOINDEX = "noindex, follow";

function setRobotsMeta(content: string) {
  let meta = document.querySelector('meta[name="robots"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "robots");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

/**
 * Isolated `useSearchParams` island so the explore catalog can SSR.
 * Syncs browser back/forward and `?focus=search` into client filter state.
 * Also keeps meta robots aligned with the x-robots-tag header on client navigations.
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

  useEffect(() => {
    const hasQuery = [...searchParams.keys()].length > 0;
    setRobotsMeta(hasQuery ? NOINDEX : INDEXABLE);
  }, [searchParams]);

  return null;
}

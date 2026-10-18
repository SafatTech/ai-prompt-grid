"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const INDEXABLE = "index, follow";
const NOINDEX = "noindex, follow";

/** Update the existing robots meta; never leave duplicates after client nav. */
function setRobotsMeta(content: string) {
  const metas = document.head.querySelectorAll('meta[name="robots"]');
  if (metas.length === 0) {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "robots");
    meta.setAttribute("content", content);
    document.head.appendChild(meta);
    return;
  }
  const primary = metas[0]!;
  primary.setAttribute("content", content);
  for (let i = 1; i < metas.length; i++) {
    metas[i]!.remove();
  }
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

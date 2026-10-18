"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const INDEXABLE = "index, follow";
const NOINDEX = "noindex, follow";

/**
 * Update an existing robots meta (or dedupe after Next head swaps).
 * Never leave two identical tags after soft navigation (N-16 @ 390).
 */
function setRobotsMeta(content: string) {
  const metas = [
    ...document.head.querySelectorAll<HTMLMetaElement>('meta[name="robots"]'),
  ];
  if (metas.length === 0) {
    // Prefer mutating Next's tag; only create if the framework left none.
    const meta = document.createElement("meta");
    meta.setAttribute("name", "robots");
    meta.setAttribute("content", content);
    document.head.appendChild(meta);
    return;
  }
  const primary = metas[0]!;
  if (primary.getAttribute("content") !== content) {
    primary.setAttribute("content", content);
  }
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
    const content = hasQuery ? NOINDEX : INDEXABLE;
    setRobotsMeta(content);

    // Next may inject another robots tag after our sync during soft nav
    // (especially at mobile viewport when /explore ↔ /explore/faceted swaps).
    const observer = new MutationObserver(() => {
      const metas = document.head.querySelectorAll('meta[name="robots"]');
      if (metas.length !== 1 || metas[0]?.getAttribute("content") !== content) {
        setRobotsMeta(content);
      }
    });
    observer.observe(document.head, { childList: true, subtree: true });

    const settle = window.setTimeout(() => setRobotsMeta(content), 0);

    return () => {
      observer.disconnect();
      window.clearTimeout(settle);
    };
  }, [searchParams]);

  return null;
}

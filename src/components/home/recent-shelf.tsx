"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { useLibrary } from "@/components/providers/library-provider";
import {
  formatRelativeViewed,
  RECENT_VIEWS_KEY,
  readRecentViews,
  type RecentView,
} from "@/lib/recent/views";

type ShelfItem = {
  slug: string;
  title: string;
  result: string;
  saved: boolean;
  viewedAt?: number;
};

type Props = {
  /** Lightweight catalog lookup for saved slugs missing from recent views. */
  catalog: Array<{ id: string; title: string; result: string }>;
};

const EMPTY_RECENT: RecentView[] = [];
let cachedRaw: string | null | undefined;
let cachedRecent: RecentView[] = EMPTY_RECENT;

function subscribeRecent(onStoreChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === RECENT_VIEWS_KEY || event.key === null) onStoreChange();
  }
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

function getRecentSnapshot(): RecentView[] {
  try {
    const raw = localStorage.getItem(RECENT_VIEWS_KEY);
    if (raw === cachedRaw) return cachedRecent;
    cachedRaw = raw;
    cachedRecent = readRecentViews();
    return cachedRecent;
  } catch {
    return cachedRecent;
  }
}

function getServerSnapshot(): RecentView[] {
  return EMPTY_RECENT;
}

export function RecentShelf({ catalog }: Props) {
  const { savedStyles } = useLibrary();
  const recent = useSyncExternalStore(
    subscribeRecent,
    getRecentSnapshot,
    getServerSnapshot,
  );

  const items = useMemo(() => {
    const bySlug = new Map(catalog.map((style) => [style.id, style]));
    const savedSet = new Set(savedStyles);
    const merged: ShelfItem[] = [];
    const seen = new Set<string>();

    for (const view of recent) {
      if (seen.has(view.slug)) continue;
      seen.add(view.slug);
      merged.push({
        slug: view.slug,
        title: view.title,
        result: view.result,
        saved: savedSet.has(view.slug),
        viewedAt: view.viewedAt,
      });
      if (merged.length >= 6) break;
    }

    if (merged.length < 6) {
      for (const slug of savedStyles) {
        if (seen.has(slug)) continue;
        const style = bySlug.get(slug);
        if (!style?.result) continue;
        seen.add(slug);
        merged.push({
          slug,
          title: style.title,
          result: style.result,
          saved: true,
        });
        if (merged.length >= 6) break;
      }
    }

    return merged;
  }, [catalog, recent, savedStyles]);

  if (items.length === 0) return null;

  return (
    <section className="home-section" aria-labelledby="home-recent-heading">
      <div className="home-section-header">
        <div>
          <h2 id="home-recent-heading">Pick up where you left off</h2>
          <p>Recently viewed and saved on this device.</p>
        </div>
        <Link href="/library" className="home-see-all">
          Your saved styles →
        </Link>
      </div>
      <div className="home-recent-rail">
        {items.map((item) => (
          <Link key={item.slug} href={`/styles/${item.slug}`} className="home-recent-item">
            <Image
              src={item.result}
              alt=""
              width={56}
              height={70}
              className="object-cover"
              loading="lazy"
            />
            <span>
              <b>{item.title}</b>
              <span className={item.saved ? "home-recent-saved" : undefined}>
                {item.saved
                  ? "♥ Saved"
                  : item.viewedAt
                    ? formatRelativeViewed(item.viewedAt)
                    : "Viewed"}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

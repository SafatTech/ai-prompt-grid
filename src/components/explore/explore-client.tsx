"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { ExploreHero } from "@/components/explore/explore-hero";
import { ExplorePromoBanners } from "@/components/explore/explore-promo-banners";
import { ExploreUrlSync } from "@/components/explore/explore-url-sync";
import {
  ExploreWallCard,
  type ExploreWallCardData,
} from "@/components/explore/explore-wall-card";
import { StyleCardSkeleton } from "@/components/style-card-skeleton";
import { Button } from "@/components/ui/button";
import {
  EXPLORE_COLLECTION_KEYS,
  isExploreCollectionKey,
} from "@/lib/catalog/explore-collections";
import type {
  ExploreHeroSlide,
  ExplorePromoBanner,
} from "@/lib/catalog/explore-hero";
import {
  exploreListingHeading,
  exploreQueryFromFilters,
  isExplicitFirstExplorePage,
  parseExploreOffset,
  parseExplorePage,
} from "@/lib/catalog/explore-pages";
import {
  activeFilterEntries,
  createEmptyFilters,
  exploreQueryToSearchParams,
  filtersFromExploreQuery,
  parseExploreSearchParams,
  type FilterState,
  type SortOption,
} from "@/lib/catalog/filters";
import { categories as catalogCategories } from "@/lib/catalog/filter-constants";
import type { ExploreQuery } from "@/lib/catalog/schemas";
import { filterGroups, groupLabels } from "@/lib/catalog/filter-constants";
import { assignBareExploreIfFaceted } from "@/lib/navigation/bare-explore";
import { cn } from "@/lib/utils";

type Props = {
  styles: ExploreWallCardData[];
  matchCount: number;
  catalogCount: number;
  pageSize: number;
  initialQuery: ExploreQuery;
  initialPage: number;
  initialQueryString: string;
  heading: string;
  heroSlides: ExploreHeroSlide[];
  banners: ExplorePromoBanner[];
  hotIds: string[];
  newIds: string[];
  categories: string[];
};

type ListingPayload = {
  styles: ExploreWallCardData[];
  matchCount: number;
  page: number;
  heading: string;
};

const QUICK_CHIPS = ["All", ...EXPLORE_COLLECTION_KEYS] as const;

const SORT_OPTIONS: SortOption[] = ["A-Z", "Z-A", "Category"];

const SORT_LABELS: Record<string, string> = {
  "A-Z": "Name A-Z",
  "Z-A": "Name Z-A",
  Category: "Category",
  Trending: "Trending",
  Newest: "Newest",
  "Most saved": "Most saved",
};

export function ExploreClient({
  styles: ssrStyles,
  matchCount: ssrMatchCount,
  catalogCount,
  pageSize,
  initialQuery,
  initialPage,
  initialQueryString,
  heading: ssrHeading,
  heroSlides,
  banners,
  hotIds,
  newIds,
  categories,
}: Props) {
  const router = useRouter();
  const hotSet = useMemo(() => new Set(hotIds), [hotIds]);
  const newSet = useMemo(() => new Set(newIds), [newIds]);
  const categoryList = categories.length ? categories : [...catalogCategories];

  const [search, setSearch] = useState(initialQuery.q);
  const [sort, setSort] = useState<SortOption>(initialQuery.sort);
  const [collection, setCollection] = useState(initialQuery.collection ?? "");
  const [filters, setFilters] = useState<FilterState>(() =>
    filtersFromExploreQuery(initialQuery),
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<FilterState>(() =>
    filtersFromExploreQuery(initialQuery),
  );
  const [draftMatchCount, setDraftMatchCount] = useState(ssrMatchCount);
  const [listing, setListing] = useState<ListingPayload>({
    styles: ssrStyles,
    matchCount: ssrMatchCount,
    page: initialPage,
    heading: ssrHeading,
  });
  const [extraStyles, setExtraStyles] = useState<ExploreWallCardData[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [listingLoading, setListingLoading] = useState(false);
  const appliedQuery = useRef<string | null>(initialQueryString);
  const loadMoreInFlight = useRef(false);
  const fetchSeq = useRef(0);
  const draftCountSeq = useRef(0);
  const searchTimer = useRef<number | null>(null);

  const visible = useMemo(() => {
    const seen = new Set<string>();
    const merged: ExploreWallCardData[] = [];
    for (const style of [...listing.styles, ...extraStyles]) {
      if (seen.has(style.id)) continue;
      seen.add(style.id);
      merged.push({
        ...style,
        isHot: style.isHot ?? hotSet.has(style.id),
        isNew: style.isNew ?? newSet.has(style.id),
      });
    }
    return merged;
  }, [listing.styles, extraStyles, hotSet, newSet]);

  const hasMore = visible.length < listing.matchCount;
  const active = activeFilterEntries(filters);
  const listingQuery = exploreQueryFromFilters(
    filters,
    search,
    sort,
    collection || null,
  );
  const matchCount = listing.matchCount;
  const heading = listing.heading;
  const activeChip = collection || [...filters.category][0] || "All";

  const decorate = useCallback(
    (cards: ExploreWallCardData[]): ExploreWallCardData[] =>
      cards.map((card) => ({
        ...card,
        isHot: card.isHot ?? hotSet.has(card.id),
        isNew: card.isNew ?? newSet.has(card.id),
      })),
    [hotSet, newSet],
  );

  const fetchListing = useCallback(
    async (queryString: string) => {
      const parsed = new URLSearchParams(queryString);
      if (isExplicitFirstExplorePage(parsed)) {
        parsed.delete("page");
        const cleaned = parsed.toString();
        if (!cleaned && assignBareExploreIfFaceted()) return;
        router.replace(cleaned ? `/explore?${cleaned}` : "/explore", {
          scroll: false,
        });
        return;
      }
      const offset = parseExploreOffset(parsed);
      const page = parseExplorePage(parsed);
      if (page === null && offset === null) {
        setListing({
          styles: [],
          matchCount: 0,
          page: 1,
          heading: exploreListingHeading(),
        });
        setExtraStyles([]);
        setPendingCount(0);
        return;
      }
      const query = parseExploreSearchParams(parsed);
      const params = exploreQueryToSearchParams(query);
      if (offset !== null) {
        params.set("offset", String(offset));
      } else {
        params.set("page", String(page ?? 1));
      }
      params.set("pageSize", String(pageSize));
      const seq = ++fetchSeq.current;
      setListingLoading(true);
      setExtraStyles([]);
      setPendingCount(0);
      try {
        const res = await fetch(`/api/home/explore?${params.toString()}`);
        if (!res.ok || seq !== fetchSeq.current) return;
        const data = (await res.json()) as {
          styles?: ExploreWallCardData[];
          total?: number;
          page?: number;
          offset?: number;
        };
        const total = typeof data.total === "number" ? data.total : 0;
        const resolvedPage =
          typeof data.page === "number"
            ? data.page
            : offset !== null
              ? Math.floor(offset / Math.max(pageSize, 1)) + 1
              : (page ?? 1);
        setListing({
          styles: decorate(Array.isArray(data.styles) ? data.styles : []),
          matchCount: total,
          page: resolvedPage,
          heading: exploreListingHeading(query.collection),
        });
        setDraftMatchCount(total);
      } finally {
        if (seq === fetchSeq.current) setListingLoading(false);
      }
    },
    [pageSize, router, decorate],
  );

  const syncUrl = useCallback(
    (next: {
      q: string;
      sort: SortOption;
      filters: FilterState;
      collection?: string;
    }) => {
      const params = exploreQueryToSearchParams({
        q: next.q,
        sort: next.sort,
        category: [...next.filters.category],
        subject: [...next.filters.subject],
        intent: [...next.filters.intent],
        requirement: [...next.filters.requirement],
        tool: [...next.filters.tool],
        ...(next.collection?.trim()
          ? { collection: next.collection.trim() }
          : {}),
      });
      const qs = params.toString();
      appliedQuery.current = qs;
      if (!qs) {
        if (assignBareExploreIfFaceted()) return;
        router.replace("/explore", { scroll: false });
        setListing({
          styles: ssrStyles,
          matchCount: ssrMatchCount,
          page: 1,
          heading: ssrHeading,
        });
        setExtraStyles([]);
        setPendingCount(0);
        return;
      }
      router.replace(`/explore?${qs}`, { scroll: false });
      void fetchListing(qs);
    },
    [router, fetchListing, ssrStyles, ssrMatchCount, ssrHeading],
  );

  const onUrlQueryString = useCallback(
    (next: string, focusSearch: boolean) => {
      if (appliedQuery.current !== next) {
        if (
          !next &&
          typeof window !== "undefined" &&
          window.location.search.length > 1
        ) {
          return;
        }
        appliedQuery.current = next;
        const parsed = new URLSearchParams(next);
        const query = parseExploreSearchParams(parsed);
        const nextFilters = filtersFromExploreQuery(query);
        setSearch(query.q);
        setSort(query.sort);
        setCollection(query.collection ?? "");
        setFilters(nextFilters);
        setDraftFilters(nextFilters);
        setExtraStyles([]);
        setPendingCount(0);
        if (!next) {
          setListing({
            styles: ssrStyles,
            matchCount: ssrMatchCount,
            page: 1,
            heading: ssrHeading,
          });
          setDraftMatchCount(ssrMatchCount);
        } else {
          void fetchListing(next);
        }
      }
      if (focusSearch) {
        document.getElementById("mainSearch")?.focus();
      }
    },
    [fetchListing, ssrStyles, ssrMatchCount, ssrHeading],
  );

  const previewDraftCount = useCallback(
    async (
      nextFilters: FilterState,
      nextSearch: string,
      nextSort: SortOption,
      nextCollection: string,
    ) => {
      const params = exploreQueryToSearchParams({
        q: nextSearch,
        sort: nextSort,
        category: [...nextFilters.category],
        subject: [...nextFilters.subject],
        intent: [...nextFilters.intent],
        requirement: [...nextFilters.requirement],
        tool: [...nextFilters.tool],
        ...(nextCollection ? { collection: nextCollection } : {}),
      });
      params.set("page", "1");
      params.set("pageSize", "1");
      const seq = ++draftCountSeq.current;
      try {
        const res = await fetch(`/api/home/explore?${params.toString()}`);
        if (!res.ok || seq !== draftCountSeq.current) return;
        const data = (await res.json()) as { total?: number };
        if (typeof data.total === "number") setDraftMatchCount(data.total);
      } catch {
        /* keep prior draft count */
      }
    },
    [],
  );

  async function loadMore() {
    if (!hasMore || loadMoreInFlight.current || loadingMore) return;
    loadMoreInFlight.current = true;
    setLoadingMore(true);
    setPendingCount(pageSize);
    try {
      const params = exploreQueryToSearchParams(listingQuery);
      params.set("exclude", visible.map((style) => style.id).join(","));
      params.set("pageSize", String(pageSize));
      const res = await fetch(`/api/home/explore?${params.toString()}`);
      if (!res.ok) {
        setPendingCount(0);
        return;
      }
      const data = (await res.json()) as { styles?: ExploreWallCardData[] };
      const batch = decorate(Array.isArray(data.styles) ? data.styles : []);
      setExtraStyles((prev) => {
        const seen = new Set(prev.map((style) => style.id));
        for (const style of listing.styles) seen.add(style.id);
        const merged = [...prev];
        for (const style of batch) {
          if (seen.has(style.id)) continue;
          seen.add(style.id);
          merged.push(style);
        }
        return merged;
      });
      setPendingCount(0);
    } finally {
      loadMoreInFlight.current = false;
      setLoadingMore(false);
    }
  }

  function toggleFilter(
    group: keyof FilterState,
    value: string,
    stageOnly = false,
  ) {
    const source = stageOnly ? draftFilters : filters;
    const next: FilterState = {
      category: new Set(source.category),
      subject: new Set(source.subject),
      intent: new Set(source.intent),
      requirement: new Set(source.requirement),
      tool: new Set(source.tool),
    };
    if (next[group].has(value)) next[group].delete(value);
    else next[group].add(value);
    if (stageOnly) {
      setDraftFilters(next);
      void previewDraftCount(next, search, sort, collection);
      return;
    }
    setFilters(next);
    setDraftFilters(next);
    setExtraStyles([]);
    setPendingCount(0);
    syncUrl({ q: search, sort, filters: next, collection });
  }

  function applyDraftFilters() {
    setFilters(draftFilters);
    setExtraStyles([]);
    setPendingCount(0);
    setDrawerOpen(false);
    syncUrl({ q: search, sort, filters: draftFilters, collection });
  }

  function openDrawer() {
    setDraftFilters({
      category: new Set(filters.category),
      subject: new Set(filters.subject),
      intent: new Set(filters.intent),
      requirement: new Set(filters.requirement),
      tool: new Set(filters.tool),
    });
    setDraftMatchCount(matchCount);
    setDrawerOpen(true);
  }

  function clearFilters() {
    const empty = createEmptyFilters();
    setFilters(empty);
    setDraftFilters(empty);
    setDraftMatchCount(ssrMatchCount);
    setSearch("");
    setSort("A-Z");
    setCollection("");
    setExtraStyles([]);
    setPendingCount(0);
    appliedQuery.current = "";
    setListing({
      styles: ssrStyles,
      matchCount: ssrMatchCount,
      page: 1,
      heading: ssrHeading,
    });
    if (assignBareExploreIfFaceted()) return;
    router.replace("/explore", { scroll: false });
  }

  function setQuickFilter(key: string) {
    setExtraStyles([]);
    setPendingCount(0);
    if (key === "All") {
      const empty = createEmptyFilters();
      setFilters(empty);
      setDraftFilters(empty);
      setCollection("");
      setListing({
        styles: ssrStyles,
        matchCount: ssrMatchCount,
        page: 1,
        heading: exploreListingHeading(),
      });
      syncUrl({ q: search, sort, filters: empty, collection: "" });
      scrollToGrid();
      return;
    }
    if (isExploreCollectionKey(key)) {
      const empty = createEmptyFilters();
      setFilters(empty);
      setDraftFilters(empty);
      setCollection(key);
      syncUrl({ q: search, sort, filters: empty, collection: key });
      scrollToGrid();
      return;
    }
    // Category / search tag from hero chips.
    const empty = createEmptyFilters();
    if ((catalogCategories as readonly string[]).includes(key)) {
      empty.category.add(key);
      setFilters(empty);
      setDraftFilters(empty);
      setCollection("");
      syncUrl({ q: search, sort, filters: empty, collection: "" });
    } else {
      setFilters(empty);
      setDraftFilters(empty);
      setCollection("");
      setSearch(key);
      syncUrl({ q: key, sort, filters: empty, collection: "" });
    }
    scrollToGrid();
  }

  function scrollToGrid() {
    document
      .getElementById("explore-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    document.body.classList.toggle("no-scroll", drawerOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setDrawerOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  function onSortChange(nextSort: SortOption) {
    setSort(nextSort);
    setExtraStyles([]);
    setPendingCount(0);
    syncUrl({ q: search, sort: nextSort, filters, collection });
  }

  function onSearchChange(value: string) {
    setSearch(value);
    setExtraStyles([]);
    setPendingCount(0);
    if (searchTimer.current) window.clearTimeout(searchTimer.current);
    searchTimer.current = window.setTimeout(() => {
      syncUrl({ q: value, sort, filters, collection });
    }, 200);
  }

  const activeCount = active.length;
  const panelFilters = (isDrawer: boolean) =>
    isDrawer ? draftFilters : filters;
  const panelActiveCount = (isDrawer: boolean) =>
    isDrawer ? activeFilterEntries(draftFilters).length : activeCount;
  const panelMatchCount = (isDrawer: boolean) =>
    isDrawer ? draftMatchCount : matchCount;

  const filterPanel = (isDrawer = false) => {
    const shownFilters = panelFilters(isDrawer);
    const shownActive = panelActiveCount(isDrawer);
    const shownMatch = panelMatchCount(isDrawer);
    return (
      <div
        className={cn(
          "filter-side-block",
          isDrawer
            ? "fixed inset-x-0 bottom-0 z-[65] max-h-[84dvh] rounded-b-none shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
            : "sticky top-[calc(var(--header)+20px)] max-h-[calc(100dvh-var(--header)-40px)]",
        )}
        role={isDrawer ? "dialog" : undefined}
        aria-modal={isDrawer || undefined}
        aria-label={isDrawer ? "Style filters" : undefined}
      >
        <div className="filter-side-block__head">
          <div className="min-w-0">
            <h2 className="m-0 text-[15px] font-bold tracking-[-0.02em]">
              Filters
            </h2>
            <p className="m-0 mt-0.5 text-[11px] text-[var(--muted)]">
              {shownActive ? `${shownActive} active` : "Refine the catalog"}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {shownActive ? (
              <button
                type="button"
                className="cursor-pointer rounded-[10px] border-0 bg-transparent px-2.5 py-2 text-xs font-bold text-[#b9abff] hover:bg-[rgba(139,108,255,0.1)]"
                onClick={() => {
                  if (isDrawer) {
                    const empty = createEmptyFilters();
                    setDraftFilters(empty);
                    setDraftMatchCount(catalogCount);
                    return;
                  }
                  clearFilters();
                }}
                data-testid="clear-filters"
              >
                Clear
              </button>
            ) : (
              <button
                type="button"
                className="sr-only"
                onClick={() => {
                  if (isDrawer) {
                    const empty = createEmptyFilters();
                    setDraftFilters(empty);
                    setDraftMatchCount(catalogCount);
                    return;
                  }
                  clearFilters();
                }}
                data-testid="clear-filters"
              >
                Clear all
              </button>
            )}
            {isDrawer ? (
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-[12px] border border-[var(--line)] bg-[var(--surface-2)] text-lg leading-none text-[var(--muted)]"
                aria-label="Close filters"
                onClick={() => setDrawerOpen(false)}
              >
                ×
              </button>
            ) : null}
          </div>
        </div>

        <div className="filter-side-block__body scroll-panel">
          {(Object.keys(filterGroups) as (keyof typeof filterGroups)[]).map(
            (key) => {
              const groupActive = shownFilters[key].size;
              return (
                <section key={key} className="filter-side-block__group">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="m-0 text-[11px] font-bold tracking-[0.08em] text-[#a8a5b4] uppercase">
                      {groupLabels[key]}
                    </h3>
                    {groupActive ? (
                      <span className="rounded-md bg-[rgba(139,108,255,0.16)] px-1.5 py-0.5 text-[10px] font-bold text-[#c5b9ff]">
                        {groupActive}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {filterGroups[key].map((value) => {
                      const activeChipBtn = shownFilters[key].has(value);
                      return (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={activeChipBtn}
                          data-testid={`filter-${key}-${value}`}
                          onClick={() => toggleFilter(key, value, isDrawer)}
                          className="filter-chip"
                        >
                          <span className="filter-chip__mark" aria-hidden>
                            ✓
                          </span>
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            },
          )}
        </div>

        {isDrawer ? (
          <div className="border-t border-[var(--line)] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button className="w-full" onClick={applyDraftFilters}>
              Show {shownMatch} {shownMatch === 1 ? "style" : "styles"}
            </Button>
          </div>
        ) : null}
      </div>
    );
  };

  const showingLabel = `Showing ${visible.length} of ${matchCount}`;

  return (
    <div className="explore-v5">
      <Suspense fallback={null}>
        <ExploreUrlSync onQueryString={onUrlQueryString} />
      </Suspense>

      <ExploreHero slides={heroSlides} onFilter={setQuickFilter} />

      <div className="explore-sticky-controls">
        <div className="explore-toolbar-bar">
          <label className="explore-search">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a6a4b2"
              strokeWidth="2"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <span className="sr-only">Search styles</span>
            <input
              id="mainSearch"
              type="search"
              placeholder="Search styles…"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              data-testid="explore-search"
              autoComplete="off"
            />
          </label>
          <select
            className="explore-sort"
            aria-label="Sort"
            value={SORT_OPTIONS.includes(sort) ? sort : "A-Z"}
            data-testid="sort-select"
            onChange={(event) => onSortChange(event.target.value as SortOption)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {SORT_LABELS[option] ?? option}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="explore-filters-btn"
            data-testid="open-filters"
            onClick={openDrawer}
          >
            Filters{activeCount ? ` · ${activeCount}` : ""}
          </button>
        </div>

        <div className="chip-bar">
          <div className="chips" role="toolbar" aria-label="Filters">
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                className="chip"
                data-f={chip}
                aria-pressed={activeChip === chip}
                onClick={() => setQuickFilter(chip)}
              >
                {chip}
              </button>
            ))}
            <span className="chip-sep" aria-hidden />
            {categoryList.map((chip) => (
              <button
                key={chip}
                type="button"
                className="chip"
                data-f={chip}
                aria-pressed={filters.category.has(chip) && !collection}
                onClick={() => setQuickFilter(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ExplorePromoBanners banners={banners} onFilter={setQuickFilter} />

      <div className="wrap" id="explore-grid">
        <div className="toolbar">
          <div>
            <h2>{heading}</h2>
            <p>Catalog wall · {pageSize} at a time</p>
          </div>
          <div className="count" data-testid="results-count">
            {matchCount ? showingLabel : null}
          </div>
        </div>

        {listingLoading && visible.length === 0 ? (
          <div className="page-grid" data-testid="style-results" aria-busy="true">
            {Array.from({ length: Math.min(pageSize, 24) }, (_, index) => (
              <StyleCardSkeleton
                key={`explore-listing-${index}`}
                variant="compact"
                index={index}
              />
            ))}
          </div>
        ) : matchCount ? (
          <>
            <div
              className="page-grid"
              data-testid="style-results"
              aria-busy={pendingCount > 0 || undefined}
            >
              {visible.map((style, index) => (
                <ExploreWallCard
                  key={style.id}
                  style={style}
                  priority={listing.page === 1 && index === 0}
                  eager={listing.page === 1 && index > 0 && index < 8}
                />
              ))}
              {Array.from({ length: pendingCount }, (_, index) => (
                <StyleCardSkeleton
                  key={`explore-pending-${index}`}
                  variant="compact"
                  index={index}
                />
              ))}
            </div>
            <div className="more-wrap">
              <div className="more-meta">{matchCount ? showingLabel : ""}</div>
              {hasMore ? (
                <button
                  type="button"
                  className="more"
                  data-testid="load-more"
                  disabled={loadingMore}
                  onClick={() => void loadMore()}
                >
                  {loadingMore ? "Loading…" : "Load more"}
                </button>
              ) : null}
            </div>
          </>
        ) : (
          <div className="empty show" data-testid="explore-empty">
            Nothing matched those filters.
            <div className="mt-4">
              <Button variant="secondary" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {drawerOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[64] cursor-pointer border-0 bg-black/55"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
          />
          {filterPanel(true)}
        </>
      ) : null}
    </div>
  );
}

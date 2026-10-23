"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { ExploreUrlSync } from "@/components/explore/explore-url-sync";
import { StyleCard } from "@/components/style-card";
import { StyleCardSkeleton } from "@/components/style-card-skeleton";
import { Button } from "@/components/ui/button";
import {
  exploreListingHeading,
  explorePageCount,
  explorePageHref,
  exploreQueryFromFilters,
  isExplicitFirstExplorePage,
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
import type { ExploreQuery } from "@/lib/catalog/schemas";
import type { StyleCardData } from "@/lib/catalog/style-card-data";
import { filterGroups, groupLabels } from "@/lib/catalog/filter-constants";
import { assignBareExploreIfFaceted } from "@/lib/navigation/bare-explore";
import { cn } from "@/lib/utils";

type Props = {
  /** Default (no-param) SSR page — filters load via /api/home/explore. */
  styles: StyleCardData[];
  matchCount: number;
  catalogCount: number;
  pageSize: number;
  initialQuery: ExploreQuery;
  initialPage: number;
  initialQueryString: string;
  heading: string;
};

type ListingPayload = {
  styles: StyleCardData[];
  matchCount: number;
  page: number;
  heading: string;
};

export function ExploreClient({
  styles: ssrStyles,
  matchCount: ssrMatchCount,
  catalogCount,
  pageSize,
  initialQuery,
  initialPage,
  initialQueryString: _initialQueryString,
  heading: ssrHeading,
}: Props) {
  void _initialQueryString;
  const router = useRouter();
  const [search, setSearch] = useState(initialQuery.q);
  const [sort, setSort] = useState<SortOption>(initialQuery.sort);
  const [filters, setFilters] = useState<FilterState>(() =>
    filtersFromExploreQuery(initialQuery),
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  /** Staged drawer filters — URL sync only on "Show N styles" (N-15). */
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
  const [extraStyles, setExtraStyles] = useState<StyleCardData[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [listingLoading, setListingLoading] = useState(false);
  const appliedQuery = useRef<string | null>(null);
  const loadMoreInFlight = useRef(false);
  const fetchSeq = useRef(0);
  const draftCountSeq = useRef(0);

  const pageCount = explorePageCount(listing.matchCount);
  const safePage = Math.min(listing.page, pageCount);
  const visible = useMemo(() => {
    const seen = new Set<string>();
    const merged: StyleCardData[] = [];
    for (const style of [...listing.styles, ...extraStyles]) {
      if (seen.has(style.id)) continue;
      seen.add(style.id);
      merged.push(style);
    }
    return merged;
  }, [listing.styles, extraStyles]);
  const hasMore = visible.length < listing.matchCount;
  const nextFetchPage =
    listing.page + Math.ceil(extraStyles.length / Math.max(pageSize, 1)) + 1;
  const active = activeFilterEntries(filters);
  const listingQuery = exploreQueryFromFilters(filters, search, sort);
  const matchCount = listing.matchCount;
  const heading = listing.heading;

  const fetchListing = useCallback(
    async (queryString: string) => {
      const parsed = new URLSearchParams(queryString);
      if (isExplicitFirstExplorePage(parsed)) {
        parsed.delete("page");
        const cleaned = parsed.toString();
        if (!cleaned && assignBareExploreIfFaceted()) return;
        router.replace(cleaned ? `/explore?${cleaned}` : "/explore", { scroll: false });
        return;
      }
      const page = parseExplorePage(parsed);
      if (page === null) {
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
      params.set("page", String(page));
      params.set("pageSize", String(pageSize));
      const seq = ++fetchSeq.current;
      setListingLoading(true);
      setExtraStyles([]);
      setPendingCount(0);
      try {
        const res = await fetch(`/api/home/explore?${params.toString()}`);
        if (!res.ok || seq !== fetchSeq.current) return;
        const data = (await res.json()) as {
          styles?: StyleCardData[];
          total?: number;
        };
        const total = typeof data.total === "number" ? data.total : 0;
        setListing({
          styles: Array.isArray(data.styles) ? data.styles : [],
          matchCount: total,
          page,
          heading: exploreListingHeading(),
        });
        setDraftMatchCount(total);
      } finally {
        if (seq === fetchSeq.current) setListingLoading(false);
      }
    },
    [pageSize, router],
  );

  const syncUrl = useCallback(
    (next: { q: string; sort: SortOption; filters: FilterState }) => {
      const params = exploreQueryToSearchParams({
        q: next.q,
        sort: next.sort,
        category: [...next.filters.category],
        subject: [...next.filters.subject],
        intent: [...next.filters.intent],
        requirement: [...next.filters.requirement],
        tool: [...next.filters.tool],
      });
      const qs = params.toString();
      appliedQuery.current = qs;
      if (!qs) {
        // Soft-nav back to bare /explore can stack robots meta; hard-load instead.
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
        appliedQuery.current = next;
        const parsed = new URLSearchParams(next);
        const query = parseExploreSearchParams(parsed);
        const nextFilters = filtersFromExploreQuery(query);
        setSearch(query.q);
        setSort(query.sort);
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
    async (nextFilters: FilterState, nextSearch: string, nextSort: SortOption) => {
      const params = exploreQueryToSearchParams({
        q: nextSearch,
        sort: nextSort,
        category: [...nextFilters.category],
        subject: [...nextFilters.subject],
        intent: [...nextFilters.intent],
        requirement: [...nextFilters.requirement],
        tool: [...nextFilters.tool],
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
    // Insert placeholders in the click frame so footer CLS is excluded / avoided.
    setPendingCount(pageSize);
    try {
      const params = exploreQueryToSearchParams(listingQuery);
      params.set("page", String(nextFetchPage));
      params.set("pageSize", String(pageSize));
      const res = await fetch(`/api/home/explore?${params.toString()}`);
      if (!res.ok) {
        setPendingCount(0);
        return;
      }
      const data = (await res.json()) as { styles?: StyleCardData[] };
      const batch = Array.isArray(data.styles) ? data.styles : [];
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

  function toggleFilter(group: keyof FilterState, value: string, stageOnly = false) {
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
      void previewDraftCount(next, search, sort);
      return;
    }
    setFilters(next);
    setDraftFilters(next);
    setExtraStyles([]);
    setPendingCount(0);
    syncUrl({ q: search, sort, filters: next });
  }

  function applyDraftFilters() {
    setFilters(draftFilters);
    setExtraStyles([]);
    setPendingCount(0);
    setDrawerOpen(false);
    syncUrl({ q: search, sort, filters: draftFilters });
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
    setSort("Trending");
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
    syncUrl({ q: search, sort: nextSort, filters });
  }

  function onSearchChange(value: string) {
    setSearch(value);
    setExtraStyles([]);
    setPendingCount(0);
    syncUrl({ q: value, sort, filters });
  }

  const activeCount = active.length;
  const panelFilters = (isDrawer: boolean) => (isDrawer ? draftFilters : filters);
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
          <h2 className="m-0 text-[15px] font-bold tracking-[-0.02em]">Filters</h2>
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
        {(Object.keys(filterGroups) as (keyof typeof filterGroups)[]).map((key) => {
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
                  const activeChip = shownFilters[key].has(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={activeChip}
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
        })}
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

  return (
    <div>
      <Suspense fallback={null}>
        <ExploreUrlSync onQueryString={onUrlQueryString} />
      </Suspense>
      <section className="container pt-10 pb-9 sm:pt-16">
        <h1 className="m-0 mb-2.5 text-[clamp(32px,8vw,70px)] leading-none tracking-[-0.055em]">
          {heading}
        </h1>
        <p className="m-0 text-[15px] text-[var(--muted)] sm:text-[17px]">
          Browse {catalogCount} tested styles for portraits, pets, places, objects, and
          more.
        </p>
        <form
          className="mt-[30px] grid grid-cols-1 gap-2.5 sm:grid-cols-[1fr_auto]"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="sr-only" htmlFor="mainSearch">
            Search styles
          </label>
          <input
            id="mainSearch"
            type="search"
            placeholder="Search cinematic, watercolor, headshot, anime..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            data-testid="explore-search"
            className="h-14 rounded-[14px] border border-[var(--line)] bg-[var(--surface)] px-[18px] text-base text-[var(--text)] placeholder:text-[#858391] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(139,108,255,0.55)]"
          />
          <Button
            type="button"
            variant="secondary"
            className="md:hidden"
            data-testid="open-filters"
            onClick={openDrawer}
          >
            Filters{activeCount ? ` · ${activeCount}` : ""}
          </Button>
        </form>
        {active.length ? (
          <div className="mt-4 flex flex-wrap gap-2" data-testid="active-filters">
            {active.map(({ group, value }) => (
              <button
                key={`${group}-${value}`}
                type="button"
                className="inline-flex min-h-8 items-center gap-1.5 rounded-[var(--pill)] border border-[rgba(139,108,255,0.45)] bg-[rgba(139,108,255,0.12)] px-3 text-xs text-[#d6cdff]"
                onClick={() => toggleFilter(group, value)}
                aria-label={`Remove ${value} filter`}
              >
                {value} ×
              </button>
            ))}
          </div>
        ) : null}
      </section>

      <section className="container grid gap-6 pt-2.5 pb-[100px] md:grid-cols-[300px_minmax(0,1fr)] lg:gap-8">
        <aside className="hidden md:block" data-testid="desktop-filters">
          {filterPanel()}
        </aside>
        <div>
          <div className="explore-toolbar mb-[18px] flex min-h-11 items-center justify-between gap-4">
            <span
              className="explore-results-count inline-block w-[12ch] shrink-0 text-[13px] text-[var(--muted)] tabular-nums"
              data-testid="results-count"
            >
              {matchCount} {matchCount === 1 ? "style" : "styles"}
            </span>
            <div className="ml-auto flex items-center gap-2">
              <SortSelect value={sort} onChange={onSortChange} />
            </div>
          </div>
          <h2 className="sr-only">Style results</h2>
          {listingLoading ? (
            <div
              className="grid grid-cols-1 items-start gap-[18px] sm:grid-cols-2 lg:grid-cols-3"
              data-testid="style-results"
              aria-busy="true"
            >
              {Array.from({ length: pageSize }, (_, index) => (
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
                className="grid grid-cols-1 items-start gap-[18px] sm:grid-cols-2 lg:grid-cols-3"
                data-testid="style-results"
                aria-busy={pendingCount > 0 || undefined}
              >
                {visible.map((style, index) => (
                  <StyleCard
                    key={style.id}
                    style={style}
                    compact
                    /* Card 1 only: high fetchPriority. Cards 2–4: eager, normal priority (LCP). */
                    priority={listing.page === 1 && index === 0}
                    eager={listing.page === 1 && index > 0 && index < 4}
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
              {hasMore ? (
                <div className="mt-8 flex justify-center">
                  <Button
                    variant="secondary"
                    data-testid="load-more"
                    disabled={loadingMore}
                    onClick={() => void loadMore()}
                  >
                    {loadingMore ? "Loading…" : "Load more styles"}
                  </Button>
                </div>
              ) : null}
              <ExplorePagination
                page={safePage}
                pageCount={pageCount}
                hrefFor={(target) => explorePageHref(listingQuery, target)}
              />
            </>
          ) : (
            <EmptyState
              title="No styles match those filters"
              description="Try a broader search or clear one of your selected filters."
              action={
                <Button variant="secondary" onClick={clearFilters}>
                  Clear filters
                </Button>
              }
            />
          )}
        </div>
      </section>
      {drawerOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[64] cursor-pointer border-0 bg-black/55 md:hidden"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
          />
          {filterPanel(true)}
        </>
      ) : null}
    </div>
  );
}

function ExplorePagination({
  page,
  pageCount,
  hrefFor,
}: {
  page: number;
  pageCount: number;
  hrefFor: (page: number) => string;
}) {
  if (pageCount <= 1) return null;

  const linkClass =
    "inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--line)] px-3 text-sm font-bold text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-[var(--text)]";

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
      aria-label="Style pages"
      data-testid="explore-pagination"
    >
      {page > 1 ? (
        <a rel="prev" href={hrefFor(page - 1)} className={linkClass}>
          Previous
        </a>
      ) : null}
      {Array.from({ length: pageCount }, (_, index) => {
        const number = index + 1;
        if (number === page) {
          return (
            <span
              key={number}
              aria-current="page"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-[var(--line-strong)] bg-[var(--surface-2)] px-3 text-sm font-bold text-[var(--text)]"
            >
              {number}
            </span>
          );
        }
        return (
          <a key={number} href={hrefFor(number)} className={`${linkClass} min-w-11`}>
            {number}
          </a>
        );
      })}
      {page < pageCount ? (
        <a
          rel="next"
          href={hrefFor(page + 1)}
          className={linkClass}
          data-testid="explore-next"
        >
          Next
        </a>
      ) : null}
    </nav>
  );
}

const SORT_OPTIONS: SortOption[] = ["Trending", "Newest", "Most saved"];

function SortSelect({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <select
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        value={value}
        data-testid="sort-select"
        onChange={(event) => onChange(event.target.value as SortOption)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`Sort styles: ${value}`}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex min-h-11 min-w-[148px] cursor-pointer items-center justify-between gap-2 rounded-[12px] border px-3 text-[13px] transition-colors duration-150",
          open
            ? "border-[var(--line-strong)] bg-[var(--surface-2)]"
            : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)]",
        )}
      >
        <span className="font-semibold text-[var(--text)]">{value}</span>
        <span
          className={cn(
            "text-[var(--muted)] transition-transform duration-150",
            open && "rotate-180",
          )}
          aria-hidden
        >
          <ChevronIcon />
        </span>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Sort styles"
          className="absolute top-[calc(100%+6px)] right-0 z-30 m-0 min-w-full list-none rounded-[12px] border border-[var(--line)] bg-[var(--surface)] p-1 shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
        >
          {SORT_OPTIONS.map((option) => {
            const active = option === value;
            return (
              <li key={option} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-4 rounded-[8px] px-3 py-2 text-left text-[13px] transition-colors duration-150",
                    active
                      ? "bg-[rgba(255,255,255,0.06)] font-semibold text-[var(--text)]"
                      : "text-[#d2d0da] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--text)]",
                  )}
                >
                  {option}
                  {active ? (
                    <span className="text-[var(--muted)]" aria-hidden>
                      <CheckIcon />
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M4.5 10.5 8.2 14.2 15.5 6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

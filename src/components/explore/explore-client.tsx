"use client";

import { Suspense, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { ExploreUrlSync } from "@/components/explore/explore-url-sync";
import { StyleCard } from "@/components/style-card";
import { Button } from "@/components/ui/button";
import {
  activeFilterEntries,
  createEmptyFilters,
  exploreQueryToSearchParams,
  filterStyles,
  filtersFromExploreQuery,
  parseExploreSearchParams,
  type FilterState,
  type SortOption,
} from "@/lib/catalog/filters";
import type { ExploreQuery } from "@/lib/catalog/schemas";
import { filterGroups, groupLabels } from "@/lib/catalog/styles";
import type { CatalogStyle } from "@/lib/catalog/types";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 18;

type Props = { styles: CatalogStyle[]; initialQuery: ExploreQuery };

export function ExploreClient({ styles, initialQuery }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(initialQuery.q);
  const [sort, setSort] = useState<SortOption>(initialQuery.sort);
  const [filters, setFilters] = useState<FilterState>(() =>
    filtersFromExploreQuery(initialQuery),
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const appliedQuery = useRef<string | null>(
    exploreQueryToSearchParams(initialQuery).toString(),
  );

  const catalog = styles;
  const results = useMemo(
    () => filterStyles(catalog, filters, search, sort),
    [catalog, filters, search, sort],
  );
  const visible = results.slice(0, page * PAGE_SIZE);
  const active = activeFilterEntries(filters);

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
      router.replace(qs ? `/explore?${qs}` : "/explore", { scroll: false });
    },
    [router],
  );

  const onUrlQueryString = useCallback((next: string, focusSearch: boolean) => {
    const first = appliedQuery.current === null;
    if (appliedQuery.current !== next) {
      appliedQuery.current = next;
      if (!first) {
        const query = parseExploreSearchParams(new URLSearchParams(next));
        setSearch(query.q);
        setSort(query.sort);
        setFilters(filtersFromExploreQuery(query));
        setPage(1);
      }
    }
    if (focusSearch) {
      document.getElementById("mainSearch")?.focus();
    }
  }, []);

  function toggleFilter(group: keyof FilterState, value: string) {
    const next: FilterState = {
      category: new Set(filters.category),
      subject: new Set(filters.subject),
      intent: new Set(filters.intent),
      requirement: new Set(filters.requirement),
      tool: new Set(filters.tool),
    };
    if (next[group].has(value)) next[group].delete(value);
    else next[group].add(value);
    setFilters(next);
    setPage(1);
    syncUrl({ q: search, sort, filters: next });
  }

  function clearFilters() {
    const empty = createEmptyFilters();
    setFilters(empty);
    setSearch("");
    setSort("Trending");
    setPage(1);
    appliedQuery.current = "";
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
    setPage(1);
    syncUrl({ q: search, sort: nextSort, filters });
  }

  function onSearchChange(value: string) {
    setSearch(value);
    setPage(1);
    syncUrl({ q: value, sort, filters });
  }

  const activeCount = active.length;

  const filterPanel = (isDrawer = false) => (
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
            {activeCount ? `${activeCount} active` : "Refine the catalog"}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {activeCount ? (
            <button
              type="button"
              className="cursor-pointer rounded-[10px] border-0 bg-transparent px-2.5 py-2 text-xs font-bold text-[#b9abff] hover:bg-[rgba(139,108,255,0.1)]"
              onClick={clearFilters}
              data-testid="clear-filters"
            >
              Clear
            </button>
          ) : (
            <button
              type="button"
              className="sr-only"
              onClick={clearFilters}
              data-testid="clear-filters"
            >
              Clear all
            </button>
          )}
          {isDrawer ? (
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-[12px] border border-[var(--line)] bg-[var(--surface-2)] text-lg leading-none text-[var(--muted)]"
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
          const groupActive = filters[key].size;
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
                  const activeChip = filters[key].has(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={activeChip}
                      data-testid={`filter-${key}-${value}`}
                      onClick={() => toggleFilter(key, value)}
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
          <Button className="w-full" onClick={() => setDrawerOpen(false)}>
            Show {results.length} {results.length === 1 ? "style" : "styles"}
          </Button>
        </div>
      ) : null}
    </div>
  );

  return (
    <div>
      <Suspense fallback={null}>
        <ExploreUrlSync onQueryString={onUrlQueryString} />
      </Suspense>
      <section className="container pt-10 pb-9 sm:pt-16">
        <h1 className="m-0 mb-2.5 text-[clamp(32px,8vw,70px)] leading-none tracking-[-0.055em]">
          Find a style for your photo
        </h1>
        <p className="m-0 text-[15px] text-[var(--muted)] sm:text-[17px]">
          Browse {catalog.length} tested styles for portraits, pets, places, objects, and
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
            className="h-14 rounded-[14px] border border-[var(--line)] bg-[var(--surface)] px-[18px] text-base text-[var(--text)] placeholder:text-[#858391]"
          />
          <Button
            type="button"
            variant="secondary"
            className="md:hidden"
            data-testid="open-filters"
            onClick={() => setDrawerOpen(true)}
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
          <div className="mb-[18px] flex items-center justify-between gap-4">
            <span className="text-[13px] text-[var(--muted)]" data-testid="results-count">
              {results.length} {results.length === 1 ? "style" : "styles"}
            </span>
            <SortSelect value={sort} onChange={onSortChange} />
          </div>
          {results.length ? (
            <>
              <div
                className="grid grid-cols-1 items-start gap-[18px] sm:grid-cols-2 lg:grid-cols-3"
                data-testid="style-results"
              >
                {visible.map((style) => (
                  <StyleCard key={style.id} style={style} compact />
                ))}
              </div>
              {visible.length < results.length ? (
                <div className="mt-8 flex justify-center">
                  <Button
                    variant="secondary"
                    data-testid="load-more"
                    onClick={() => setPage((current) => current + 1)}
                  >
                    Load more styles
                  </Button>
                </div>
              ) : null}
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
          "flex min-h-10 cursor-pointer items-center gap-2 rounded-[12px] border px-3 text-[13px] transition-colors duration-150",
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

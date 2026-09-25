"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
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
import { filterGroups, groupLabels } from "@/lib/catalog/styles";
import type { CatalogStyle } from "@/lib/catalog/types";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

type Props = { styles: CatalogStyle[] };

export function ExploreClient({ styles }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = useMemo(
    () => parseExploreSearchParams(searchParams),
    // Initialize once from the landing URL only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [search, setSearch] = useState(initialQuery.q);
  const [sort, setSort] = useState<SortOption>(initialQuery.sort);
  const [filters, setFilters] = useState<FilterState>(() =>
    filtersFromExploreQuery(initialQuery),
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);

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
      router.replace(qs ? `/explore?${qs}` : "/explore", { scroll: false });
    },
    [router],
  );

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
    router.replace("/explore", { scroll: false });
  }

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

  const filterPanel = (isDrawer = false) => (
    <div
      className={cn(
        isDrawer
          ? "fixed inset-x-0 bottom-0 z-[65] max-h-[84dvh] overflow-auto rounded-t-[22px] border-t border-[var(--line-strong)] bg-[#14141d] px-5 pt-[22px] pb-[30px] shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
          : "sticky top-[calc(var(--header)+20px)] max-h-[calc(100dvh-var(--header)-40px)] self-start overflow-y-auto pr-1.5",
      )}
      role={isDrawer ? "dialog" : undefined}
      aria-modal={isDrawer || undefined}
      aria-label={isDrawer ? "Style filters" : undefined}
    >
      <div className="mb-[18px] flex items-center justify-between">
        <h2 className="m-0 text-lg">Filters</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="cursor-pointer border-0 bg-transparent text-xs text-[#b9abff]"
            onClick={clearFilters}
            data-testid="clear-filters"
          >
            Clear all
          </button>
          {isDrawer ? (
            <button
              type="button"
              className="grid h-[38px] w-[38px] place-items-center rounded-xl border border-[var(--line)]"
              aria-label="Close filters"
              onClick={() => setDrawerOpen(false)}
            >
              ×
            </button>
          ) : null}
        </div>
      </div>
      {(Object.keys(filterGroups) as (keyof typeof filterGroups)[]).map((key) => (
        <section key={key} className="border-t border-[var(--line)] py-[18px]">
          <h3 className="mb-2.5 text-xs text-[#d9d6df]">{groupLabels[key]}</h3>
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
                  className={cn(
                    "inline-flex min-h-[33px] cursor-pointer items-center rounded-[var(--pill)] border border-[var(--line)] bg-[var(--surface)] px-2.5 text-[11px] text-[#c8c6cf]",
                    activeChip &&
                      "border-[rgba(139,108,255,0.55)] bg-[rgba(139,108,255,0.14)] text-[var(--text)]",
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </section>
      ))}
      {isDrawer ? (
        <Button className="mt-2 w-full" onClick={() => setDrawerOpen(false)}>
          Show results
        </Button>
      ) : null}
    </div>
  );

  return (
    <div>
      <section className="container pt-16 pb-9">
        <h1 className="m-0 mb-2.5 text-[clamp(42px,5vw,70px)] leading-none tracking-[-0.055em]">
          Find a style for your photo
        </h1>
        <p className="m-0 text-[17px] text-[var(--muted)]">
          Browse {catalog.length} tested styles for portraits, pets, places, objects, and
          more.
        </p>
        <form
          className="mt-[30px] grid grid-cols-[1fr_auto] gap-2.5"
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
            Filters
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

      <section className="container grid gap-[34px] pt-2.5 pb-[100px] md:grid-cols-[260px_minmax(0,1fr)]">
        <div className="hidden md:block" data-testid="desktop-filters">
          {filterPanel()}
        </div>
        <div>
          <div className="mb-[18px] flex items-center justify-between gap-4">
            <span className="text-[13px] text-[var(--muted)]" data-testid="results-count">
              {results.length} {results.length === 1 ? "style" : "styles"}
            </span>
            <label>
              <span className="sr-only">Sort styles</span>
              <select
                className="min-h-[41px] cursor-pointer rounded-[11px] border border-[var(--line)] bg-[var(--surface)] pr-[34px] pl-3 text-[var(--text)]"
                value={sort}
                onChange={(event) => onSortChange(event.target.value as SortOption)}
                data-testid="sort-select"
              >
                {(["Trending", "Newest", "Most saved"] as SortOption[]).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {results.length ? (
            <>
              <div
                className="grid grid-cols-1 items-start gap-[18px] sm:grid-cols-2 lg:grid-cols-3"
                data-testid="style-results"
              >
                {visible.map((style) => (
                  <StyleCard key={style.id} style={style} stagger />
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
      {drawerOpen ? filterPanel(true) : null}
    </div>
  );
}

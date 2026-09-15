"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MODEL_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export type StylesFilterValues = {
  q?: string;
  category?: string;
  model?: string;
};

type CategoryOption = {
  name: string;
  slug: string;
};

type StylesFilterBarProps = {
  categories: CategoryOption[];
  initial: StylesFilterValues;
  className?: string;
};

function buildStylesHref(pathname: string, values: StylesFilterValues) {
  const params = new URLSearchParams();
  const q = values.q?.trim();
  if (q) params.set("q", q);
  if (values.category) params.set("category", values.category);
  if (values.model) params.set("model", values.model);
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

const controlClass =
  "h-11 w-full rounded-md border border-hairline bg-surface-3 px-3 text-sm text-accent-contrast transition-colors hover:border-hairline-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40";

export function StylesFilterBar({
  categories,
  initial,
  className,
}: StylesFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [q, setQ] = useState(initial.q ?? "");
  const [category, setCategory] = useState(initial.category ?? "");
  const [model, setModel] = useState(initial.model ?? "");

  // Re-sync when the URL changes from outside the bar (back button, reset links).
  const [appliedFilters, setAppliedFilters] = useState(initial);
  if (
    initial.q !== appliedFilters.q ||
    initial.category !== appliedFilters.category ||
    initial.model !== appliedFilters.model
  ) {
    setAppliedFilters(initial);
    setQ(initial.q ?? "");
    setCategory(initial.category ?? "");
    setModel(initial.model ?? "");
  }

  function navigate(next: StylesFilterValues) {
    const href = buildStylesHref(pathname, next);
    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  }

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const trimmed = q.trim();
      const current = (initial.q ?? "").trim();
      if (trimmed === current) return;
      navigate({
        q: trimmed || undefined,
        category: category || undefined,
        model: model || undefined,
      });
    }, 300);
    return () => window.clearTimeout(handle);
    // Debounce search only; category/model navigate immediately on change.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional
  }, [q]);

  const hasFilters = Boolean(q.trim() || category || model);

  return (
    <form
      className={cn(
        "flex flex-col gap-3 border-b border-hairline pb-6 sm:flex-row sm:flex-wrap sm:items-end",
        className,
      )}
      onSubmit={(event) => {
        event.preventDefault();
        navigate({
          q: q.trim() || undefined,
          category: category || undefined,
          model: model || undefined,
        });
      }}
    >
      <label className="flex min-w-[12rem] flex-1 flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
          Search
        </span>
        <input
          type="search"
          name="q"
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Search styles"
          className={cn(controlClass, "placeholder:text-white/35")}
          autoComplete="off"
        />
      </label>

      <label className="flex min-w-[10rem] flex-1 flex-col gap-1.5 sm:max-w-[14rem]">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
          Category
        </span>
        <select
          name="category"
          value={category}
          onChange={(event) => {
            const next = event.target.value;
            setCategory(next);
            navigate({
              q: q.trim() || undefined,
              category: next || undefined,
              model: model || undefined,
            });
          }}
          className={controlClass}
        >
          <option value="" className="bg-surface-3 text-accent-contrast">
            All concepts
          </option>
          {categories.map((item) => (
            <option
              key={item.slug}
              value={item.slug}
              className="bg-surface-3 text-accent-contrast"
            >
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex min-w-[10rem] flex-1 flex-col gap-1.5 sm:max-w-[14rem]">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
          Model
        </span>
        <select
          name="model"
          value={model}
          onChange={(event) => {
            const next = event.target.value;
            setModel(next);
            navigate({
              q: q.trim() || undefined,
              category: category || undefined,
              model: next || undefined,
            });
          }}
          className={controlClass}
        >
          <option value="" className="bg-surface-3 text-accent-contrast">
            All models
          </option>
          {Object.entries(MODEL_LABELS).map(([slug, label]) => (
            <option
              key={slug}
              value={slug}
              className="bg-surface-3 text-accent-contrast"
            >
              {label}
            </option>
          ))}
        </select>
      </label>

      {hasFilters ? (
        <button
          type="button"
          className="h-11 shrink-0 rounded-md px-4 text-sm font-medium text-accent-soft transition-colors hover:text-white sm:mb-0"
          onClick={() => {
            setQ("");
            setCategory("");
            setModel("");
            startTransition(() => {
              router.push(pathname);
            });
          }}
        >
          Reset filters
        </button>
      ) : null}
    </form>
  );
}

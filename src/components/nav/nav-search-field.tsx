"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type RefObject,
} from "react";
import type { SearchSuggestion } from "@/lib/catalog/search-suggestions";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmitSearch: (query: string) => void;
  onNavigate: () => void;
  inputRef?: RefObject<HTMLInputElement | null>;
  inputId: string;
  placeholder?: string;
  inputClassName?: string;
  listClassName?: string;
  autoFocus?: boolean;
};

function suggestionLabel(item: SearchSuggestion): string {
  if (item.kind === "style") return item.title;
  if (item.kind === "search") return `Search “${item.value}”`;
  return item.value;
}

function suggestionMeta(item: SearchSuggestion): string {
  if (item.kind === "style") return `${item.category} · ${item.subject}`;
  if (item.kind === "category") return "Category";
  if (item.kind === "subject") return "Photo subject";
  return "Explore search";
}

export function NavSearchField({
  value,
  onChange,
  onSubmitSearch,
  onNavigate,
  inputRef,
  inputId,
  placeholder = "Search cinematic, anime, watercolor...",
  inputClassName,
  listClassName,
  autoFocus = false,
}: Props) {
  const router = useRouter();
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<number | null>(null);

  const fetchSuggestions = useCallback(async (query: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/search/suggest?q=${encodeURIComponent(query)}`,
        { signal: controller.signal },
      );
      if (!res.ok) throw new Error("suggest failed");
      const data = (await res.json()) as { suggestions?: SearchSuggestion[] };
      setSuggestions(data.suggestions ?? []);
      setActiveIndex(-1);
      setOpen(true);
    } catch (error) {
      if ((error as Error).name === "AbortError") return;
      setSuggestions([]);
    } finally {
      if (abortRef.current === controller) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open && value === "") return;
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      void fetchSuggestions(value);
    }, 120);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [value, fetchSuggestions, open]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, []);

  function goToSuggestion(item: SearchSuggestion) {
    setOpen(false);
    setActiveIndex(-1);
    onNavigate();
    if (item.kind === "search") {
      onChange(item.value);
      onSubmitSearch(item.value);
      return;
    }
    router.push(item.href);
  }

  function commitSearch(event: FormEvent) {
    event.preventDefault();
    const active = activeIndex >= 0 ? suggestions[activeIndex] : null;
    if (active) {
      goToSuggestion(active);
      return;
    }
    setOpen(false);
    onSubmitSearch(value.trim());
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) {
      if (event.key === "Escape") setOpen(false);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) =>
        current < suggestions.length - 1 ? current + 1 : 0,
      );
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) =>
        current <= 0 ? suggestions.length - 1 : current - 1,
      );
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  const showList = open && (suggestions.length > 0 || loading);

  return (
    <div className="relative">
      <form onSubmit={commitSearch}>
        <label className="sr-only" htmlFor={inputId}>
          Search styles
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined
          }
          autoComplete="off"
          autoFocus={autoFocus}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            void fetchSuggestions(value);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={inputClassName}
        />
      </form>

      {showList ? (
        <ul
          id={listId}
          role="listbox"
          className={cn(
            "nav-panel-in absolute top-[calc(100%+8px)] right-0 left-0 z-50 m-0 max-h-[min(360px,50dvh)] list-none overflow-y-auto rounded-[16px] border border-[rgba(255,255,255,0.10)] bg-[#15151E] p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.38)] scroll-panel",
            listClassName,
          )}
        >
          {loading && suggestions.length === 0 ? (
            <li className="px-3 py-2.5 text-xs text-[#A6A4B2]">Searching…</li>
          ) : null}
          {suggestions.map((item, index) => {
            const active = index === activeIndex;
            const content = (
              <>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-[#F5F3EE]">
                    {suggestionLabel(item)}
                  </span>
                  <span className="mt-0.5 block truncate text-[11px] text-[#A6A4B2]">
                    {suggestionMeta(item)}
                  </span>
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-[0.04em] uppercase",
                    item.kind === "style" &&
                      "bg-[rgba(139,108,255,0.16)] text-[#c5b9ff]",
                    item.kind === "category" &&
                      "bg-[rgba(255,155,130,0.12)] text-[#ffc2b3]",
                    item.kind === "subject" &&
                      "bg-[rgba(103,216,178,0.12)] text-[#9be4cb]",
                    item.kind === "search" &&
                      "bg-[rgba(255,255,255,0.06)] text-[#A6A4B2]",
                  )}
                >
                  {item.kind === "style"
                    ? "Style"
                    : item.kind === "category"
                      ? "Category"
                      : item.kind === "subject"
                        ? "Subject"
                        : "Search"}
                </span>
              </>
            );

            const rowClass = cn(
              "flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left",
              active && "bg-[#2A1A31]",
              !active && "hover:bg-[#2A1A31]",
            );

            if (item.kind === "search") {
              return (
                <li
                  key={`search-${item.value}`}
                  role="option"
                  aria-selected={active}
                  id={`${listId}-option-${index}`}
                >
                  <button
                    type="button"
                    className={cn(rowClass, "cursor-pointer border-0 bg-transparent")}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => goToSuggestion(item)}
                  >
                    {content}
                  </button>
                </li>
              );
            }

            return (
              <li
                key={`${item.kind}-${item.kind === "style" ? item.id : item.value}`}
                role="option"
                aria-selected={active}
                id={`${listId}-option-${index}`}
              >
                <Link
                  href={item.href}
                  className={rowClass}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    setOpen(false);
                    onNavigate();
                  }}
                >
                  {content}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

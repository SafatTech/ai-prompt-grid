"use client";

import { useEffect, useRef, useState } from "react";
import type { GuideTocItem } from "@/lib/guides/prepare";

export function GuideTocMobile({ items }: { items: readonly GuideTocItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mb-8 lg:hidden">
      <details className="rounded-xl border border-[var(--line)] bg-[var(--surface)]">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-[var(--text)]">
          On this page
        </summary>
        <nav aria-label="On this page" className="max-h-[min(60dvh,28rem)] overflow-y-auto overscroll-contain">
          <TocList items={items} />
        </nav>
      </details>
    </div>
  );
}

export function GuideTocDesktop({ items }: { items: readonly GuideTocItem[] }) {
  if (items.length === 0) return null;

  return (
    <aside className="hidden lg:block">
      <div
        className="sticky top-[calc(var(--header)+16px)] flex max-h-[calc(100dvh-var(--header)-32px)] flex-col gap-4 overflow-hidden rounded-3xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] p-6 backdrop-blur"
      >
        <p className="m-0 shrink-0 text-xs font-semibold tracking-wider text-[var(--muted)] uppercase">
          On this page
        </p>
        <nav
          aria-label="On this page"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1"
        >
          <TocList items={items} />
        </nav>
      </div>
    </aside>
  );
}

function TocList({ items }: { items: readonly GuideTocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    if (items.length === 0 || typeof IntersectionObserver === "undefined") return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (headings.length === 0) return;

    const visible = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry);
          else visible.delete(entry.target.id);
        }

        let next: string | null = null;
        let bestTop = Number.POSITIVE_INFINITY;
        for (const [id, entry] of visible) {
          const top = entry.boundingClientRect.top;
          if (top < bestTop) {
            bestTop = top;
            next = id;
          }
        }
        if (!next) {
          // Prefer the last heading above the midpoint when none intersect.
          const midpoint = window.innerHeight * 0.35;
          let bestAbove = Number.NEGATIVE_INFINITY;
          for (const heading of headings) {
            const top = heading.getBoundingClientRect().top;
            if (top <= midpoint && top > bestAbove) {
              bestAbove = top;
              next = heading.id;
            }
          }
        }
        if (next) setActiveId(next);
      },
      {
        root: null,
        // Keep the "active" band near the upper third of the viewport.
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0, 0.25, 1],
      },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (!activeId) return;
    const link = linkRefs.current[activeId];
    if (!link) return;
    const nav = link.closest("nav");
    if (!nav) return;
    const linkRect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
      link.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeId]);

  return (
    <ol className="m-0 list-none space-y-1 p-0 pb-2 text-sm lg:pb-0">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <li key={item.id}>
            <a
              ref={(node) => {
                linkRefs.current[item.id] = node;
              }}
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              className={[
                "block rounded-lg px-3 py-2 transition-colors hover:bg-white/5 hover:text-[var(--text)]",
                item.level === 3 ? "pl-5 text-[13px]" : "",
                isActive
                  ? "bg-white/10 font-medium text-[var(--text)]"
                  : "text-[var(--muted)]",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

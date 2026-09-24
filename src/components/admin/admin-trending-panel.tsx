"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { AdminStyleRow } from "@/lib/admin/access";
import { MAX_TRENDING } from "@/lib/admin/trending";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

type Props = {
  styles: AdminStyleRow[];
  onStylesChange: (styles: AdminStyleRow[]) => void;
};

export function AdminTrendingPanel({ styles, onStylesChange }: Props) {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const [pickId, setPickId] = useState("");

  const trending = useMemo(
    () =>
      styles
        .filter((s) => s.status === "published" && s.trendingRank != null)
        .sort((a, b) => (a.trendingRank ?? 0) - (b.trendingRank ?? 0)),
    [styles],
  );

  const candidates = useMemo(
    () =>
      styles
        .filter((s) => s.status === "published" && s.trendingRank == null)
        .sort((a, b) => a.title.localeCompare(b.title)),
    [styles],
  );

  async function persist(nextIds: string[]) {
    setBusy(true);
    const response = await fetch("/api/admin/trending", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ styleIds: nextIds }),
    });
    const payload = (await response.json().catch(() => ({}))) as {
      styles?: Array<{ id: string; trendingRank: number }>;
      error?: string;
    };
    setBusy(false);

    if (!response.ok) {
      toast(payload.error ?? "Could not update trending styles.", "error");
      return false;
    }

    const rankById = new Map(
      (payload.styles ?? []).map((s) => [s.id, s.trendingRank] as const),
    );
    onStylesChange(
      styles.map((row) => ({
        ...row,
        trendingRank: rankById.get(row.id) ?? null,
      })),
    );
    toast("Homepage trending updated.");
    return true;
  }

  async function addStyle() {
    if (!pickId) return;
    if (trending.length >= MAX_TRENDING) {
      toast(`At most ${MAX_TRENDING} trending styles.`, "error");
      return;
    }
    const nextIds = [...trending.map((s) => s.id), pickId];
    const ok = await persist(nextIds);
    if (ok) setPickId("");
  }

  async function removeStyle(id: string) {
    await persist(trending.filter((s) => s.id !== id).map((s) => s.id));
  }

  async function move(id: string, delta: -1 | 1) {
    const ids = trending.map((s) => s.id);
    const index = ids.indexOf(id);
    const target = index + delta;
    if (index < 0 || target < 0 || target >= ids.length) return;
    const next = [...ids];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item!);
    await persist(next);
  }

  return (
    <section
      className="container mb-8 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5"
      data-testid="admin-trending-panel"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="m-0 mb-1 text-[20px] tracking-[-0.02em]">
            Homepage trending
          </h2>
          <p className="m-0 max-w-[52ch] text-[13px] text-[var(--muted)]">
            Choose up to {MAX_TRENDING} published styles for “Trending
            transformations” on the home page. Order here is the order guests see.
          </p>
        </div>
        <p className="m-0 text-[12px] font-bold tracking-[0.06em] text-[var(--muted)] uppercase">
          {trending.length} / {MAX_TRENDING}
        </p>
      </div>

      {trending.length === 0 ? (
        <p className="mb-4 text-sm text-[var(--muted)]">
          No curated styles yet. Guests currently see the first {MAX_TRENDING}{" "}
          published styles as a fallback.
        </p>
      ) : (
        <ol className="mb-4 m-0 grid list-none gap-2 p-0">
          {trending.map((style, index) => (
            <li
              key={style.id}
              className="flex flex-wrap items-center gap-2 rounded-[12px] border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5"
            >
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgba(139,108,255,0.16)] text-[12px] font-bold text-[#c5b9ff]">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate font-bold text-[var(--text)]">
                  {style.title}
                </div>
                <div className="truncate text-[12px] text-[var(--muted)]">
                  {style.category} · {style.tool} · {style.slug}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  disabled={busy || index === 0}
                  className={cn(
                    "cursor-pointer rounded-lg border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1.5 text-[12px] font-bold text-[var(--muted)] disabled:opacity-40",
                  )}
                  aria-label={`Move ${style.title} up`}
                  onClick={() => void move(style.id, -1)}
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={busy || index === trending.length - 1}
                  className="cursor-pointer rounded-lg border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1.5 text-[12px] font-bold text-[var(--muted)] disabled:opacity-40"
                  aria-label={`Move ${style.title} down`}
                  onClick={() => void move(style.id, 1)}
                >
                  ↓
                </button>
                <Button
                  variant="ghost"
                  disabled={busy}
                  onClick={() => void removeStyle(style.id)}
                >
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ol>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={pickId}
          disabled={busy || trending.length >= MAX_TRENDING || candidates.length === 0}
          onChange={(e) => setPickId(e.target.value)}
          className="min-h-11 min-w-[220px] flex-1 rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] px-3 text-sm text-[var(--text)] disabled:opacity-50"
          data-testid="admin-trending-pick"
        >
          <option value="">
            {candidates.length === 0
              ? "No more published styles"
              : "Add a published style…"}
          </option>
          {candidates.map((style) => (
            <option key={style.id} value={style.id}>
              {style.title}
            </option>
          ))}
        </select>
        <Button
          type="button"
          disabled={busy || !pickId || trending.length >= MAX_TRENDING}
          data-testid="admin-trending-add"
          onClick={() => void addStyle()}
        >
          {busy ? "Saving…" : "Add to trending"}
        </Button>
      </div>
    </section>
  );
}

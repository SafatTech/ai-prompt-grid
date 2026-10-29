"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { CompareSlider } from "@/components/compare-slider";
import { MergeBeforeAfter } from "@/components/merge-before-after";
import { useLibrary } from "@/components/providers/library-provider";
import { useToast } from "@/components/providers/toast-provider";
import { useUiModals } from "@/components/providers/ui-modal-provider";
import type { StyleCardData } from "@/lib/catalog/style-card-data";
import { cn } from "@/lib/utils";

type Props = {
  style: StyleCardData;
  compact?: boolean;
  /** Explore / library cards. Homepage rails use `StyleCardRail` (server). */
  variant?: "default";
  /** First above-the-fold card: eager + high fetchPriority (LCP). */
  priority?: boolean;
  /** Eager load without high fetchPriority (explore cards 2–4). */
  eager?: boolean;
};

function useSaveHandlers(styleId: string) {
  const { signedIn, isSaved, toggleSave, setPendingAction } = useLibrary();
  const { toast } = useToast();
  const { openSignIn } = useUiModals();
  const saved = isSaved(styleId);

  function handleSave(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!signedIn) {
      setPendingAction({ type: "save-style", styleId });
      openSignIn();
      return;
    }
    const nowSaved = !saved;
    toggleSave(styleId);
    toast(
      nowSaved ? "Style saved to your library." : "Style removed from your library.",
    );
  }

  return { saved, handleSave };
}

/**
 * Explore / library card (client — CompareSlider).
 * Prefer `StyleCardRail` from Server Components on the homepage so only
 * save/copy/media islands hydrate.
 */
export function StyleCard({
  style,
  compact = false,
  priority = false,
  eager = false,
}: Props) {
  const { saved, handleSave } = useSaveHandlers(style.id);
  const height = compact ? Math.min(style.height, 320) : style.height;
  const mergePhotos = style.mergePhotos;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] transition-[transform,border-color] duration-280 hover:-translate-y-1 hover:border-[rgba(255,255,255,0.2)]",
        "style-card-explore",
      )}
    >
      {/* Compare lives outside the link so dragging the handle isn't a browser link-drag. */}
      <div className="relative overflow-hidden bg-[#242331]" style={{ height }}>
        {mergePhotos.length >= 2 && style.mergeResult ? (
          <MergeBeforeAfter
            variant="card"
            title={style.title}
            inputs={mergePhotos}
            result={style.mergeResult}
            priority={priority}
            eager={eager}
          />
        ) : (
          <CompareSlider
            source={style.source}
            result={style.result}
            title={style.title}
            styleId={style.id}
            sourceFocus={
              style.sourceFocusX != null && style.sourceFocusY != null
                ? { x: style.sourceFocusX, y: style.sourceFocusY }
                : null
            }
            resultFocus={
              style.resultFocusX != null && style.resultFocusY != null
                ? { x: style.resultFocusX, y: style.resultFocusY }
                : null
            }
            priority={priority}
            eager={eager}
          />
        )}
        <button
          type="button"
          className={cn(
            "absolute top-3 right-3 z-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-[11px] border border-[rgba(255,255,255,0.22)] bg-[rgba(11,11,16,0.75)] text-lg text-[var(--text)] backdrop-blur-sm",
            saved && "bg-[rgba(255,155,130,0.12)] text-[var(--peach)]",
          )}
          aria-label={saved ? `Unsave ${style.title}` : `Save ${style.title}`}
          data-testid={`save-style-${style.id}`}
          onClick={handleSave}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>
      <Link
        href={`/styles/${style.id}`}
        className="style-card-explore-body block min-h-[170px] p-[17px]"
        data-testid={`style-card-${style.id}`}
        aria-label={`Open ${style.title}`}
      >
        <div className="mb-3 flex flex-wrap gap-1.5">
          <span className="inline-flex min-h-[25px] items-center rounded-[7px] border border-[rgba(139,108,255,0.2)] bg-[rgba(139,108,255,0.12)] px-2 text-[10px] font-bold text-[#c7bcff]">
            {style.category}
          </span>
          <span className="inline-flex min-h-[25px] items-center rounded-[7px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.06)] px-2 text-[10px] font-bold text-[#c7c5cf]">
            {style.subject}
          </span>
          <span className="inline-flex min-h-[25px] items-center rounded-[7px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.06)] px-2 text-[10px] font-bold text-[#c7c5cf]">
            {style.tool}
          </span>
        </div>
        <h2 className="m-0 mb-2 line-clamp-2 text-[19px] tracking-[-0.02em]">
          {style.title}
        </h2>
        <p className="m-0 line-clamp-2 text-xs text-[var(--muted)]">{style.note}</p>
        {mergePhotos.length >= 2 ? (
          <p className="mt-2 mb-0 text-xs font-semibold text-[var(--muted)]">
            Merge · {mergePhotos.length} photos
          </p>
        ) : null}
      </Link>
    </article>
  );
}

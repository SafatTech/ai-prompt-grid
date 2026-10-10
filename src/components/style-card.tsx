"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { CompareSlider } from "@/components/compare-slider";
import { MergeBeforeAfter } from "@/components/merge-before-after";
import { mergeInputPhotos, usesMergeStack } from "@/lib/catalog/merge-inputs";
import { useLibrary } from "@/components/providers/library-provider";
import { useToast } from "@/components/providers/toast-provider";
import { useUiModals } from "@/components/providers/ui-modal-provider";
import type { CatalogStyle } from "@/lib/catalog/styles";
import { cn } from "@/lib/utils";

type Props = {
  style: CatalogStyle;
  compact?: boolean;
};

export function StyleCard({ style, compact = false }: Props) {
  const { signedIn, isSaved, toggleSave, setPendingAction } = useLibrary();
  const { toast } = useToast();
  const { openSignIn } = useUiModals();
  const saved = isSaved(style.id);
  const height = compact ? Math.min(style.height, 320) : style.height;
  const mergePhotos = usesMergeStack(style) ? mergeInputPhotos(style) : [];

  function handleSave(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!signedIn) {
      setPendingAction({ type: "save-style", styleId: style.id });
      openSignIn();
      return;
    }
    const nowSaved = !saved;
    toggleSave(style.id);
    toast(
      nowSaved ? "Style saved to your library." : "Style removed from your library.",
    );
  }

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] transition-[transform,border-color] duration-280 hover:-translate-y-1 hover:border-[rgba(255,255,255,0.2)]",
      )}
    >
      {/* Compare lives outside the link so dragging the handle isn't a browser link-drag. */}
      <div className="relative overflow-hidden bg-[#242331]" style={{ height }}>
        {mergePhotos.length >= 2 ? (
          <MergeBeforeAfter
            variant="card"
            title={style.title}
            inputs={mergePhotos}
            result={{
              src: style.result,
              alt: style.examplePairs[0]?.altResult ?? "",
            }}
          />
        ) : (
          <CompareSlider
            source={style.source}
            result={style.result}
            title={style.title}
            styleId={style.id}
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
        className="block p-[17px]"
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
        <h3 className="m-0 mb-2 text-[19px] tracking-[-0.02em]">{style.title}</h3>
        <p className="m-0 text-xs text-[var(--muted)]">{style.note}</p>
        {mergePhotos.length >= 2 ? (
          <p className="mt-2 mb-0 text-xs font-semibold text-[var(--muted)]">
            Merge · {mergePhotos.length} photos
          </p>
        ) : null}
      </Link>
    </article>
  );
}

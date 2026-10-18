"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { CompareSlider } from "@/components/compare-slider";
import { CopyPromptButton } from "@/components/home/copy-prompt-button";
import { MergeBeforeAfter } from "@/components/merge-before-after";
import { useLibrary } from "@/components/providers/library-provider";
import { useToast } from "@/components/providers/toast-provider";
import { useUiModals } from "@/components/providers/ui-modal-provider";
import type { StyleCardData } from "@/lib/catalog/style-card-data";
import { cn } from "@/lib/utils";

type Props = {
  style: StyleCardData;
  compact?: boolean;
  /** Homepage rails / masonry — 4:5 media, copy button, hover preview. */
  variant?: "default" | "rail" | "masonry";
  /** First above-the-fold card: eager LCP image. */
  priority?: boolean;
};

export function StyleCard({
  style,
  compact = false,
  variant = "default",
  priority = false,
}: Props) {
  const { signedIn, isSaved, toggleSave, setPendingAction } = useLibrary();
  const { toast } = useToast();
  const { openSignIn } = useUiModals();
  const saved = isSaved(style.id);
  const height = compact ? Math.min(style.height, 320) : style.height;
  const mergePhotos = style.mergePhotos;
  const isRail = variant === "rail" || variant === "masonry";
  const promptPreview = style.promptPreview;
  const mediaWidth = style.mediaWidth;
  const mediaHeight = style.mediaHeight;

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

  if (isRail) {
    const sizes =
      variant === "masonry"
        ? "(max-width:700px) 50vw, 240px"
        : "(max-width:700px) 62vw, 250px";

    return (
      <article
        className={cn(
          "style-card-rail group relative overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)]",
          variant === "masonry" && "style-card-masonry",
        )}
        data-testid={`style-card-${style.id}`}
      >
        <div
          className="style-card-rail-media relative overflow-hidden bg-[var(--surface-2)]"
          style={
            variant === "masonry"
              ? { aspectRatio: `${mediaWidth} / ${mediaHeight}` }
              : { aspectRatio: "4 / 5" }
          }
        >
          {mergePhotos.length >= 2 && style.mergeResult ? (
            <Link
              href={`/styles/${style.id}`}
              className="absolute inset-0 block"
              aria-label={`Open ${style.title}`}
            >
              <MergeBeforeAfter
                variant="card"
                title={style.title}
                inputs={mergePhotos}
                result={style.mergeResult}
                sizes={sizes}
                priority={priority}
              />
              {promptPreview ? (
                <div className="style-card-hover-preview" aria-hidden="true">
                  <p>{promptPreview}</p>
                  <span>Before → After</span>
                </div>
              ) : null}
            </Link>
          ) : (
            <Link
              href={`/styles/${style.id}`}
              className="absolute inset-0 block"
              aria-label={`Open ${style.title}`}
            >
              <Image
                src={style.result}
                alt={`${style.title} AI photo result`}
                fill
                sizes={sizes}
                className="object-cover"
                priority={priority}
                loading={priority ? undefined : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                placeholder={style.resultBlur ? "blur" : "empty"}
                blurDataURL={style.resultBlur}
              />
              {promptPreview ? (
                <div className="style-card-hover-preview" aria-hidden="true">
                  <p>{promptPreview}</p>
                  <span>Before → After</span>
                </div>
              ) : null}
            </Link>
          )}
          <button
            type="button"
            className={cn(
              "style-card-heart absolute top-2.5 right-2.5 z-4 flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[11px] border border-[rgba(255,255,255,0.22)] bg-[rgba(11,11,16,0.72)] text-base text-[var(--text)] backdrop-blur-sm",
              saved && "bg-[rgba(255,155,130,0.12)] text-[var(--peach)]",
            )}
            aria-label={saved ? `Unsave ${style.title}` : `Save ${style.title}`}
            data-testid={`save-style-${style.id}`}
            onClick={handleSave}
          >
            {saved ? "♥" : "♡"}
          </button>
        </div>
        <div className="style-card-rail-body px-3.5 pt-3 pb-3.5">
          <h3 className="m-0 text-[15px] font-semibold leading-snug tracking-[-0.01em]">
            <Link
              href={`/styles/${style.id}`}
              className="style-card-title-link"
            >
              {style.title}
            </Link>
          </h3>
          <div className="style-card-rail-row mt-2 flex items-center justify-between gap-2">
            <span className="min-w-0 truncate text-xs text-[var(--muted)]">
              {mergePhotos.length >= 2
                ? `Merge · ${mergePhotos.length} photos`
                : style.category}
            </span>
            <CopyPromptButton style={style} />
          </div>
        </div>
      </article>
    );
  }

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
          />
        ) : (
          <CompareSlider
            source={style.source}
            result={style.result}
            title={style.title}
            styleId={style.id}
            priority={priority}
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

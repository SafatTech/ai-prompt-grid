"use client";

import Link from "next/link";
import { CopyPromptButton } from "@/components/home/copy-prompt-button";
import { StyleCardMasonryMedia } from "@/components/style-card-masonry-media";
import { StyleCardSaveButton } from "@/components/style-card-save-button";
import type { StyleCardData } from "@/lib/catalog/style-card-data";
import { cn } from "@/lib/utils";

type Props = {
  style: StyleCardData;
  variant?: "rail" | "masonry";
  priority?: boolean;
  eager?: boolean;
};

/**
 * Client rail card for ExploreLoadMore only.
 * Do not import `@/components/style-card-rail` from Client Components — that
 * client-ifies every homepage card and bloats the RSC payload (#50 regression).
 */
export function StyleCardRailClient({
  style,
  variant = "rail",
  priority = false,
  eager = false,
}: Props) {
  const mergePhotos = style.mergePhotos;
  const promptPreview = style.promptPreview;
  const sizes =
    variant === "masonry"
      ? "(max-width:699px) 48vw, 236px"
      : "(max-width:699px) 50vw, (max-width:767px) 55vw, 250px";
  const layoutAware = variant === "masonry" && !priority && !eager;

  return (
    <article
      className={cn(
        "style-card-rail group relative rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)]",
        variant === "masonry" && "style-card-masonry",
      )}
      data-testid={`style-card-${style.id}`}
    >
      <div className="relative">
        <StyleCardMasonryMedia
          styleId={style.id}
          title={style.title}
          result={style.result}
          mediaWidth={style.mediaWidth}
          mediaHeight={style.mediaHeight}
          sizes={sizes}
          priority={priority}
          eager={eager}
          layoutAware={layoutAware}
          naturalAspect={variant === "masonry"}
          {...(style.resultBlur ? { resultBlur: style.resultBlur } : {})}
          {...(mergePhotos.length ? { mergePhotos } : {})}
          {...(style.mergeResult ? { mergeResult: style.mergeResult } : {})}
        />
        {promptPreview ? (
          <div className="style-card-hover-preview pointer-events-none" aria-hidden="true">
            <p>{promptPreview}</p>
            <span>Before → After</span>
          </div>
        ) : null}
      </div>
      <StyleCardSaveButton styleId={style.id} />
      <div className="style-card-rail-body px-3.5 pt-3 pb-3.5">
        <h3 className="m-0 text-[15px] font-semibold leading-snug tracking-[-0.01em]">
          <Link href={`/styles/${style.id}`} className="style-card-title-link">
            <span className="style-card-title-text">{style.title}</span>
          </Link>
        </h3>
        <div className="style-card-rail-row mt-2 flex items-center justify-between gap-2">
          <span className="min-w-0 truncate text-xs text-[var(--muted)]">
            {mergePhotos.length >= 2
              ? `Merge · ${mergePhotos.length} photos`
              : style.category}
          </span>
          <CopyPromptButton styleId={style.id} />
        </div>
      </div>
    </article>
  );
}

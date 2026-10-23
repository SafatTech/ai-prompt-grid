import Link from "next/link";
import { CopyPromptButton } from "@/components/home/copy-prompt-button";
import { StyleCardMasonryMedia } from "@/components/style-card-masonry-media";
import { StyleCardSaveButton } from "@/components/style-card-save-button";
import type { StyleCardData } from "@/lib/catalog/style-card-data";
import { cn } from "@/lib/utils";

type Props = {
  style: StyleCardData;
  /** Homepage rails / masonry — one DOM tree; CSS columns handle breakpoints. */
  variant?: "rail" | "masonry";
  /** First above-the-fold card: eager + high fetchPriority (LCP). */
  priority?: boolean;
  /** Eager load without high fetchPriority (e.g. first masonry row). */
  eager?: boolean;
};

/**
 * Homepage rail/masonry card — Server Component shell.
 * Only save + copy (+ masonry media IO) hydrate as client islands.
 * Do not duplicate mobile/desktop markup; `.home-masonry` columns adapt via CSS.
 */
export function StyleCardRail({
  style,
  variant = "rail",
  priority = false,
  eager = false,
}: Props) {
  const mergePhotos = style.mergePhotos;
  const promptPreview = style.promptPreview;
  // Match CSS: masonry columns 2 @ ≤699 (~50vw) / 236px; rails ~50vw @390 → ≤384w @2×.
  const sizes =
    variant === "masonry"
      ? "(max-width:699px) 48vw, 236px"
      : "(max-width:699px) 50vw, (max-width:767px) 55vw, 250px";
  const layoutAware = variant === "masonry" && !priority && !eager;

  const hoverPreview = promptPreview ? (
    <div className="style-card-hover-preview" aria-hidden="true">
      <p>{promptPreview}</p>
      <span>Before → After</span>
    </div>
  ) : null;

  return (
    <article
      className={cn(
        /* No overflow:hidden on the article — it clips the heart ::after hit area to ~42px (N-20). Media keeps its own clip. */
        "style-card-rail group relative rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)]",
        variant === "masonry" && "style-card-masonry",
      )}
      data-testid={`style-card-${style.id}`}
    >
      <StyleCardMasonryMedia
        style={style}
        sizes={sizes}
        priority={priority}
        eager={eager}
        layoutAware={layoutAware}
        naturalAspect={variant === "masonry"}
        hoverPreview={hoverPreview}
      />
      {/* Heart sits outside overflow:hidden media so the ≥44px hit area is not clipped (N-20). */}
      <StyleCardSaveButton styleId={style.id} title={style.title} />
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
          <CopyPromptButton style={{ id: style.id, title: style.title }} />
        </div>
      </div>
    </article>
  );
}

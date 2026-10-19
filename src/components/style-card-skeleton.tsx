import { SHARED_STYLE_BLUR } from "@/lib/catalog/style-card-data";
import { cn } from "@/lib/utils";

/**
 * Varied masonry ratios biased toward real catalog portraits (default 4:5).
 * Avoid short 1:1 slots that under-reserve height at 390 (N-19).
 */
const MASONRY_RATIOS = ["4 / 5", "3 / 4", "5 / 6", "4 / 5", "2 / 3", "3 / 4"] as const;

type Props = {
  /** Homepage masonry vs /explore compact grid. */
  variant?: "masonry" | "compact";
  /** Used to vary masonry aspect ratios across a batch. */
  index?: number;
  className?: string;
  /** Tiny blur / dominant-color placeholder so pending cards never look empty. */
  blurDataURL?: string;
};

/**
 * Calm size-matched placeholders for load-more (no shimmer).
 * Shown as soon as a fetch starts so layout space is reserved.
 * Compact variant matches StyleCard explore body (~505 px) to avoid N-8 CLS.
 * Media uses the shared blur data-URI (or a caller-supplied blur) instead of a
 * flat empty surface so mobile galleries never flash blank cards.
 */
export function StyleCardSkeleton({
  variant = "compact",
  index = 0,
  className,
  blurDataURL = SHARED_STYLE_BLUR,
}: Props) {
  const mediaStyle = {
    backgroundColor: "var(--surface-2)",
    backgroundImage: `url(${blurDataURL})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  } as const;

  if (variant === "masonry") {
    return (
      <article
        className={cn(
          "style-card-rail style-card-masonry overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)]",
          className,
        )}
        aria-hidden
        data-testid="style-card-skeleton"
      >
        <div
          className="style-card-rail-media"
          style={{
            aspectRatio: MASONRY_RATIOS[index % MASONRY_RATIOS.length],
            ...mediaStyle,
          }}
        />
        <div className="style-card-rail-body px-3.5 pt-3 pb-3.5">
          <div className="h-4 w-[78%] rounded bg-[var(--surface-2)]" />
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <div className="h-3 w-[38%] rounded bg-[var(--surface-2)]" />
            <div className="h-8 w-[4.5rem] rounded-[10px] bg-[var(--surface-2)]" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "style-card-explore overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)]",
        className,
      )}
      aria-hidden
      data-testid="style-card-skeleton"
    >
      <div style={{ height: 280, ...mediaStyle }} />
      <div className="style-card-explore-body min-h-[170px] p-[17px]">
        <div className="mb-3 flex flex-wrap gap-1.5">
          <div className="h-[25px] w-16 rounded-[7px] bg-[var(--surface-2)]" />
          <div className="h-[25px] w-14 rounded-[7px] bg-[var(--surface-2)]" />
          <div className="h-[25px] w-12 rounded-[7px] bg-[var(--surface-2)]" />
          <div className="h-[25px] w-14 rounded-[7px] bg-[var(--surface-2)]" />
        </div>
        <div className="mb-2 space-y-1.5">
          <div className="h-5 w-[92%] rounded bg-[var(--surface-2)]" />
          <div className="h-5 w-[68%] rounded bg-[var(--surface-2)]" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded bg-[var(--surface-2)]" />
          <div className="h-3 w-[74%] rounded bg-[var(--surface-2)]" />
        </div>
      </div>
    </article>
  );
}

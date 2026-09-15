import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { modelLabel } from "@/lib/constants";
import type { StyleCardData } from "@/lib/data/catalog";
import { cn } from "@/lib/utils";

type StyleCardProps = {
  style: StyleCardData;
  className?: string;
  index?: number;
  /** Eager-load cards that render above the fold. */
  priority?: boolean;
  /** Larger editorial tile with description. */
  feature?: boolean;
};

export function StyleCard({
  style,
  className,
  index = 0,
  priority = false,
  feature = false,
}: StyleCardProps) {
  return (
    <Link
      href={`/styles/${style.slug}`}
      className={cn("group style-card-enter block h-full", className)}
      style={{ "--card-index": index } as CSSProperties}
    >
      <article
        className={cn(
          "relative h-full overflow-hidden rounded-xl border border-hairline bg-surface-2 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.75)] transition-all duration-500 ease-out",
          "group-hover:-translate-y-1.5 group-hover:border-hairline-strong group-hover:shadow-[0_34px_70px_-32px_rgba(12,107,107,0.55)]",
        )}
      >
        <div
          className={cn(
            "card-sheen relative overflow-hidden",
            feature ? "aspect-[4/5] h-full min-h-full sm:aspect-auto sm:absolute sm:inset-0" : "aspect-[4/5]",
          )}
        >
          {style.thumbnail_url ? (
            <Image
              src={style.thumbnail_url}
              alt={style.thumbnail_alt}
              fill
              priority={priority}
              sizes={
                feature
                  ? "(max-width: 640px) 100vw, 50vw"
                  : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              }
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-surface-2 to-surface-1" />
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-surface-1 via-surface-1/60 to-transparent" />

          <div className="pointer-events-none absolute -inset-x-6 -bottom-10 h-32 bg-accent/35 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

          <div
            className={cn(
              "absolute inset-x-0 bottom-0",
              feature ? "p-5 sm:p-7" : "p-4",
            )}
          >
            <h3
              className={cn(
                "font-display leading-tight tracking-tight text-accent-contrast transition-colors duration-300 group-hover:text-white",
                feature ? "text-2xl sm:text-3xl" : "text-lg",
              )}
            >
              {style.title}
            </h3>

            {feature && style.short_description ? (
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60 sm:text-base">
                {style.short_description}
              </p>
            ) : null}

            {style.model_slugs.length > 0 ? (
              <ul className={cn("flex flex-wrap gap-1.5", feature ? "mt-4" : "mt-2.5")}>
                {style.model_slugs.map((model) => (
                  <li
                    key={model}
                    className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white/75 backdrop-blur-sm transition-colors duration-300 group-hover:border-accent-soft/35 group-hover:text-white"
                  >
                    {modelLabel(model)}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </article>
    </Link>
  );
}

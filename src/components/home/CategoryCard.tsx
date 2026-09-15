import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CATEGORY_COVERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type CategoryCardProps = {
  name: string;
  slug: string;
  index: number;
  className?: string;
  /** Wider aspect for the lead tile. */
  featured?: boolean;
};

export function CategoryCard({
  name,
  slug,
  index,
  className,
  featured = false,
}: CategoryCardProps) {
  const cover = CATEGORY_COVERS[slug];

  return (
    <Link
      href={`/categories/${slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-xl border border-hairline bg-surface-3 transition-all duration-500",
        "hover:-translate-y-1 hover:border-hairline-strong hover:shadow-[0_34px_70px_-32px_rgba(12,107,107,0.45)]",
        className,
      )}
      style={{ "--card-index": index } as CSSProperties}
    >
      <div
        className={cn(
          "card-sheen relative overflow-hidden",
          featured ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[4/3]",
        )}
      >
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes={
              featured
                ? "(max-width: 640px) 100vw, 66vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-surface-2 to-surface-1" />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-surface-1 via-surface-1/70 to-transparent" />

        <div
          className="pointer-events-none absolute -inset-x-6 -bottom-10 h-32 bg-accent/30 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
          <div>
            <span className="font-display text-xs tracking-[0.2em] text-white/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-1.5 font-display text-xl tracking-tight text-accent-contrast transition-colors duration-300 group-hover:text-white sm:text-2xl">
              {name}
            </p>
          </div>
          <span className="mb-1 text-lg text-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-soft">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

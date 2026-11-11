import Image from "next/image";
import Link from "next/link";
import type { FeaturedGuidesBlock } from "@/lib/guides/style-featured-guides";

type Props = {
  block: FeaturedGuidesBlock;
};

/**
 * Server-rendered guide cards for a style detail page.
 * Images use fixed width/height (no CLS) and loading="lazy".
 */
export function StyleFeaturedGuides({ block }: Props) {
  if (block.guides.length === 0) return null;

  return (
    <section
      className="container py-12 sm:py-14 lg:py-16"
      data-testid="style-featured-guides"
      data-featured={block.featured ? "true" : "false"}
    >
      <div className="mb-7 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
        <h2 className="m-0 text-[clamp(28px,3vw,42px)] tracking-[-0.035em]">
          {block.heading}
        </h2>
        <Link href="/guides" className="font-bold text-[#bbaeff]">
          All guides →
        </Link>
      </div>
      <ul className="m-0 grid list-none grid-cols-1 gap-[18px] p-0 sm:grid-cols-2 lg:grid-cols-3">
        {block.guides.map((guide) => (
          <li key={guide.slug}>
            <article className="overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] transition-[border-color,transform] duration-200 hover:border-[var(--line-strong)]">
              <Link
                href={`/guides/${guide.slug}`}
                className="relative block aspect-[3/2] overflow-hidden bg-[var(--surface-2)]"
                aria-label={guide.title}
              >
                {guide.hasRealImage ? (
                  <Image
                    src={guide.imageUrl}
                    alt={guide.imageAlt}
                    width={guide.imageWidth}
                    height={guide.imageHeight}
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 360px"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span
                    className="block h-full w-full bg-[linear-gradient(135deg,#1d1d29,#2a1a1f)]"
                    aria-hidden
                  />
                )}
              </Link>
              <div className="p-[17px]">
                <h3 className="m-0 text-[17px] font-semibold leading-snug tracking-[-0.02em]">
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="text-[var(--text)] no-underline hover:text-[#bbaeff]"
                  >
                    {guide.title}
                  </Link>
                </h3>
                {guide.description ? (
                  <p className="mt-2 mb-0 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
                    {guide.description}
                  </p>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

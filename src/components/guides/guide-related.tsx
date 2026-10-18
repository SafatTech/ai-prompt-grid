import Image from "next/image";
import Link from "next/link";
import type { Guide } from "@/lib/guides/load";
import {
  formatGuideDateShort,
  resolveGuideSocialImage,
} from "@/lib/guides/prepare";

export function GuideRelated({
  guides,
}: {
  guides: readonly Guide[];
}) {
  if (guides.length === 0) return null;

  return (
    <section className="mt-24 bg-[color-mix(in_srgb,var(--surface)_60%,transparent)] py-16">
      <div className="mx-auto max-w-[1380px] px-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="m-0 text-3xl font-bold tracking-tight text-[var(--text)]">
            Keep exploring
          </h2>
          <Link
            href="/guides"
            className="shrink-0 text-sm font-medium text-[var(--peach)] underline-offset-2 hover:underline"
          >
            All guides →
          </Link>
        </div>
        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {guides.map((guide) => {
            const image = resolveGuideSocialImage(guide);
            const hasRealImage = Boolean(guide.ogImage) || image.url !== "/opengraph-image";
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                prefetch={false}
                className="guide-related-card relative w-[80%] shrink-0 snap-start overflow-hidden rounded-3xl bg-[var(--bg)] transition-transform duration-300 hover:-translate-y-1 md:w-auto"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#15151E]">
                  {hasRealImage ? (
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 440px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="h-full w-full bg-[radial-gradient(90%_70%_at_30%_20%,rgba(139,108,255,0.35),transparent_55%),linear-gradient(160deg,#15151e,#0b0b10)]"
                      aria-hidden
                    />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="m-0 font-semibold leading-snug text-[var(--text)]">
                    {guide.heading}
                  </h3>
                  <p className="mt-2 mb-0 line-clamp-2 text-sm text-[var(--muted)]">
                    {guide.description}
                  </p>
                  <p className="mt-4 mb-0 text-xs text-[var(--muted)]">
                    {formatGuideDateShort(guide.date)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

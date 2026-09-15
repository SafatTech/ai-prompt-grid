import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { CopyPromptButton } from "@/components/styles/CopyPromptButton";
import { ModelIcon } from "@/components/styles/ModelIcon";
import { StyleCard } from "@/components/styles/StyleCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { modelLabel } from "@/lib/constants";
import { getRelatedStyles, getStyleBySlug } from "@/lib/data/catalog";

type Props = {
  params: Promise<{ slug: string }>;
};

function formatCopyCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(count);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const style = await getStyleBySlug(slug);
  if (!style) {
    return { title: "Style not found" };
  }

  return {
    title: style.seo_title || style.title,
    description:
      style.seo_description ||
      style.short_description ||
      `Copy the ${style.title} prompt on AIPromptGrid.`,
  };
}

export default async function StyleDetailPage({ params }: Props) {
  const { slug } = await params;
  const style = await getStyleBySlug(slug);
  if (!style) notFound();

  const related = await getRelatedStyles(style, 4);
  const copiesLabel = formatCopyCount(style.copy_count);

  return (
    <div className="ambient-field surface-grain bg-surface-2 text-accent-contrast">
      <div className="ambient-layer" aria-hidden="true">
        <span className="ambient-orb ambient-orb-teal-soft ambient-orb-1" />
      </div>

      <Container width="wide" className="section-pad">
        <nav className="animate-rise mb-10 text-sm">
          <Link
            href="/styles"
            className="group inline-flex items-center gap-2 text-white/55 transition-colors hover:text-accent-soft"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Explore styles
          </Link>
        </nav>

        <header className="animate-rise max-w-3xl">
          <p className="accent-rule text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
            {style.category ? (
              <Link
                href={`/styles?category=${style.category.slug}`}
                className="transition-colors hover:text-white"
              >
                {style.category.name}
              </Link>
            ) : (
              "Style"
            )}
          </p>

          <h1 className="text-gradient-light mt-4 font-display text-[2.75rem] leading-[1.02] tracking-tight sm:text-6xl">
            {style.title}
          </h1>

          {style.short_description ? (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
              {style.short_description}
            </p>
          ) : null}

          {style.model_slugs.length > 0 ? (
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Tested on
              </span>
              <ul className="flex flex-wrap gap-2">
                {style.model_slugs.map((model) => (
                  <li key={model}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-3 py-1.5 pl-1.5 pr-3.5 text-accent-contrast">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-accent-soft">
                        <ModelIcon slug={model} className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-xs font-medium tracking-tight">
                        {modelLabel(model)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-stretch lg:gap-10 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] xl:gap-12">
          <div className="animate-rise relative mx-auto aspect-[4/5] w-full max-w-[26rem] lg:mx-0 lg:aspect-auto lg:h-full lg:min-h-[28rem] lg:max-w-none">
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-accent/15 blur-3xl"
              aria-hidden="true"
            />
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-hairline bg-surface-1 shadow-[0_36px_80px_-36px_rgba(0,0,0,0.75)]">
              {style.result_image ? (
                <Image
                  src={style.result_image.url}
                  alt={style.result_image.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 416px, 416px"
                  className="object-cover"
                  quality={90}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-surface-2 to-surface-1" />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-1/50 via-transparent to-surface-1/10" />

              <div className="absolute right-3 top-3 z-[1]">
                <div
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#e8c76a]/45 bg-[linear-gradient(145deg,rgba(52,40,12,0.78),rgba(24,18,6,0.82))] px-2.5 py-1.5 text-[#f3d98a] shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-md"
                  title={`${style.copy_count.toLocaleString()} copies`}
                  aria-label={`${style.copy_count.toLocaleString()} copies`}
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="5.5"
                      y="5.5"
                      width="7"
                      height="7"
                      rx="1.25"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M3.5 10.5V4.25A1.75 1.75 0 0 1 5.25 2.5H10.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-display text-sm leading-none tracking-tight">
                    {copiesLabel}
                  </span>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex items-center gap-2 p-3.5">
                <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                  Result
                </span>
                {style.category ? (
                  <span className="rounded-full border border-accent-soft/30 bg-accent/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                    {style.category.name}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="animate-rise-delay relative min-w-0 overflow-hidden rounded-[1.5rem] border border-hairline bg-surface-3 text-accent-contrast shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)]">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
            >
              <span className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="relative flex h-full flex-col p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 max-w-md">
                  <p className="accent-rule text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-soft">
                    The prompt
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    Copy it, paste into a tagged model, attach your photo.
                  </p>
                </div>

                <CopyPromptButton
                  prompt={style.prompt}
                  styleId={style.id}
                  appearance="atelier"
                  className="w-full sm:w-auto"
                />
              </div>

              <div className="relative mt-6 flex-1 overflow-hidden rounded-2xl border border-hairline bg-black/30 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:px-6 sm:py-6">
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/15 blur-2xl"
                  aria-hidden="true"
                />
                <p className="relative font-prompt whitespace-pre-wrap text-[1.05rem] leading-[1.75] text-[#f3efe6] sm:text-[1.125rem] sm:leading-[1.8]">
                  {style.prompt}
                </p>
              </div>

              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Coming soon"
                className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center gap-2.5 rounded-xl border border-hairline bg-white/[0.04] px-4 py-3.5 text-sm font-medium tracking-tight text-white/40"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="3.5"
                    y="7"
                    width="9"
                    height="6.5"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M5.5 7V5.25a2.5 2.5 0 0 1 5 0V7"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="truncate">Generate with this prompt</span>
                <span className="rounded-full border border-accent/35 bg-accent/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-soft">
                  Coming soon
                </span>
              </button>

              {style.how_to_use ? (
                <p className="mt-5 flex gap-3 text-sm leading-relaxed text-white/50">
                  <span
                    className="mt-0.5 w-[3px] shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <span>{style.how_to_use}</span>
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm text-white/40">
          Free to copy — no account needed.
        </p>

        {related.length > 0 ? (
          <section className="mt-24 sm:mt-32">
            <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div className="max-w-xl">
                <p className="accent-rule text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
                  Related styles
                </p>
                <h2 className="text-gradient-light mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                  More in this look
                </h2>
              </div>
              <Link
                href="/styles"
                className="group mt-1 inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent-soft transition-colors hover:text-white"
              >
                Explore all styles
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>

            <Reveal
              stagger
              className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6"
            >
              {related.map((item, index) => (
                <div
                  key={item.id}
                  style={{ "--card-index": index } as CSSProperties}
                >
                  <StyleCard style={item} index={index} />
                </div>
              ))}
            </Reveal>
          </section>
        ) : null}
      </Container>
    </div>
  );
}

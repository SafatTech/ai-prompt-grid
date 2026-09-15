import Link from "next/link";
import type { CSSProperties } from "react";
import { StyleCard } from "@/components/styles/StyleCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { listFeaturedStyles } from "@/lib/data/catalog";

export async function FeaturedStylesSection() {
  const styles = await listFeaturedStyles();
  const [featured, ...rest] = styles;

  return (
    <section className="ambient-field section-pad section-seam surface-grain bg-surface-2 text-accent-contrast">
      <div className="ambient-layer" aria-hidden="true">
        <span className="ambient-orb ambient-orb-teal-soft ambient-orb-1" />
      </div>

      <Container width="wide">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <p className="accent-rule text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
                Featured styles
              </p>
              <Link
                href="/styles"
                className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent-soft transition-colors hover:text-white sm:hidden"
              >
                Explore all styles
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
            <h2 className="text-gradient-light mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              Looks worth copying
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              Hand-picked looks with the prompt that produced them — tagged with
              the model each one was tested on.
            </p>
          </div>

          <Link
            href="/styles"
            className="group mt-1 hidden shrink-0 items-center gap-2 text-sm font-medium text-accent-soft transition-colors hover:text-white sm:inline-flex"
          >
            Explore all styles
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>

        {styles.length === 0 ? (
          <EmptyState
            className="mt-12"
            title="Featured styles arrive with content"
            description="Once styles are published in admin, featured looks will appear here with real proof images — not blurred placeholders."
            action={
              <Button href="/styles" variant="secondary">
                Open Explore
              </Button>
            }
          />
        ) : (
          <Reveal
            stagger
            className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 lg:gap-6"
          >
            {featured ? (
              <div
                className="col-span-2 row-span-2"
                style={{ "--card-index": 0 } as CSSProperties}
              >
                <StyleCard
                  style={featured}
                  index={0}
                  feature
                  priority
                  className="h-full min-h-[28rem] sm:min-h-[36rem]"
                />
              </div>
            ) : null}
            {rest.map((style, index) => (
              <div
                key={style.id}
                style={{ "--card-index": index + 1 } as CSSProperties}
              >
                <StyleCard style={style} index={index + 1} />
              </div>
            ))}
          </Reveal>
        )}
      </Container>
    </section>
  );
}

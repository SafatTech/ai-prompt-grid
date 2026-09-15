import Link from "next/link";
import type { CSSProperties } from "react";
import { CategoryCard } from "@/components/home/CategoryCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { listCategories } from "@/lib/data/catalog";

export async function ExploreConceptsSection() {
  const categories = await listCategories();

  return (
    <section className="ambient-field section-pad section-seam surface-grain bg-surface-1 text-accent-contrast">
      <div className="ambient-layer" aria-hidden="true">
        <span className="ambient-orb ambient-orb-1 ambient-orb-bright" />
      </div>

      <Container width="wide">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <p className="accent-rule text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
                Explore by style / concept
              </p>
              <Link
                href="/categories"
                className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent-soft transition-colors hover:text-white sm:hidden"
              >
                Explore all concepts
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
            <h2 className="text-gradient-light mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              Find a look family
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              Nine curated concepts, from vintage film to editorial fashion.
              Pick a family and scan the grid.
            </p>
          </div>

          <Link
            href="/categories"
            className="group mt-1 hidden shrink-0 items-center gap-2 text-sm font-medium text-accent-soft transition-colors hover:text-white sm:inline-flex"
          >
            Explore all concepts
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>

        <Reveal
          stagger
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={index === 0 ? "sm:col-span-2" : undefined}
              style={{ "--card-index": index } as CSSProperties}
            >
              <CategoryCard
                name={category.name}
                slug={category.slug}
                index={index}
                featured={index === 0}
              />
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

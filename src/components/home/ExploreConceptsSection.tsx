import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { listCategories } from "@/lib/data/catalog";

export async function ExploreConceptsSection() {
  const categories = await listCategories();

  return (
    <section className="section-pad border-b border-border bg-bg-elevated/50">
      <Container width="wide">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
              Explore by style / concept
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Find a look family
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Explore all concepts →
          </Link>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2.5">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/categories/${category.slug}`}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-elevated px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:bg-accent-soft"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

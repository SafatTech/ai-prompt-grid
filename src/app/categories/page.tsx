import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { listCategories } from "@/lib/data/catalog";

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore AI prompts by style and concept.",
};

export default async function CategoriesPage() {
  const categories = await listCategories();

  return (
    <div className="section-pad">
      <Container width="wide">
        <PageHeader
          eyebrow="Explore by style / concept"
          title="Categories"
          description="Browse look families the way you’d scan a creative platform — then open styles with proof and copyable prompts."
        />

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/categories/${category.slug}`}
                className="group flex h-full flex-col justify-between rounded-md border border-border bg-bg-elevated px-5 py-6 transition-colors hover:border-accent hover:bg-accent-soft/40"
              >
                <span className="font-display text-2xl tracking-tight text-ink">
                  {category.name}
                </span>
                {category.description ? (
                  <span className="mt-3 text-sm text-ink-muted">
                    {category.description}
                  </span>
                ) : null}
                <span className="mt-6 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  View styles →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

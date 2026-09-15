import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CategoryCard } from "@/components/home/CategoryCard";
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
    <div className="ambient-field section-pad surface-grain bg-surface-1 text-accent-contrast">
      <div className="ambient-layer" aria-hidden="true">
        <span className="ambient-orb ambient-orb-1 ambient-orb-bright" />
      </div>

      <Container width="wide">
        <PageHeader
          eyebrow="Explore by style / concept"
          title="Categories"
          description="Browse look families the way you’d scan a creative platform — then open styles with proof and copyable prompts."
        />

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {categories.map((category, index) => (
            <li
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
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

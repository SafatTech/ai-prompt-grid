import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { listCategories } from "@/lib/data/catalog";

export const metadata: Metadata = {
  title: "Admin · Categories",
  robots: { index: false, follow: false },
};

export default async function AdminCategoriesPage() {
  const categories = await listCategories();

  return (
    <div className="py-10">
      <Container width="wide">
        <h1 className="font-display text-3xl tracking-tight">Categories</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Seeded from the content model. Create/rename CRUD lands in Phase 4.
        </p>
        <ul className="mt-8 divide-y divide-border rounded-md border border-border bg-bg-elevated">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <span className="font-medium text-ink">{category.name}</span>
                {category.description ? (
                  <p className="text-ink-muted">{category.description}</p>
                ) : null}
              </div>
              <span className="text-ink-faint">{category.slug}</span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

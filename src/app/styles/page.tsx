import type { Metadata } from "next";
import { StyleCard } from "@/components/styles/StyleCard";
import { StylesFilterBar } from "@/components/styles/StylesFilterBar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { listCategories, listPublishedStyles } from "@/lib/data/catalog";

export const metadata: Metadata = {
  title: "Explore styles",
  description: "Browse curated AI photo styles and copy prompts that work.",
};

type StylesPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    model?: string;
  }>;
};

export default async function StylesPage({ searchParams }: StylesPageProps) {
  const params = await searchParams;
  const filters = {
    q: params.q,
    category: params.category,
    model: params.model,
  };
  const hasFilters = Boolean(
    filters.q?.trim() || filters.category || filters.model,
  );

  const [categories, styles] = await Promise.all([
    listCategories(),
    listPublishedStyles(filters),
  ]);

  return (
    <div className="ambient-field section-pad surface-grain bg-surface-2 text-accent-contrast">
      <div className="ambient-layer" aria-hidden="true">
        <span className="ambient-orb ambient-orb-teal-soft ambient-orb-1" />
      </div>

      <Container width="wide">
        <PageHeader
          eyebrow="Explore"
          title="All styles"
          description="Browse curated looks, filter by concept or model, and open a style to copy the prompt."
        />

        <StylesFilterBar
          className="mt-8"
          categories={categories.map((category) => ({
            name: category.name,
            slug: category.slug,
          }))}
          initial={{
            q: filters.q,
            category: filters.category,
            model: filters.model,
          }}
        />

        {hasFilters ? (
          <p className="mt-5 text-sm text-white/50">
            {styles.length === 1
              ? "1 style"
              : `${styles.length} styles`}
          </p>
        ) : null}

        {styles.length === 0 ? (
          <EmptyState
            className={hasFilters ? "mt-6" : "mt-10"}
            title={
              hasFilters
                ? "No styles in this filter yet"
                : "No styles published yet"
            }
            description={
              hasFilters
                ? "Try Vintage film, clear a filter, or search a different look."
                : "Published styles will appear here with proof thumbnails and model tags."
            }
            action={
              hasFilters ? (
                <Button href="/styles" variant="secondary">
                  Reset filters
                </Button>
              ) : (
                <Button href="/categories" variant="secondary">
                  Browse concepts
                </Button>
              )
            }
          />
        ) : (
          <ul
            className={`grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 ${hasFilters ? "mt-6" : "mt-10"}`}
          >
            {styles.map((style, index) => (
              <li key={style.id}>
                <StyleCard style={style} index={index} priority={index < 4} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}

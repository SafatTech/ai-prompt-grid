import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { listCategories } from "@/lib/data/catalog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await listCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) return { title: "Category" };
  return {
    title: category.name,
    description: category.description ?? `AI photo styles in ${category.name}.`,
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const categories = await listCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  return (
    <div className="section-pad">
      <Container width="wide">
        <PageHeader
          eyebrow="Concept"
          title={category.name}
          description={
            category.description ??
            "Styles in this concept will list here after publish. Empty states stay honest — no blurred fakes."
          }
        />
        <EmptyState
          className="mt-10"
          title={`No ${category.name} styles yet`}
          description="Published styles in this category will appear here. Drafts stay private until they have before/after proof."
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/styles" variant="secondary">
                Explore all
              </Button>
              <Button href="/categories" variant="ghost">
                All concepts
              </Button>
            </div>
          }
        />
      </Container>
    </div>
  );
}

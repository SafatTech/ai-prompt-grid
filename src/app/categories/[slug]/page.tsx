import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StyleCard } from "@/components/styles/StyleCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { CATEGORY_COVERS } from "@/lib/constants";
import { listCategories, listPublishedStyles } from "@/lib/data/catalog";

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

  const styles = await listPublishedStyles({ category: slug });
  const cover = CATEGORY_COVERS[slug];

  return (
    <div className="ambient-field surface-grain bg-surface-2 text-accent-contrast">
      <div className="ambient-layer" aria-hidden="true">
        <span className="ambient-orb ambient-orb-teal-soft ambient-orb-1" />
      </div>

      {cover ? (
        <div className="relative h-44 w-full overflow-hidden sm:h-56 md:h-64">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-2 via-surface-2/55 to-surface-2/20" />
          <div className="absolute inset-0 surface-grain pointer-events-none opacity-50" />
        </div>
      ) : null}

      <Container width="wide" className="section-pad pt-10 sm:pt-12">
        <nav className="mb-8 text-sm">
          <Link
            href="/categories"
            className="group inline-flex items-center gap-2 text-white/55 transition-colors hover:text-accent-soft"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            All concepts
          </Link>
        </nav>

        <PageHeader
          eyebrow="Concept"
          title={category.name}
          description={
            category.description ??
            "Styles in this concept with proof and copyable prompts."
          }
        />

        {styles.length === 0 ? (
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
        ) : (
          <>
            <p className="mt-8 text-sm text-white/50">
              {styles.length === 1
                ? "1 style"
                : `${styles.length} styles`}
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {styles.map((style, index) => (
                <li key={style.id}>
                  <StyleCard
                    style={style}
                    index={index}
                    priority={index < 4}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </div>
  );
}

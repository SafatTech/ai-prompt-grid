import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return {
    title,
    description: `Prompt and before/after for ${title} on AIPromptGrid.`,
  };
}

export default async function StyleDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="section-pad">
      <Container width="wide">
        <PageHeader
          eyebrow="Style"
          title={slug.replace(/-/g, " ")}
          description="Detail pages will show before/after proof, the full prompt, model tags, copy, and favorites."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="aspect-[4/5] rounded-md border border-dashed border-border bg-bg-elevated" />
          <div className="aspect-[4/5] rounded-md border border-dashed border-border bg-bg-elevated" />
        </div>

        <EmptyState
          className="mt-10"
          title="Prompt block coming with content"
          description={`Route is live at /styles/${slug}. Publishing from admin will fill proof images and the copyable prompt.`}
          action={
            <Button href="/styles" variant="secondary">
              Back to Explore
            </Button>
          }
        />
      </Container>
    </div>
  );
}

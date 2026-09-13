import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Explore styles",
  description: "Browse curated AI photo styles and copy prompts that work.",
};

export default function StylesPage() {
  return (
    <div className="section-pad">
      <Container width="wide">
        <PageHeader
          eyebrow="Explore"
          title="All styles"
          description="Search and filter by concept or model once the catalog is live. Browse is always free — no login required to copy."
        />

        <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-6">
          <StubChip>Search</StubChip>
          <StubChip>Category</StubChip>
          <StubChip>Model</StubChip>
        </div>

        <EmptyState
          className="mt-10"
          title="Styles load from the CMS next"
          description="Phase 2–4 wire Supabase and admin publish. This Explore grid will show proof thumbnails, titles, and model tags."
          action={
            <Button href="/categories" variant="secondary">
              Browse concepts
            </Button>
          }
        />
      </Container>
    </div>
  );
}

function StubChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-10 items-center rounded-md border border-dashed border-border bg-bg-elevated px-4 text-sm text-ink-muted">
      {children}
    </span>
  );
}

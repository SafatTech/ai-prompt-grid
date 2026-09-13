import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";

export function FeaturedStylesSection() {
  return (
    <section className="section-pad border-b border-border bg-bg">
      <Container width="wide">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
              Featured styles
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Looks worth copying
            </h2>
          </div>
          <Link
            href="/styles"
            className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Explore all styles →
          </Link>
        </div>

        <EmptyState
          className="mt-10"
          title="Featured styles arrive with content"
          description="Once styles are published in admin, featured looks will appear here with before/after proof — not blurred placeholders."
          action={
            <Button href="/styles" variant="secondary">
              Open Explore
            </Button>
          }
        />
      </Container>
    </section>
  );
}

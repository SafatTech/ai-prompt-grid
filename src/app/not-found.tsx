import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="section-pad">
      <Container width="narrow" className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink">
          Page not found
        </h1>
        <p className="mt-4 text-ink-muted">
          That route doesn’t exist — or the style isn’t published yet.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Home</Button>
          <Button
            href="/styles"
            variant="secondary"
            className="border-border bg-bg-elevated text-ink hover:border-border-strong"
          >
            Explore styles
          </Button>
        </div>
      </Container>
    </div>
  );
}

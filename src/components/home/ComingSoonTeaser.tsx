import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function ComingSoonTeaser() {
  return (
    <section className="section-pad bg-bg">
      <Container width="wide">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
          Coming soon
        </p>
        <h2 className="mt-2 max-w-xl font-display text-3xl tracking-tight text-ink sm:text-4xl">
          Create tools are next
        </h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted">
          Video prompts and an in-app image generator are on the roadmap. Leave
          your email on the waitlist pages — no fake blurred catalogs.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/coming-soon/video" variant="secondary">
            Video prompts waitlist
          </Button>
          <Button href="/coming-soon/generator" variant="secondary">
            Generator waitlist
          </Button>
        </div>
      </Container>
    </section>
  );
}

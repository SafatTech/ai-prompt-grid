import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-var(--header-height))] overflow-hidden surface-grain">
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 40%, rgba(12, 107, 107, 0.22), transparent 55%),
            linear-gradient(135deg, #2a2f2d 0%, #1c1f1e 42%, #0f3d3d 100%)
          `,
        }}
      />
      <div
        className="absolute inset-y-0 right-0 -z-10 hidden w-[48%] md:block"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,31,30,0.95)_0%,transparent_28%)]" />
        <div className="grid h-full grid-cols-2 gap-3 p-8 opacity-90">
          <HeroPanel className="translate-y-8" label="Before" tone="cool" />
          <HeroPanel className="-translate-y-4" label="After" tone="warm" />
        </div>
      </div>

      <Container
        width="wide"
        className="relative flex min-h-[calc(100svh-var(--header-height))] flex-col justify-center py-16 md:py-20"
      >
        <div className="max-w-xl text-accent-contrast">
          <p className="animate-rise font-display text-4xl tracking-tight sm:text-5xl md:text-6xl">
            {SITE.name}
          </p>
          <h1 className="animate-rise-delay mt-5 text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl md:text-[2.15rem]">
            Explore AI prompts by style — copy, paste, and create.
          </h1>
          <p className="animate-rise-delay-2 mt-4 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
            {SITE.tagline}
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <Button href="/styles" size="lg">
              Explore styles
            </Button>
            <Button
              href="/categories"
              size="lg"
              variant="secondary"
              className="border-white/20 bg-white/10 text-accent-contrast hover:border-white/35 hover:bg-white/15"
            >
              Browse concepts
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/45">
            Free to browse and copy.{" "}
            <Link
              href="/coming-soon/generator"
              className="underline decoration-white/30 underline-offset-4 hover:decoration-white/70"
            >
              In-app generator coming soon
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}

function HeroPanel({
  label,
  tone,
  className,
}: {
  label: string;
  tone: "cool" | "warm";
  className?: string;
}) {
  const gradient =
    tone === "cool"
      ? "linear-gradient(160deg, #4a5560 0%, #2c3338 55%, #1a1e22 100%)"
      : "linear-gradient(160deg, #8a6f55 0%, #5c4636 45%, #3d2e24 100%)";

  return (
    <div
      className={`relative overflow-hidden rounded-md border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.35)] ${className ?? ""}`}
      style={{ background: gradient }}
    >
      <div className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), transparent 45%)",
        }}
      />
      <div className="absolute bottom-4 left-4 rounded-sm bg-black/35 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
        {label}
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants";

export function HomeHero() {
  return (
    <section className="relative isolate -mt-[var(--header-height)] min-h-svh overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/images/hero/hero-main.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] md:object-[78%_center]"
          quality={90}
        />
        {/* Ink scrim for type readability — left → right on desktop, bottom wash on mobile */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-bg-deep/95 via-bg-deep/55 to-bg-deep/25 md:bg-gradient-to-r md:from-bg-deep/92 md:via-bg-deep/55 md:to-bg-deep/10"
        />
        <div className="absolute inset-0 surface-grain pointer-events-none opacity-60" />
      </div>

      <Container
        width="wide"
        className="relative flex min-h-svh flex-col justify-end pb-16 pt-[calc(var(--header-height)+3rem)] md:justify-center md:py-20 md:pt-[calc(var(--header-height)+2.5rem)]"
      >
        <div className="max-w-xl text-accent-contrast">
          <p className="animate-rise font-display text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
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

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const WAITLISTS = [
  {
    href: "/coming-soon/video",
    label: "Video prompts",
    description: "Motion styles with the same copy-ready format.",
  },
  {
    href: "/coming-soon/generator",
    label: "Image generator",
    description: "Create the look in-app, without leaving the grid.",
  },
] as const;

export function ComingSoonTeaser() {
  return (
    <section className="ambient-field section-pad section-seam surface-grain bg-surface-2 text-accent-contrast">
      <div className="ambient-layer" aria-hidden="true">
        <span className="ambient-orb ambient-orb-2 ambient-orb-teal-soft" />
      </div>

      <Container width="wide">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div className="max-w-lg">
              <p className="accent-rule text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
                Coming soon
              </p>
              <h2 className="text-gradient-light mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                Create tools are next
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Video prompts and an in-app image generator are on the roadmap.
                Join a waitlist for early access — no fake blurred catalogs, no
                members-only tease.
              </p>
            </div>

            <ul className="grid gap-3">
              {WAITLISTS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative flex items-center justify-between gap-6 overflow-hidden rounded-xl border border-hairline bg-surface-3/80 px-5 py-6 transition-all duration-500 hover:-translate-y-1 hover:border-hairline-strong hover:bg-surface-3"
                  >
                    <span
                      className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/25 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <span className="relative">
                      <span className="block font-display text-xl tracking-tight text-accent-contrast sm:text-2xl">
                        {item.label}
                      </span>
                      <span className="mt-1.5 block text-sm text-white/55">
                        {item.description}
                      </span>
                    </span>
                    <span className="relative text-lg text-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-soft">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

"use client";

import { ArrowRight } from "lucide-react";
import { HowReveal } from "@/components/how-it-works/reveal";

const VALUE_PILLS = [
  "Keep pose & clothing",
  "Copy-ready prompts",
  "Clear visual result",
];

function TransformationPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2.5 sm:gap-3">
        <figure className="relative m-0 aspect-[3/4] overflow-hidden rounded-[16px] border border-[var(--line-strong)] shadow-[0_22px_48px_rgba(0,0,0,0.45)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/catalog/editorial/source-12.png"
            alt="Example source photo before applying Crimson Bloom Shadows"
            className="absolute inset-0 size-full object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(11,11,16,0.88))] px-2.5 pt-8 pb-2.5 text-[11px] font-bold tracking-wide text-[var(--text)] sm:text-xs">
            Your source photo
          </figcaption>
        </figure>

        <div
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[rgba(139,108,255,0.5)] bg-[rgba(139,108,255,0.18)] text-[#c5baff] shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm"
          aria-hidden
        >
          <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
        </div>

        <figure className="relative m-0 aspect-[3/4] overflow-hidden rounded-[16px] border border-[rgba(139,108,255,0.45)] shadow-[0_22px_48px_rgba(0,0,0,0.5)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/catalog/editorial/result-12.png"
            alt="Crimson Bloom Shadows style result"
            className="absolute inset-0 size-full object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(11,11,16,0.88))] px-2.5 pt-8 pb-2.5 text-[11px] font-bold tracking-wide text-[var(--text)] sm:text-xs">
            Style result
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export function HowItWorksHero() {
  return (
    <section className="hiw-hero relative overflow-hidden border-b border-[var(--line)]">
      <div className="hiw-hero-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="container relative z-[1] grid items-center gap-10 py-12 sm:gap-12 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:py-[88px]">
        <HowReveal className="max-w-[560px]">
          <p className="m-0 mb-3 text-[11px] font-bold tracking-[0.14em] text-[#b9abff] uppercase sm:text-xs">
            How it works
          </p>
          <h1 className="m-0 mb-4 text-[clamp(34px,5.4vw,58px)] leading-[1.04] tracking-[-0.045em]">
            Turn a photo you love into a{" "}
            <span className="hiw-heading-accent">look that feels like you</span>.
          </h1>
          <p className="m-0 max-w-[48ch] text-[15px] leading-relaxed text-[var(--muted)] sm:text-[17px]">
            Choose a style, personalize its proven prompt, then use it with the AI editor you
            trust. You stay in control of what matters.
          </p>
          <ul className="mt-6 mb-0 flex list-none flex-wrap gap-2 p-0">
            {VALUE_PILLS.map((label) => (
              <li key={label}>
                <span className="hiw-value-pill inline-flex min-h-10 items-center rounded-[12px] border border-[var(--line)] bg-[var(--surface)] px-3.5 text-[12px] font-semibold text-[var(--text)] transition-[border-color,background-color,color] duration-200 sm:text-[13px]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </HowReveal>

        <HowReveal delayMs={120} className="relative">
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 h-[70%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,108,255,0.18)_0%,transparent_70%)]"
            aria-hidden
          />
          <div className="relative z-[1] py-2 sm:py-4">
            <TransformationPreview />
          </div>
        </HowReveal>
      </div>
    </section>
  );
}

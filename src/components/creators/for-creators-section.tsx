"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CompareSlider } from "@/components/compare-slider";

function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // CSS already forces full opacity under prefers-reduced-motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`creators-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function CreatorsHeroVisual() {
  return (
    <div className="creators-hero-visual relative h-[280px] w-full overflow-hidden rounded-[var(--radius)] border border-[var(--line)] sm:h-[340px] lg:h-[400px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/catalog/editorial/result-05.png")' }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,11,16,0.55)_0%,rgba(11,11,16,0.2)_45%,rgba(11,11,16,0.72)_100%)]"
        aria-hidden
      />

      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-end gap-2 sm:gap-3">
          <figure className="creators-hero-pair relative m-0 aspect-[4/5] overflow-hidden rounded-[14px] border border-[var(--line-strong)] bg-[var(--surface)] shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/catalog/editorial/source-05.png"
              alt="Source photo before the style"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <figcaption className="absolute bottom-2 left-2 rounded-lg bg-[rgba(11,11,16,0.78)] px-2 py-1 text-[10px] font-extrabold tracking-wide uppercase backdrop-blur-sm">
              Source
            </figcaption>
          </figure>

          <div
            className="mb-8 hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-[rgba(139,108,255,0.45)] bg-[rgba(139,108,255,0.18)] text-sm font-bold text-[#c5baff] sm:grid"
            aria-hidden
          >
            →
          </div>

          <figure className="creators-hero-pair relative m-0 aspect-[4/5] overflow-hidden rounded-[14px] border border-[rgba(139,108,255,0.45)] bg-[var(--surface)] shadow-[0_22px_48px_rgba(0,0,0,0.5)] sm:translate-y-[-12px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/catalog/editorial/result-05.png"
              alt="AI result after the style prompt"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <figcaption className="absolute bottom-2 left-2 rounded-lg bg-[rgba(11,11,16,0.78)] px-2 py-1 text-[10px] font-extrabold tracking-wide uppercase backdrop-blur-sm">
              Result
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center gap-2">
        <span className="rounded-[var(--pill)] border border-[var(--line-strong)] bg-[rgba(11,11,16,0.72)] px-3 py-1 text-xs font-bold text-[#c5baff] backdrop-blur-sm">
          Published style pair
        </span>
        <span className="rounded-[var(--pill)] border border-[var(--line)] bg-[rgba(11,11,16,0.55)] px-3 py-1 text-xs font-semibold text-[var(--muted)] backdrop-blur-sm">
          ChatGPT Image
        </span>
      </div>
    </div>
  );
}

const checklist = [
  "Source photo kept beside the AI result",
  "External editor recorded on the style",
  "Prompt preserves identity unless the style says otherwise",
];

const guidelines = [
  {
    image: "/home/made-for/use_the_right_prompt.png",
    icon: "01",
    title: "Plain language",
    body: "Describe the look clearly so visitors know what the prompt is meant to do.",
  },
  {
    image: "/home/made-for/see_the_result_first.png",
    icon: "02",
    title: "No site-transform claims",
    body: "Do not claim AI Prompt Grid transforms the photo. Visitors finish the image in their own editor.",
  },
  {
    image: "/home/made-for/save_your_fav.png",
    icon: "03",
    title: "Copy, then create",
    body: "A style is a source, a result, and a prompt someone can paste into an external AI editor.",
  },
  {
    image: "/catalog/editorial/result-05.png",
    icon: "04",
    title: "Provenance matters",
    body: "Keep notes on permission, commercial use, and model release when people are identifiable.",
  },
];

export function ForCreatorsSection() {
  return (
    <section id="for-creators" className="creators-section border-t border-[var(--line)]">
      {/* Hero */}
      <div className="creators-hero relative overflow-hidden">
        <div className="creators-hero-wash" aria-hidden />
        <div className="container relative z-[1] grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.95fr)] lg:gap-12 lg:py-[78px]">
          <Reveal>
            <h2 className="m-0 mb-3 text-[clamp(32px,5vw,54px)] leading-[1.02] tracking-[-0.045em]">
              For creators
            </h2>
            <p className="m-0 max-w-[540px] text-[15px] text-[var(--muted)] sm:text-[17px]">
              AI Prompt Grid lists tested transformation prompts. Version 0 does not
              generate images on this site. A style is a source photo, an AI result, and a
              prompt someone can copy into an external editor.
            </p>
            <p className="mt-4 mb-0 max-w-[540px] text-[15px] text-[var(--muted)] sm:text-base">
              Use this guide when you publish a look, check a prompt against a real photo,
              or request a style that is not in the catalog yet.
            </p>
          </Reveal>

          <Reveal delayMs={80}>
            <CreatorsHeroVisual />
          </Reveal>
        </div>
      </div>

      {/* Testing standard */}
      <div className="container pb-12 sm:pb-16 lg:pb-[72px]">
        <Reveal className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <div id="testing-standard" className="scroll-mt-[calc(var(--header)+12px)]">
            <p className="m-0 mb-2 text-xs font-bold tracking-[0.08em] text-[#b9abff] uppercase">
              Prompt testing standard
            </p>
            <h3 className="m-0 mb-3 text-[clamp(24px,3vw,34px)] tracking-[-0.03em]">
              Publish what you actually tested
            </h3>
            <p className="m-0 mb-6 max-w-[480px] text-[15px] text-[var(--muted)] sm:text-base">
              Each published style keeps the original photo beside the result and records
              which external editor was used. The prompt should preserve identity unless
              the style says otherwise.
            </p>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="creators-check flex items-start gap-3 rounded-[14px] border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-[14px] text-[#d2d0da] sm:text-[15px]"
                >
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[rgba(139,108,255,0.2)] text-[11px] font-bold text-[#c5baff]"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="creators-demo-frame overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3 sm:p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold tracking-[-0.02em]">
                Example published pair
              </span>
              <span className="rounded-[var(--pill)] border border-[var(--line-strong)] bg-[rgba(139,108,255,0.12)] px-3 py-1 text-xs font-bold text-[#c5baff]">
                ChatGPT Image
              </span>
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px] sm:aspect-[5/4]">
              <CompareSlider
                source="/catalog/editorial/source-01.png"
                result="/catalog/editorial/result-01.png"
                title="Creator testing example"
                large
              />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Guidelines */}
      <div className="border-y border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.018),transparent)] py-12 sm:py-16 lg:py-[72px]">
        <div className="container">
          <Reveal>
            <div
              id="creator-guidelines"
              className="mb-8 max-w-[640px] scroll-mt-[calc(var(--header)+12px)]"
            >
              <p className="m-0 mb-2 text-xs font-bold tracking-[0.08em] text-[#b9abff] uppercase">
                Creator guidelines
              </p>
              <h3 className="m-0 mb-3 text-[clamp(24px,3vw,34px)] tracking-[-0.03em]">
                What stays true in Version 0
              </h3>
              <p className="m-0 text-[15px] text-[var(--muted)] sm:text-base">
                Keep listings honest and easy to reuse. Visitors should understand the look
                before they copy the prompt.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {guidelines.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 60}>
                <article className="made-for-card creators-guideline-card group relative flex min-h-[220px] flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--line)] p-5 sm:min-h-[260px]">
                  <div
                    className="made-for-card-media absolute inset-0"
                    style={{ backgroundImage: `url("${item.image}")` }}
                    aria-hidden
                  />
                  <div
                    className="made-for-card-scrim creators-guideline-scrim absolute inset-0"
                    aria-hidden
                  />
                  <div className="made-for-card-icon relative z-[1] grid h-11 w-11 place-items-center rounded-[14px] border border-[var(--line-strong)] bg-[rgba(139,108,255,0.09)] text-sm font-extrabold text-[#c5baff]">
                    {item.icon}
                  </div>
                  <h4 className="relative z-[1] mt-auto mb-2 pt-10 text-[20px] tracking-[-0.03em] transition-[color,transform] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 md:text-[22px]">
                    {item.title}
                  </h4>
                  <p className="relative z-[1] m-0 text-[14px] text-[var(--muted)] transition-colors duration-[420ms] group-hover:text-[#d2d0da] sm:text-[15px]">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Request a style + browse */}
      <div className="container py-12 sm:py-16 lg:py-[78px]">
        <Reveal>
          <div
            id="request-a-style"
            className="creators-request scroll-mt-[calc(var(--header)+12px)] grid overflow-hidden rounded-[var(--radius)] border border-[var(--line)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
          >
            <div className="relative min-h-[220px] lg:min-h-[320px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("/home/made-for/see_the_result_first.png")',
                }}
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,16,0.15),rgba(11,11,16,0.55))] lg:bg-[linear-gradient(90deg,transparent,rgba(11,11,16,0.35))]"
                aria-hidden
              />
            </div>
            <div className="flex flex-col justify-center bg-[var(--surface)] p-6 sm:p-8 lg:p-10">
              <p className="m-0 mb-2 text-xs font-bold tracking-[0.08em] text-[#b9abff] uppercase">
                Request a style
              </p>
              <h3 className="m-0 mb-3 text-[clamp(22px,3vw,30px)] tracking-[-0.03em]">
                Ask for a look that is not listed yet
              </h3>
              <p className="m-0 mb-6 text-[15px] text-[var(--muted)] sm:text-base">
                During the private beta, style ideas go through the contact channel on your
                invite. Include the subject, the look you want, and a note about which
                editor you used.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/explore"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--violet)] px-[18px] text-sm font-bold text-[#100d1a] transition-colors hover:bg-[#9b82ff]"
                >
                  Browse the catalog
                </Link>
                <Link
                  href="/privacy#contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--line-strong)] bg-transparent px-[18px] text-sm font-bold text-[var(--text)] transition-colors hover:border-[rgba(139,108,255,0.45)] hover:bg-[rgba(139,108,255,0.08)]"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

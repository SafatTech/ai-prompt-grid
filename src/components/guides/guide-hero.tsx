import Image from "next/image";
import type { ReactNode } from "react";
import type { GuideDisplayHero } from "@/lib/guides/prepare";

export function GuideHero({
  hero,
  label,
  heading,
  description,
  dateLabel,
  readingMinutes,
  promptsTested,
  shareActions,
}: {
  hero: GuideDisplayHero;
  label?: string;
  heading: string;
  description: string;
  dateLabel: string;
  readingMinutes: number;
  promptsTested: boolean;
  shareActions?: ReactNode;
}) {
  return (
    <section className="guide-hero relative h-[min(86vh,820px)] min-h-[480px] w-full overflow-hidden sm:min-h-[560px]">
      {hero.kind === "image" ? (
        <Image
          src={hero.url}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: hero.position }}
        />
      ) : (
        <div
          className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_10%,rgba(139,108,255,0.45),transparent_55%),radial-gradient(90%_70%_at_90%_20%,rgba(255,155,130,0.35),transparent_50%),linear-gradient(180deg,#15151e_0%,#0b0b10_100%)]"
          aria-hidden
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[color-mix(in_srgb,var(--bg)_60%,transparent)] to-transparent"
        aria-hidden
      />
      <div className="guide-hero-copy relative mx-auto flex h-full max-w-[1380px] flex-col justify-end px-5 pb-12 sm:pb-14">
        {label ? (
          <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-[var(--text)] uppercase backdrop-blur">
            {label}
          </span>
        ) : null}
        <h1 className="mt-5 max-w-4xl text-4xl leading-[1.05] font-extrabold tracking-tight text-[var(--text)] sm:text-6xl">
          {heading}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-[color-mix(in_srgb,var(--text)_80%,transparent)]">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3 text-sm text-[color-mix(in_srgb,var(--text)_80%,transparent)]">
          <span>Written by Safat Tech</span>
          <span className="opacity-40" aria-hidden>
            •
          </span>
          <span>{dateLabel}</span>
          <span className="opacity-40" aria-hidden>
            •
          </span>
          <span>
            {readingMinutes} min read
          </span>
          {promptsTested ? (
            <>
              <span className="opacity-40" aria-hidden>
                •
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--mint)_15%,transparent)] px-2.5 py-0.5 text-xs font-semibold text-[var(--mint)]">
                ✓ Tested prompts
              </span>
            </>
          ) : null}
          {shareActions ? (
            <>
              <span className="hidden opacity-40 sm:inline" aria-hidden>
                |
              </span>
              {shareActions}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

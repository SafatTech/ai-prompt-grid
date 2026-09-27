"use client";

import Link from "next/link";
import { useCallback, useId, useState, type KeyboardEvent } from "react";
import {
  ArrowUpRight,
  Frame,
  Images,
  Layers,
  Palette,
  Ratio,
  Sparkles,
  UserRound,
} from "lucide-react";
import { HowReveal } from "@/components/how-it-works/reveal";
import { cn } from "@/lib/utils";

type StepId = "choose" | "personalize" | "create";

const STEPS: {
  id: StepId;
  label: string;
  stepLabel: string;
  title: string;
  description: string;
  action: string;
  ActionIcon: typeof Images;
}[] = [
  {
    id: "choose",
    label: "Choose a visual style",
    stepLabel: "Step one",
    title: "Choose a visual style",
    description:
      "Browse real source-and-result pairs. You see the transformation before deciding which style fits your photo.",
    action: "Browse curated styles",
    ActionIcon: Images,
  },
  {
    id: "personalize",
    label: "Personalize the prompt",
    stepLabel: "Step two",
    title: "Personalize the prompt",
    description:
      "Set the parts you want to keep, then adjust mood, background, and ratio. The prompt updates around your choices.",
    action: "Customize your prompt",
    ActionIcon: Sparkles,
  },
  {
    id: "create",
    label: "Create with your AI editor",
    stepLabel: "Step three",
    title: "Create with your AI editor",
    description:
      "Copy the finished prompt and use it with your preferred AI editor. Your reference result keeps the goal clear.",
    action: "Copy and create",
    ActionIcon: ArrowUpRight,
  },
];

const CONTROLS = [
  { label: "Subject", Icon: UserRound },
  { label: "Preserve", Icon: Layers },
  { label: "Mood", Icon: Palette },
  { label: "Background", Icon: Frame },
  { label: "Ratio", Icon: Ratio },
] as const;

const STYLE_PREVIEWS = [
  {
    source: "/catalog/editorial/source-01.png",
    result: "/catalog/editorial/result-01.png",
    title: "Editorial",
  },
  {
    source: "/catalog/editorial/source-12.png",
    result: "/catalog/editorial/result-12.png",
    title: "Crimson Bloom Shadows",
  },
  {
    source: "/catalog/editorial/source-08.png",
    result: "/catalog/editorial/result-08.png",
    title: "Cinematic",
  },
];

const RESULT_PREVIEWS = [
  "/catalog/editorial/result-12.png",
  "/catalog/editorial/result-06.png",
];

function PromptPreview() {
  return (
    <div className="hiw-prompt-preview relative overflow-hidden rounded-[16px] border border-[var(--line)] bg-[rgba(11,11,16,0.92)] p-4 shadow-[0_20px_48px_rgba(0,0,0,0.35)] sm:p-5">
      <div className="mb-3 flex items-center gap-1.5" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.18)]" />
        <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.18)]" />
        <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.18)]" />
        <span className="ml-2 text-[10px] font-semibold tracking-wide text-[var(--muted)] uppercase">
          Prompt preview
        </span>
      </div>
      <pre className="m-0 whitespace-pre-wrap font-mono text-[12px] leading-[1.7] text-[#b8b6c4] sm:text-[13px]">
        <code>
          Transform the uploaded{" "}
          <span className="text-[#c5baff]">{"{{subject}}"}</span> into a refined editorial
          portrait, preserving identity and{" "}
          <span className="text-[#c5baff]">{"{{preserve}}"}</span>.
          {"\n\n"}
          Use <span className="text-[#c5baff]">{"{{mood}}"}</span> color grading with soft
          cinematic highlights. Place the scene in{" "}
          <span className="text-[#c5baff]">{"{{background}}"}</span>.
          {"\n\n"}
          Compose for <span className="text-[#c5baff]">{"{{ratio}}"}</span> without cropping
          the face or outfit details.
        </code>
      </pre>
    </div>
  );
}

function StyleCardsVisual() {
  return (
    <div className="relative mx-auto flex h-[260px] w-full max-w-[420px] items-center justify-center sm:h-[300px]">
      {STYLE_PREVIEWS.map((card, index) => {
        const isCenter = index === 1;
        const offsets = [
          "translate-x-[-42%] rotate-[-8deg] scale-[0.88] opacity-70",
          "z-20 translate-x-0 rotate-[0deg] scale-100",
          "translate-x-[42%] rotate-[8deg] scale-[0.88] opacity-70",
        ];
        return (
          <figure
            key={card.title}
            className={cn(
              "absolute aspect-[3/4] w-[48%] overflow-hidden rounded-[16px] border bg-[var(--surface)] shadow-[0_18px_40px_rgba(0,0,0,0.42)] transition-[transform,border-color,box-shadow] duration-300",
              isCenter
                ? "border-[rgba(167,145,255,0.55)] shadow-[0_24px_56px_rgba(0,0,0,0.5)]"
                : "border-[var(--line)]",
              offsets[index],
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={isCenter ? card.result : card.source}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            {isCenter ? (
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(11,11,16,0.9))] px-3 pt-10 pb-3 text-xs font-bold text-[var(--text)]">
                Selected style
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}

function ResultCardsVisual() {
  return (
    <div className="relative mx-auto flex h-[260px] w-full max-w-[400px] items-center justify-center sm:h-[300px]">
      {RESULT_PREVIEWS.map((src, index) => (
        <figure
          key={src}
          className={cn(
            "absolute aspect-[3/4] w-[52%] overflow-hidden rounded-[16px] border border-[rgba(167,145,255,0.28)] bg-[var(--surface)] shadow-[0_22px_50px_rgba(0,0,0,0.45)]",
            index === 0
              ? "z-10 translate-x-[-18%] rotate-[-4deg]"
              : "z-20 translate-x-[18%] translate-y-[-6%] rotate-[3deg]",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]"
            aria-hidden
          />
        </figure>
      ))}
    </div>
  );
}

function StepVisual({ step }: { step: StepId }) {
  if (step === "choose") return <StyleCardsVisual />;
  if (step === "personalize") return <PromptPreview />;
  return <ResultCardsVisual />;
}

function DetailCopy({
  step,
  actionHref,
}: {
  step: (typeof STEPS)[number];
  actionHref: string;
}) {
  const Icon = step.ActionIcon;
  return (
    <div className="flex min-h-0 flex-col justify-center">
      <p className="m-0 mb-2 text-[11px] font-bold tracking-[0.12em] text-[#b9abff] uppercase">
        {step.stepLabel}
      </p>
      <h3 className="m-0 mb-3 text-[clamp(24px,3vw,34px)] leading-[1.08] tracking-[-0.035em]">
        {step.title}
      </h3>
      <p className="m-0 max-w-[42ch] text-[15px] leading-relaxed text-[var(--muted)] sm:text-base">
        {step.description}
      </p>
      <Link
        href={actionHref}
        className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-bold text-[#c5baff] transition-colors hover:text-[#ddd6ff]"
      >
        <Icon className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
        {step.action}
      </Link>
    </div>
  );
}

export function HowItWorksJourney() {
  const [active, setActive] = useState<StepId>("choose");
  const tablistId = useId();
  const activeStep = STEPS.find((s) => s.id === active) ?? STEPS[0];
  const panelId = `${tablistId}-panel`;

  const selectByIndex = useCallback((index: number) => {
    const next = STEPS[(index + STEPS.length) % STEPS.length];
    if (next) setActive(next.id);
  }, []);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectByIndex(index + 1);
      const next = document.getElementById(`${tablistId}-tab-${(index + 1) % STEPS.length}`);
      next?.focus();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectByIndex(index - 1);
      const prev = document.getElementById(
        `${tablistId}-tab-${(index - 1 + STEPS.length) % STEPS.length}`,
      );
      prev?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      selectByIndex(0);
      document.getElementById(`${tablistId}-tab-0`)?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      selectByIndex(STEPS.length - 1);
      document.getElementById(`${tablistId}-tab-${STEPS.length - 1}`)?.focus();
    }
  };

  const actionHref = "/explore";

  return (
    <section className="hiw-journey relative border-b border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.022),rgba(255,255,255,0.008))]">
      <div className="container py-12 sm:py-16 lg:py-[78px]">
        <HowReveal mode="scroll" className="mb-8 grid gap-4 lg:mb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-10">
          <div>
            <p className="m-0 mb-2 text-[11px] font-bold tracking-[0.14em] text-[#b9abff] uppercase sm:text-xs">
              Your simple flow
            </p>
            <h2 className="m-0 text-[clamp(30px,4.2vw,48px)] leading-[1.05] tracking-[-0.04em]">
              Three clear steps. Your choices throughout.
            </h2>
          </div>
          <p className="m-0 max-w-[36ch] text-[14px] leading-relaxed text-[var(--muted)] lg:justify-self-end lg:text-right sm:text-[15px]">
            Open each step to see the exact interaction instead of reading a long block of
            instructions.
          </p>
        </HowReveal>

        <HowReveal mode="scroll" delayMs={60}>
          <div
            role="tablist"
            aria-label="How it works steps"
            className="grid grid-cols-1 gap-2 md:grid-cols-3"
          >
            {STEPS.map((step, index) => {
              const selected = step.id === active;
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  id={`${tablistId}-tab-${index}`}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(step.id)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={cn(
                    "flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-[16px] border px-4 py-3.5 text-left transition-[background-color,border-color,color,box-shadow] duration-200",
                    selected
                      ? "border-[rgba(167,145,255,0.55)] bg-[rgba(139,108,255,0.16)] text-[var(--text)] shadow-[0_12px_32px_rgba(0,0,0,0.28)]"
                      : "border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-[var(--text)]",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-extrabold",
                      selected
                        ? "bg-[var(--violet)] text-[#100d1a]"
                        : "border border-[var(--line)] bg-[var(--surface-2)] text-[#b9abff]",
                    )}
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <span className="text-[13px] font-bold leading-snug sm:text-sm">{step.label}</span>
                </button>
              );
            })}
          </div>
        </HowReveal>

        <HowReveal mode="scroll" delayMs={100}>
          <div
            role="tabpanel"
            id={panelId}
            aria-labelledby={`${tablistId}-tab-${STEPS.findIndex((s) => s.id === active)}`}
            className="mt-4 rounded-[18px] border border-[var(--line)] bg-[rgba(21,21,30,0.72)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:mt-5 sm:p-6 lg:p-8"
          >
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
              <DetailCopy step={activeStep} actionHref={actionHref} />
              <div className="min-w-0">
                <StepVisual step={active} />
              </div>
            </div>
          </div>
        </HowReveal>

        <HowReveal mode="scroll" delayMs={140} className="mt-6 sm:mt-8">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {CONTROLS.map(({ label, Icon }) => (
              <div
                key={label}
                className="flex min-h-11 items-center gap-2.5 rounded-[14px] border border-[var(--line)] bg-[var(--surface)] px-3.5 py-3"
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-[#c5baff]"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="text-[13px] font-semibold text-[var(--text)]">{label}</span>
              </div>
            ))}
          </div>
        </HowReveal>

        <HowReveal mode="scroll" delayMs={180} className="mt-8 sm:mt-10">
          <div className="hiw-cta-banner relative overflow-hidden rounded-[18px] border border-[rgba(167,145,255,0.35)] px-6 py-8 sm:px-8 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-10">
            <div className="relative z-[1] max-w-[520px]">
              <h3 className="m-0 mb-2 text-[clamp(24px,3vw,34px)] leading-[1.08] tracking-[-0.035em]">
                Ready to find a style?
              </h3>
              <p className="m-0 text-[15px] text-[rgba(245,243,238,0.78)] sm:text-base">
                Start with the result you want to see.
              </p>
            </div>
            <Link
              href="/explore"
              className="relative z-[1] mt-5 inline-flex min-h-11 items-center justify-center gap-2.5 rounded-xl bg-white px-5 text-sm font-bold !text-[#100d1a] transition-[transform,background-color] duration-200 hover:bg-[#f0edff] active:scale-[0.98] lg:mt-0"
            >
              Explore styles
              <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
            </Link>
          </div>
        </HowReveal>
      </div>
    </section>
  );
}

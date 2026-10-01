"use client";

import Link from "next/link";
import {
  Suspense,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CompareSlider } from "@/components/compare-slider";
import { CopyIcon } from "@/components/icons";
import { ShareModal } from "@/components/modals/share-modal";
import { StyleCard } from "@/components/style-card";
import { StyleSaveResultQuery } from "@/components/styles/style-save-result-query";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/components/providers/library-provider";
import { useToast } from "@/components/providers/toast-provider";
import { useUiModals } from "@/components/providers/ui-modal-provider";
import { track } from "@/lib/analytics";
import {
  assemblePrompt,
  defaultsForStyle,
  preserveToggleLabels,
  previewPrompt,
  ratioOptions,
  type PromptOptions,
} from "@/lib/catalog/prompts";
import { labeledOptionsForStyle } from "@/lib/catalog/prompt-option-presets";
import { getStyleProfile, type CatalogStyle } from "@/lib/catalog/styles";
import { cn } from "@/lib/utils";

type Props = { style: CatalogStyle; relatedStyles: CatalogStyle[] };

export function StyleDetailClient({ style, relatedStyles }: Props) {
  const profile = getStyleProfile(style);
  const related = relatedStyles;
  const { signedIn, isSaved, toggleSave, setPendingAction } = useLibrary();
  const { toast } = useToast();
  const { openSignIn, openSaveResult, openExternalInfo } = useUiModals();
  const [options, setOptions] = useState<PromptOptions>(() => defaultsForStyle(style));
  const [optionsStyleId, setOptionsStyleId] = useState(style.id);
  const [compareDefault, setCompareDefault] = useState<"slider" | "side">("slider");
  const [showStickyCopy, setShowStickyCopy] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  if (style.id !== optionsStyleId) {
    setOptionsStyleId(style.id);
    setOptions(defaultsForStyle(style));
  }
  const assembled = useMemo(() => assemblePrompt(style, options), [style, options]);
  const prompt = assembled.ok ? assembled.prompt : previewPrompt(style, options);
  const moodSelectOptions = useMemo(
    () => labeledOptionsForStyle(style, "mood"),
    [style],
  );
  const backgroundSelectOptions = useMemo(
    () => labeledOptionsForStyle(style, "background"),
    [style],
  );
  const saved = isSaved(style.id);

  useEffect(() => {
    track("style_view", { style_id: style.id, category: style.category });
  }, [style.id, style.category]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setCompareDefault(mq.matches ? "side" : "slider");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const aside = document.getElementById("customize-prompt");
    if (!aside) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCopy(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(aside);
    return () => observer.disconnect();
  }, [style.id]);

  useEffect(() => {
    if (!shareOpen) return;
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, [shareOpen]);

  function onSave() {
    if (!signedIn) {
      setPendingAction({ type: "save-style", styleId: style.id });
      openSignIn();
      track("sign_in_started", { method: "google", intent: "save_style" });
      return;
    }
    toggleSave(style.id);
    if (!saved) track("style_saved", { style_id: style.id });
    toast(saved ? "Style removed from your library." : "Style saved to your library.");
  }

  async function onCopy() {
    const result = assemblePrompt(style, options);
    if (!result.ok) {
      toast(result.errors[0] ?? "Prompt is incomplete and cannot be copied.", "error");
      return;
    }
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(result.prompt);
      } else {
        const area = document.createElement("textarea");
        area.value = result.prompt;
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
      track("prompt_copy", {
        style_id: style.id,
        variant_id: style.promptVariant.id,
        tool: result.tool,
      });
      toast("Prompt copied. Open your AI image editor and upload your photo there.");
    } catch {
      toast("Could not copy automatically. Select the prompt text manually.", "error");
    }
  }

  function onSaveResult() {
    if (!signedIn) {
      setPendingAction({ type: "save-result", styleId: style.id });
      openSignIn();
      toast("Sign in to save your transformed result.");
      return;
    }
    openSaveResult(style.id);
  }

  function onExternalTool() {
    track("external_tool_click", {
      style_id: style.id,
      tool: style.promptVariant.tool,
    });
    openExternalInfo();
  }

  return (
    <div>
      <Suspense fallback={null}>
        <StyleSaveResultQuery styleId={style.id} />
      </Suspense>
      <section className="container pt-7">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/explore"
              className="grid h-[41px] w-[41px] shrink-0 place-items-center rounded-xl border border-[var(--line)] bg-[rgba(21,21,30,0.92)]"
              aria-label="Back to explore"
            >
              ←
            </Link>
            <span className="truncate text-xs text-[var(--muted)]">
              Explore / {style.category} / {style.title}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
            <Button variant="secondary" className="gap-2.5" data-testid="detail-save-style" onClick={onSave}>
              <span aria-hidden="true">{saved ? "♥" : "♡"}</span>
              <span>{saved ? "Saved" : "Save style"}</span>
            </Button>
            <Button
              variant="ghost"
              className="gap-2.5"
              onClick={() => setShareOpen(true)}
            >
              <span aria-hidden="true">↗</span>
              <span>Share</span>
            </Button>
          </div>
        </div>
        <div className="h-[min(52dvh,560px)] min-h-[280px] overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)] md:min-h-[360px] lg:h-[min(68dvh,720px)] lg:min-h-[480px]">
          <CompareSlider
            key={compareDefault}
            source={style.source}
            result={style.result}
            title={style.title}
            styleId={style.id}
            large
            showModeToggle
            defaultMode={compareDefault}
          />
        </div>
      </section>

      <section className="container grid items-start gap-10 pt-12 pb-[95px] lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16 lg:pt-[70px]">
        <article>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {[
              style.category,
              style.subject,
              style.requirement,
              style.tool,
              `Mode: ${style.promptVariant.mode}`,
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex min-h-[25px] items-center rounded-[7px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.06)] px-2 text-[10px] font-bold text-[#c7c5cf] first:border-[rgba(139,108,255,0.2)] first:bg-[rgba(139,108,255,0.12)] first:text-[#c7bcff]"
              >
                {badge}
              </span>
            ))}
          </div>
          <h1 className="m-0 mb-4 text-[clamp(32px,6vw,67px)] leading-none tracking-[-0.05em]">
            {style.title}
          </h1>
          <p className="m-0 max-w-[690px] text-[16px] text-[#c2c0ca] sm:text-[19px]">
            {profile.description}
          </p>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Target photo: {style.targetSourcePhoto}. Inputs:{" "}
            {style.promptVariant.inputImageRoles.join(" → ")} (
            {style.promptVariant.inputImageCount}). Last verified{" "}
            {style.promptVariant.lastVerified}. Prompt v{style.promptVariant.version}.
          </p>

          <section className="mt-9 border-t border-[var(--line)] py-7">
            <h2 className="mb-4 text-[22px]">Best source photo</h2>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {profile.best.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </div>
          </section>

          <section className="border-t border-[var(--line)] py-7">
            <h2 className="mb-4 text-[22px]">What changes</h2>
            <div className="grid grid-cols-2 gap-2.5 max-[380px]:grid-cols-1 lg:grid-cols-4">
              {profile.changes.map((item, index) => (
                <ChangeCard key={item} label={item} index={index} />
              ))}
            </div>
          </section>

          <section className="border-t border-[var(--line)] py-7">
            <h2 className="mb-4 text-[22px]">What should stay recognizable</h2>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {profile.stays.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </div>
            <div className="mt-[22px] rounded-[14px] border border-[rgba(255,155,130,0.23)] bg-[rgba(255,155,130,0.07)] p-[17px] text-[13px] text-[#e6c7c0]">
              AI tools can still change small details. Review the final result before using
              it professionally.
            </div>
          </section>

          <section className="border-t border-[var(--line)] py-7">
            <h2 className="mb-4 text-[22px]">Limitations</h2>
            <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-[#d2cfd7]">
              {style.promptVariant.limitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </article>

        <aside
          id="customize-prompt"
          className="rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-[23px] shadow-[0_18px_55px_rgba(0,0,0,0.2)] lg:sticky lg:top-[calc(var(--header)+18px)]"
        >
          <h2 className="m-0 mb-1 text-[23px] tracking-[-0.025em]">Customize this prompt</h2>
          <p className="mb-[22px] text-[13px] text-[var(--muted)]">
            Adjust the details, then copy the prompt to {style.promptVariant.tool}.
          </p>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <PromptSelect
              label="Color mood"
              value={options.mood}
              options={moodSelectOptions}
              testId="mood-select"
              onChange={(value) =>
                setOptions((o) => ({ ...o, mood: value as PromptOptions["mood"] }))
              }
            />
            <PromptSelect
              label="Background"
              value={options.background}
              options={backgroundSelectOptions}
              testId="background-select"
              onChange={(value) =>
                setOptions((o) => ({
                  ...o,
                  background: value as PromptOptions["background"],
                }))
              }
            />
            <PromptSelect
              label="Output ratio"
              className="sm:col-span-2"
              value={options.ratio}
              options={ratioOptions.map((item) => ({ value: item, label: item }))}
              testId="ratio-select"
              onChange={(value) =>
                setOptions((o) => ({
                  ...o,
                  ratio: value as PromptOptions["ratio"],
                }))
              }
            />
          </div>

          <Toggle
            label={preserveToggleLabels(style.subject).clothing}
            checked={options.keepClothing}
            onChange={(checked) => setOptions((o) => ({ ...o, keepClothing: checked }))}
          />
          <Toggle
            label={preserveToggleLabels(style.subject).pose}
            checked={options.keepPose}
            onChange={(checked) => setOptions((o) => ({ ...o, keepPose: checked }))}
          />

          <div
            data-testid="prompt-box"
            className="my-[18px] max-h-[255px] min-h-[175px] overflow-auto rounded-[13px] border border-[var(--line)] bg-[#0f0f15] p-[15px] font-mono text-xs leading-[1.65] text-[#d5d2dc]"
          >
            {assembled.ok ? (
              prompt
            ) : (
              <span className="text-[var(--danger)]">
                {assembled.errors.join(" ")}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button
              className="sm:col-span-2"
              data-testid="copy-prompt"
              onClick={onCopy}
              disabled={!assembled.ok}
            >
              <CopyIcon />
              Copy prompt
            </Button>
            <Button variant="secondary" onClick={onSave}>
              Save to collection
            </Button>
            <Button variant="secondary" data-testid="save-result" onClick={onSaveResult}>
              Save your result
            </Button>
            <Link
              href="/explore"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--line)] px-[18px] text-sm font-bold text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-[var(--text)] sm:col-span-2"
            >
              Try another style
            </Link>
          </div>

          <div className="mt-5 border-t border-[var(--line)] pt-[18px]">
            <h3 className="mb-2.5 text-[13px]">Use this prompt</h3>
            <ol className="m-0 list-decimal pl-5 text-xs text-[var(--muted)]">
              <li className="mb-1">
                Open {style.promptVariant.tool} in {style.promptVariant.mode}
              </li>
              <li className="mb-1">
                Upload {style.promptVariant.inputImageRoles.join(", then ")}
              </li>
              <li className="mb-1">Paste this prompt</li>
              <li>Generate and check your result</li>
            </ol>
            <button
              type="button"
              className="mt-2 cursor-pointer border-0 bg-transparent p-0 text-xs font-bold text-[#bbaeff]"
              onClick={onExternalTool}
              data-testid="external-tool-info"
            >
              Why does this use an external tool?
            </button>
          </div>
        </aside>
      </section>

      <section className="container py-12 sm:py-16">
        <h2 className="mb-7 text-[clamp(28px,3vw,42px)] tracking-[-0.035em]">More examples</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {style.examplePairs.map((example, index) => (
            <div
              key={`${style.id}-example-${index}`}
              className="grid h-[220px] grid-cols-2 gap-0.5 overflow-hidden rounded-[var(--radius)] border border-[var(--line)] md:h-[260px] lg:h-[280px]"
            >
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={example.source}
                  alt={example.altSource}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute bottom-3 left-3 rounded-lg bg-[rgba(11,11,16,0.72)] px-2 py-1 text-[10px] font-extrabold">
                  Source photo
                </span>
              </div>
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={example.result}
                  alt={example.altResult}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute right-3 bottom-3 rounded-lg bg-[rgba(11,11,16,0.72)] px-2 py-1 text-[10px] font-extrabold">
                  AI result
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-12 sm:py-16 lg:py-[88px]">
        <div className="mb-7 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
          <h2 className="m-0 text-[clamp(28px,3vw,42px)] tracking-[-0.035em]">
            Related styles
          </h2>
          <Link href="/explore" className="font-bold text-[#bbaeff]">
            Explore all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <StyleCard key={item.id} style={item} compact />
          ))}
        </div>
      </section>

      <section className="container mb-[90px] grid items-center gap-5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 md:grid-cols-[auto_1fr]">
        <div className="grid h-[58px] w-[58px] place-items-center rounded-2xl bg-[rgba(103,216,178,0.1)] text-[25px] text-[var(--mint)]">
          ✓
        </div>
        <div>
          <h2 className="m-0 mb-1 text-[22px]">Created with your photo in mind</h2>
          <p className="m-0 text-[var(--muted)]">
            Only upload photos you own or have permission to use. Keep recognizable people
            informed about how their images are edited.
          </p>
        </div>
      </section>

      {showStickyCopy ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--line)] bg-[rgba(11,11,16,0.94)] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-[8px] lg:hidden">
          <Button
            className="w-full"
            data-testid="sticky-copy-prompt"
            onClick={onCopy}
            disabled={!assembled.ok}
          >
            <CopyIcon />
            Copy prompt
          </Button>
        </div>
      ) : null}

      {shareOpen ? (
        <ShareModal
          url={`${window.location.origin}/styles/${style.id}`}
          title={style.title}
          styleId={style.id}
          onClose={() => setShareOpen(false)}
        />
      ) : null}
    </div>
  );
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[45px] items-center gap-2.5 text-sm text-[#d2cfd7]">
      <span className="grid h-[23px] w-[23px] shrink-0 place-items-center rounded-[7px] bg-[rgba(103,216,178,0.11)] text-xs text-[var(--mint)]">
        ✓
      </span>
      {children}
    </div>
  );
}

type ChangeTheme = {
  border: string;
  wash: string;
  orb: string;
  accent: string;
};

const CHANGE_FALLBACKS: ChangeTheme[] = [
  {
    border: "border-[rgba(245,180,90,0.28)]",
    wash: "from-[rgba(245,180,90,0.22)] via-[rgba(30,24,18,0.55)] to-[rgba(18,16,24,0.95)]",
    orb: "bg-[rgba(255,196,110,0.45)]",
    accent: "text-[#f3d5a0]",
  },
  {
    border: "border-[rgba(110,180,255,0.28)]",
    wash: "from-[rgba(90,160,255,0.22)] via-[rgba(18,24,36,0.55)] to-[rgba(16,16,24,0.95)]",
    orb: "bg-[rgba(120,190,255,0.4)]",
    accent: "text-[#b8d7ff]",
  },
  {
    border: "border-[rgba(180,130,255,0.3)]",
    wash: "from-[rgba(160,110,255,0.24)] via-[rgba(28,20,40,0.55)] to-[rgba(16,14,24,0.95)]",
    orb: "bg-[rgba(180,140,255,0.42)]",
    accent: "text-[#d4c4ff]",
  },
  {
    border: "border-[rgba(103,216,178,0.28)]",
    wash: "from-[rgba(103,216,178,0.2)] via-[rgba(18,28,26,0.55)] to-[rgba(16,16,22,0.95)]",
    orb: "bg-[rgba(103,216,178,0.4)]",
    accent: "text-[#b8eed8]",
  },
];

function themeForChange(label: string, index: number): ChangeTheme {
  const key = label.toLowerCase();

  if (key.includes("light") || key.includes("shadow") || key.includes("rim")) {
    return CHANGE_FALLBACKS[0];
  }
  if (
    key.includes("background") ||
    key.includes("environment") ||
    key.includes("surface") ||
    key.includes("staging") ||
    key.includes("framing") ||
    key.includes("camera")
  ) {
    return CHANGE_FALLBACKS[1];
  }
  if (key.includes("color") || key.includes("mood") || key.includes("grade")) {
    return CHANGE_FALLBACKS[2];
  }
  if (
    key.includes("wardrobe") ||
    key.includes("outfit") ||
    key.includes("cloth") ||
    key.includes("glove") ||
    key.includes("jewellery") ||
    key.includes("jewelry") ||
    key.includes("styling")
  ) {
    return {
      border: "border-[rgba(255,140,170,0.28)]",
      wash: "from-[rgba(255,120,160,0.2)] via-[rgba(36,18,28,0.55)] to-[rgba(18,14,20,0.95)]",
      orb: "bg-[rgba(255,150,180,0.4)]",
      accent: "text-[#f5c4d2]",
    };
  }
  if (key.includes("pose") || key.includes("motion") || key.includes("floating")) {
    return CHANGE_FALLBACKS[3];
  }
  if (
    key.includes("prop") ||
    key.includes("flower") ||
    key.includes("bouquet") ||
    key.includes("paper") ||
    key.includes("collage") ||
    key.includes("panel") ||
    key.includes("layout")
  ) {
    return {
      border: "border-[rgba(255,160,100,0.28)]",
      wash: "from-[rgba(255,150,90,0.18)] via-[rgba(36,24,18,0.55)] to-[rgba(18,16,20,0.95)]",
      orb: "bg-[rgba(255,170,110,0.38)]",
      accent: "text-[#f0c9a8]",
    };
  }

  return CHANGE_FALLBACKS[index % CHANGE_FALLBACKS.length];
}

function ChangeCard({ label, index }: { label: string; index: number }) {
  const theme = themeForChange(label, index);

  return (
    <div
      className={`group relative flex min-h-[98px] items-end overflow-hidden rounded-[14px] border ${theme.border} bg-[#121218] p-3.5 text-[13px] font-bold transition duration-300 hover:-translate-y-0.5 hover:border-[var(--line-strong)]`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.wash}`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute -top-8 -right-6 h-24 w-24 rounded-full ${theme.orb} opacity-50 blur-2xl transition duration-500 group-hover:opacity-70 group-hover:scale-110`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 left-0 h-16 w-16 rounded-full bg-white/10 opacity-30 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />
      <span className={`relative z-10 drop-shadow-sm ${theme.accent}`}>{label}</span>
    </div>
  );
}

function PromptSelect({
  label,
  value,
  options,
  onChange,
  testId,
  className,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  testId: string;
  className?: string;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selected = options.find((item) => item.value === value) ?? options[0];
  const selectedLabel = selected?.label ?? value;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative grid gap-1.5", className)}>
      <span className="text-[10px] font-bold tracking-[0.08em] text-[rgba(203,201,210,0.78)] uppercase">
        {label}
      </span>

      {/* Native select kept for Playwright + form parity; visually replaced by the custom trigger. */}
      <select
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        value={value}
        data-testid={testId}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "group relative flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-[14px] border px-3.5 text-left text-[13px] font-semibold transition-[border-color,background-color,box-shadow,transform] duration-200",
          open
            ? "border-[rgba(139,108,255,0.55)] bg-[rgba(29,29,41,0.98)] shadow-[0_0_0_3px_rgba(139,108,255,0.18),0_14px_34px_rgba(0,0,0,0.28)]"
            : "border-[var(--line)] bg-[linear-gradient(180deg,rgba(35,35,48,0.95),rgba(24,24,34,0.98))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-[var(--line-strong)] hover:bg-[rgba(35,35,48,0.98)]",
        )}
      >
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)]"
          aria-hidden
        />
        <span className="min-w-0 truncate text-[var(--text)]">{selectedLabel}</span>
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.03)] text-[var(--muted)] transition-transform duration-200",
            open && "rotate-180 border-[rgba(139,108,255,0.35)] text-[var(--violet)]",
          )}
          aria-hidden
        >
          <ChevronIcon />
        </span>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className="scroll-panel absolute top-[calc(100%+6px)] right-0 left-0 z-30 m-0 max-h-[240px] list-none overflow-auto rounded-[14px] border border-[var(--line-strong)] bg-[rgba(18,18,26,0.98)] p-1.5 shadow-[0_22px_50px_rgba(0,0,0,0.45),0_0_0_1px_rgba(139,108,255,0.08)] backdrop-blur-md"
        >
          {options.map((item) => {
            const active = item.value === value;
            return (
              <li key={item.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-3 rounded-[10px] px-3 py-2.5 text-left text-[13px] transition-colors duration-150",
                    active
                      ? "bg-[rgba(139,108,255,0.16)] font-semibold text-[var(--text)]"
                      : "font-medium text-[#d8d5df] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--text)]",
                  )}
                >
                  <span className="min-w-0 truncate">{item.label}</span>
                  {active ? (
                    <span className="text-[var(--violet)]" aria-hidden>
                      <CheckIcon />
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M4.5 10.5 8.2 14.2 15.5 6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-3 py-1 text-[13px]">
      <span>{label}</span>
      <label className="relative h-6 w-[42px] shrink-0">
        <input
          type="checkbox"
          className="h-0 w-0 opacity-0"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span
          className={`absolute inset-0 cursor-pointer rounded-[var(--pill)] border border-[var(--line)] transition ${
            checked ? "bg-[var(--violet)]" : "bg-[#373644]"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-[18px] w-[18px] rounded-full transition ${
              checked ? "translate-x-[18px] bg-[#14101d]" : "bg-[#d1ced8]"
            }`}
          />
        </span>
      </label>
    </div>
  );
}

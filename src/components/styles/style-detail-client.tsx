"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CompareSlider } from "@/components/compare-slider";
import { StyleCard } from "@/components/style-card";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/components/providers/library-provider";
import { useToast } from "@/components/providers/toast-provider";
import { useUiModals } from "@/components/providers/ui-modal-provider";
import { track } from "@/lib/analytics";
import {
  assemblePrompt,
  backgroundOptions,
  defaultsForStyle,
  moodOptions,
  previewPrompt,
  ratioOptions,
  type PromptOptions,
} from "@/lib/catalog/prompts";
import { getStyleProfile, type CatalogStyle } from "@/lib/catalog/styles";

const fieldControlClass =
  "w-full rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] px-[11px] py-2.5 text-[var(--text)]";

type Props = { style: CatalogStyle; relatedStyles: CatalogStyle[] };

export function StyleDetailClient({ style, relatedStyles }: Props) {
  const profile = getStyleProfile(style);
  const related = relatedStyles;
  const { signedIn, isSaved, toggleSave, setPendingAction } = useLibrary();
  const { toast } = useToast();
  const { openSignIn, openSaveResult, openExternalInfo } = useUiModals();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [options, setOptions] = useState<PromptOptions>(() => defaultsForStyle(style));
  const [optionsStyleId, setOptionsStyleId] = useState(style.id);
  if (style.id !== optionsStyleId) {
    setOptionsStyleId(style.id);
    setOptions(defaultsForStyle(style));
  }
  const assembled = useMemo(() => assemblePrompt(style, options), [style, options]);
  const prompt = assembled.ok ? assembled.prompt : previewPrompt(style, options);
  const saved = isSaved(style.id);

  useEffect(() => {
    track("style_view", { style_id: style.id, category: style.category });
  }, [style.id, style.category]);

  useEffect(() => {
    if (searchParams.get("saveResult") === "1" && signedIn) {
      openSaveResult(style.id);
      router.replace(`/styles/${style.id}`);
    }
  }, [searchParams, signedIn, style.id, openSaveResult, router]);

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
      <section className="container pt-7">
        <div className="mb-5 flex items-center justify-between gap-4">
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
          <div className="flex gap-2">
            <Button variant="secondary" data-testid="detail-save-style" onClick={onSave}>
              {saved ? "♥ Saved" : "♡ Save style"}
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                await navigator.clipboard?.writeText(window.location.href);
                toast(`AI Prompt Grid: ${style.title} link copied.`);
              }}
            >
              ↗ Share
            </Button>
          </div>
        </div>
        <div className="h-[min(68dvh,720px)] min-h-[420px] overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)] md:min-h-[480px]">
          <CompareSlider
            source={style.source}
            result={style.result}
            title={style.title}
            styleId={style.id}
            large
            showModeToggle
            defaultMode="side"
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
          <h1 className="m-0 mb-4 text-[clamp(40px,4.8vw,67px)] leading-none tracking-[-0.05em]">
            {style.title}
          </h1>
          <p className="m-0 max-w-[690px] text-[19px] text-[#c2c0ca]">{profile.description}</p>
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
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              {profile.changes.map((item) => (
                <div
                  key={item}
                  className="flex min-h-[90px] items-end rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-3.5 text-[13px] font-bold"
                >
                  {item}
                </div>
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

        <aside className="rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-[23px] shadow-[0_18px_55px_rgba(0,0,0,0.2)] lg:sticky lg:top-[calc(var(--header)+18px)]">
          <h2 className="m-0 mb-1 text-[23px] tracking-[-0.025em]">Customize this prompt</h2>
          <p className="mb-[22px] text-[13px] text-[var(--muted)]">
            Adjust the details, then copy the prompt to {style.promptVariant.tool}.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Color mood">
              <select
                value={options.mood}
                onChange={(e) =>
                  setOptions((o) => ({ ...o, mood: e.target.value as PromptOptions["mood"] }))
                }
                className={fieldControlClass}
                data-testid="mood-select"
              >
                {moodOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field label="Background">
              <select
                value={options.background}
                onChange={(e) =>
                  setOptions((o) => ({
                    ...o,
                    background: e.target.value as PromptOptions["background"],
                  }))
                }
                className={fieldControlClass}
                data-testid="background-select"
              >
                {backgroundOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field label="Output ratio" className="col-span-2">
              <select
                value={options.ratio}
                onChange={(e) =>
                  setOptions((o) => ({
                    ...o,
                    ratio: e.target.value as PromptOptions["ratio"],
                  }))
                }
                className={fieldControlClass}
                data-testid="ratio-select"
              >
                {ratioOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
          </div>

          <Toggle
            label="Keep clothing from original photo"
            checked={options.keepClothing}
            onChange={(checked) => setOptions((o) => ({ ...o, keepClothing: checked }))}
          />
          <Toggle
            label="Keep original pose"
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

          <div className="grid grid-cols-2 gap-2">
            <Button
              className="col-span-2"
              data-testid="copy-prompt"
              onClick={onCopy}
              disabled={!assembled.ok}
            >
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
              className="col-span-2 inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--line)] px-[18px] text-sm font-bold text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-[var(--text)]"
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

      <section className="container py-16">
        <h2 className="mb-7 text-[clamp(28px,3vw,42px)] tracking-[-0.035em]">More examples</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {style.examplePairs.map((example, index) => (
            <div
              key={`${style.id}-example-${index}`}
              className="grid h-[280px] grid-cols-2 gap-0.5 overflow-hidden rounded-[var(--radius)] border border-[var(--line)]"
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

      <section className="container py-[88px]">
        <div className="mb-7 flex items-end justify-between gap-5">
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

      <section className="container mb-[90px] grid items-center gap-5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-8 md:grid-cols-[auto_1fr]">
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

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`grid gap-1.5 text-[11px] font-bold text-[#cbc9d2] ${className ?? ""}`}>
      {label}
      {children}
    </label>
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

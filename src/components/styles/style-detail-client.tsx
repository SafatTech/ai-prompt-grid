"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Suspense,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { CompareSlider } from "@/components/compare-slider";
import { CopyIcon } from "@/components/icons";
import { MergeBeforeAfter, resultPresentation } from "@/components/merge-before-after";
import { useLibrary } from "@/components/providers/library-provider";
import { useToast } from "@/components/providers/toast-provider";
import { useUiModals } from "@/components/providers/ui-modal-provider";
import { StyleChangeBento } from "@/components/styles/style-change-bento";
import { StyleSaveResultQuery } from "@/components/styles/style-save-result-query";
import { Button } from "@/components/ui/button";
import {
  mergeInputPhotos,
  mergeResultImage,
  mergeResultSize,
  usesMergeHero,
  usesMergeStack,
} from "@/lib/catalog/merge-inputs";
import { focusObjectPosition } from "@/lib/catalog/image-focus";
import { track } from "@/lib/analytics";
import {
  assemblePromptCore,
  defaultsForStyleCore,
  preserveToggleLabels,
  previewPromptCore,
  RATIO_OPTIONS,
  type PromptOptions,
} from "@/lib/catalog/prompt-core";
import { labeledOptionsForStyle } from "@/lib/catalog/prompt-option-presets";
import { getStyleProfile } from "@/lib/catalog/style-profile";
import {
  styleDisplayTitle,
  styleHasUniqueContentSections,
  styleSeoOverride,
} from "@/lib/catalog/style-meta";
import type { CatalogStyle } from "@/lib/catalog/types";
import { recordRecentView } from "@/lib/recent/views";
import { cn } from "@/lib/utils";

type ShareModalProps = {
  url: string;
  title: string;
  styleId: string;
  onClose: () => void;
};

type StyleBestForProps = {
  readonly occasions: string;
  readonly worksWith: string;
};

type Props = {
  style: CatalogStyle;
  children?: ReactNode;
  /** Curated Best for / Works with from style-best-for-data (unique occasions). */
  bestFor?: StyleBestForProps;
};

export function StyleDetailClient({ style, children, bestFor }: Props) {
  const profile = getStyleProfile(style);
  const seo = styleSeoOverride(style.id);
  const displayTitle = styleDisplayTitle(style);
  const uniqueSections = styleHasUniqueContentSections(seo);
  const introParagraphs = seo?.intro
    ? seo.intro
        .split(/\n\s*\n/)
        .map((part) => part.trim())
        .filter(Boolean)
    : [];
  const { signedIn, isSaved, toggleSave, setPendingAction } = useLibrary();
  const { toast } = useToast();
  const { openSignIn, openSaveResult, openExternalInfo } = useUiModals();
  const [options, setOptions] = useState<PromptOptions>(() => defaultsForStyleCore(style));
  const [optionsStyleId, setOptionsStyleId] = useState(style.id);
  const [compareDefault, setCompareDefault] = useState<"slider" | "side">("slider");
  const [showStickyCopy, setShowStickyCopy] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [ShareModal, setShareModal] = useState<ComponentType<ShareModalProps> | null>(
    null,
  );
  if (style.id !== optionsStyleId) {
    setOptionsStyleId(style.id);
    setOptions(defaultsForStyleCore(style));
  }
  const assembled = useMemo(() => assemblePromptCore(style, options), [style, options]);
  const resultSize = mergeResultSize(style);
  const resultFit = resultPresentation(resultSize.width, resultSize.height);
  const prompt = assembled.ok ? assembled.prompt : previewPromptCore(style, options);
  const moodSelectOptions = useMemo(() => labeledOptionsForStyle(style, "mood"), [style]);
  const backgroundSelectOptions = useMemo(
    () => labeledOptionsForStyle(style, "background"),
    [style],
  );
  const saved = isSaved(style.id);

  useEffect(() => {
    track("style_view", { style_id: style.id, category: style.category });
    recordRecentView({
      slug: style.id,
      title: style.title,
      result: style.result,
    });
  }, [style.id, style.category, style.title, style.result]);

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

  async function copyText(value: string): Promise<boolean> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const area = document.createElement("textarea");
        area.value = value;
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
      return true;
    } catch {
      return false;
    }
  }

  async function onCopy() {
    const result = assemblePromptCore(style, options);
    if (!result.ok) {
      toast(result.errors[0] ?? "Prompt is incomplete and cannot be copied.", "error");
      return;
    }
    const ok = await copyText(result.prompt);
    if (!ok) {
      toast("Could not copy automatically. Select the prompt text manually.", "error");
      return;
    }
    track("prompt_copy", {
      style_id: style.id,
      variant_id: style.promptVariant.id,
      tool: result.tool,
    });
    toast("Prompt copied. Open your AI image editor and upload your photo there.");
  }

  async function onCopyAddon() {
    const line = seo?.addonLine?.trim();
    if (!line) return;
    const ok = await copyText(line);
    if (!ok) {
      toast("Could not copy automatically. Select the add-on text manually.", "error");
      return;
    }
    track("prompt_copy", {
      style_id: style.id,
      variant_id: style.promptVariant.id,
      tool: style.promptVariant.tool,
      addon: true,
    });
    toast("Optional add-on copied. Paste it after your main prompt.");
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
              <Link
                href="/explore"
                className="style-breadcrumb-link relative inline-flex items-center hover:text-[var(--text)] after:absolute after:inset-[-14px_-8px]"
              >
                Explore
              </Link>
              {" / "}
              <Link
                href={`/explore?category=${encodeURIComponent(style.category)}`}
                className="style-breadcrumb-link relative inline-flex items-center hover:text-[var(--text)] after:absolute after:inset-[-14px_-8px]"
              >
                {style.category}
              </Link>
              {" / "}
              {style.title}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
            <Button
              variant="secondary"
              className="gap-2.5"
              data-testid="detail-save-style"
              onClick={onSave}
            >
              <span aria-hidden="true">{saved ? "♥" : "♡"}</span>
              <span>{saved ? "Saved" : "Save style"}</span>
            </Button>
            <Button
              variant="ghost"
              className="gap-2.5"
              onClick={() => {
                void import("@/components/modals/share-modal").then((mod) => {
                  setShareModal(() => mod.ShareModal);
                  setShareOpen(true);
                });
              }}
            >
              <span aria-hidden="true">↗</span>
              <span>Share</span>
            </Button>
          </div>
        </div>
        {usesMergeHero(style) ? (
          <div className="mba-hero-panel relative isolate overflow-hidden rounded-[22px] border border-[var(--line)] shadow-[var(--shadow)]">
            <MergeBeforeAfter
              variant="hero"
              priority
              title={style.title}
              inputs={mergeInputPhotos(style)}
              result={mergeResultImage(style)}
            />
          </div>
        ) : (
          <div className="h-[min(52dvh,560px)] min-h-[280px] overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)] md:min-h-[360px] lg:h-[min(68dvh,720px)] lg:min-h-[480px]">
            <CompareSlider
              key={compareDefault}
              source={style.source}
              result={style.result}
              title={style.title}
              styleId={style.id}
              altSource={style.examplePairs[0]?.altSource}
              altResult={style.examplePairs[0]?.altResult}
              sourceFocus={
                style.sourceFocus ?? style.examplePairs[0]?.sourceFocus ?? null
              }
              resultFocus={
                style.resultFocus ?? style.examplePairs[0]?.resultFocus ?? null
              }
              large
              priority
              showModeToggle
              defaultMode={compareDefault}
            />
          </div>
        )}
        {style.promptVariant.limitations.some((item) => /AI-generated/i.test(item)) ? (
          <p className="mt-2.5 text-xs text-[var(--muted)]" data-testid="ai-image-disclosure">
            Example images are AI-generated. The people shown are not real.
          </p>
        ) : null}
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
          <h1 className="m-0 mb-5 text-[clamp(32px,6vw,67px)] leading-none tracking-[-0.05em]">
            {displayTitle}
          </h1>
          {/* Uniqueness pages keep the catalog description at the top (like master).
              Legacy GSC thin pages still replace description with their long intro. */}
          {!uniqueSections && introParagraphs.length > 0 ? (
            <div
              className="max-w-[690px] space-y-4 text-[15px] leading-[1.7] text-[#b4b1bc] sm:text-[17px]"
              data-testid="style-seo-intro"
            >
              {introParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="m-0">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="m-0 max-w-[690px] text-[15px] leading-[1.7] text-[#b4b1bc] sm:text-[17px]">
              {profile.description}
            </p>
          )}
          {bestFor ? (
            <div
              className="mt-6 flex max-w-[690px] flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-6 sm:gap-y-2"
              data-testid="style-best-for"
            >
              <p className="m-0 flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                <span className="shrink-0 text-[10px] font-semibold tracking-[0.12em] text-[rgba(199,197,207,0.48)] uppercase">
                  Best for
                </span>
                <span className="text-[13px] leading-snug text-[#c9c6d0]">
                  {bestFor.occasions}
                </span>
              </p>
              <p className="m-0 flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                <span className="shrink-0 text-[10px] font-semibold tracking-[0.12em] text-[rgba(199,197,207,0.48)] uppercase">
                  Works with
                </span>
                <span className="text-[13px] leading-snug text-[#c9c6d0]">
                  {bestFor.worksWith}
                </span>
              </p>
            </div>
          ) : null}
          {!uniqueSections && seo?.tips && seo.tips.length > 0 ? (
            <section className="mt-6 max-w-[690px]" data-testid="style-seo-tips">
              <h2 className="mb-3 text-[22px]">Tips for this look</h2>
              <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-[#d2cfd7] sm:text-[15px]">
                {seo.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {seo?.guideLinks && seo.guideLinks.length > 0 ? (
            <p className="mt-4 max-w-[690px] text-sm text-[var(--muted)]">
              Related guides:{" "}
              {seo.guideLinks.map((link, index) => (
                <span key={link.href}>
                  {index > 0 ? " · " : null}
                  <Link href={link.href} className="font-bold text-[#bbaeff]">
                    {link.label}
                  </Link>
                </span>
              ))}
              .
            </p>
          ) : null}
          {style.id === "combine-two-photos-80s-couple" ||
          style.id === "separate-photos-couple" ? (
            <p className="mt-3 max-w-[690px] text-sm text-[var(--muted)]">
              <Link href="/guides/how-to-merge-two-photos-in-gemini" className="font-bold text-[#bbaeff]">
                How to merge two photos in Gemini
              </Link>{" "}
              is the guide for couple, family, and pet merges. This page keeps its own look.
            </p>
          ) : null}
          <p className="mt-4 flex max-w-[690px] flex-wrap items-center gap-x-2 gap-y-1 text-[11px] leading-relaxed text-[rgba(199,197,207,0.5)] sm:text-[12px]">
            {/* When Best for includes Works with, skip repeating Target photo. */}
            {!bestFor ? (
              <>
                <span>Target photo: {style.targetSourcePhoto}</span>
                <span aria-hidden>·</span>
              </>
            ) : null}
            <span>
              Inputs: {style.promptVariant.inputImageRoles.join(" → ")} (
              {style.promptVariant.inputImageCount})
            </span>
            {style.promptVariant.lastVerified ? (
              <>
                <span aria-hidden>·</span>
                <span>Verified {style.promptVariant.lastVerified}</span>
              </>
            ) : null}
            <span aria-hidden>·</span>
            <span>Prompt v{style.promptVariant.version}</span>
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
            <StyleChangeBento
              styleId={style.id}
              styleTitle={displayTitle}
              labels={profile.changes}
              prompt={prompt}
              onCopyPrompt={async () => {
                const result = assemblePromptCore(style, options);
                if (!result.ok) {
                  return {
                    ok: false,
                    notice:
                      result.errors[0] ??
                      "Prompt is incomplete and cannot be copied.",
                  };
                }
                const ok = await copyText(result.prompt);
                if (!ok) {
                  return {
                    ok: false,
                    notice:
                      "Could not copy automatically. Select the prompt text manually.",
                  };
                }
                track("prompt_copy", {
                  style_id: style.id,
                  variant_id: style.promptVariant.id,
                  tool: result.tool,
                });
                return {
                  ok: true,
                  notice:
                    "Prompt copied. Open your AI image editor and upload your photo there.",
                };
              }}
              onCopyTrigger={async (phrase) => {
                const ok = await copyText(phrase);
                return ok
                  ? { ok: true, notice: "Phrase copied." }
                  : {
                      ok: false,
                      notice:
                        "Could not copy automatically. Select the phrase manually.",
                    };
              }}
            />
          </section>

          <section className="border-t border-[var(--line)] py-7">
            <h2 className="mb-4 text-[22px]">What should stay recognizable</h2>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {profile.stays.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </div>
            <div className="mt-[22px] rounded-[14px] border border-[rgba(255,155,130,0.23)] bg-[rgba(255,155,130,0.07)] p-[17px] text-[13px] text-[#e6c7c0]">
              AI tools can still change small details. Review the final result before
              using it professionally.
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

          {uniqueSections ? (
            <div data-testid="style-unique-sections">
              {introParagraphs.length > 0 ? (
                <section className="border-t border-[var(--line)] py-7">
                  <p
                    className="m-0 max-w-[690px] text-sm text-[#d2cfd7]"
                    data-testid="style-seo-intro"
                  >
                    {introParagraphs.join(" ")}
                  </p>
                </section>
              ) : null}

              {seo?.tips && seo.tips.length > 0 ? (
                <section
                  className="border-t border-[var(--line)] py-7"
                  data-testid="style-seo-tips"
                >
                  <h2 className="mb-4 text-[22px]">Tips for this look</h2>
                  <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-[#d2cfd7]">
                    {seo.tips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {seo?.addonLine ? (
                <section
                  className="border-t border-[var(--line)] py-7"
                  data-testid="style-addon-card"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="m-0 text-[22px]">Optional add-on</h2>
                    <button
                      type="button"
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--line)] bg-transparent px-2.5 py-1.5 text-xs font-bold text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-[var(--text)]"
                      data-testid="copy-addon-line"
                      onClick={onCopyAddon}
                    >
                      <CopyIcon />
                      Copy
                    </button>
                  </div>
                  <p className="m-0 max-w-[690px] text-sm text-[#d2cfd7]">{seo.addonLine}</p>
                </section>
              ) : null}

              {seo?.faqs && seo.faqs.length > 0 ? (
                <section
                  className="border-t border-[var(--line)] py-7"
                  data-testid="style-seo-faqs"
                >
                  <h2 className="mb-4 text-[22px]">FAQs</h2>
                  <div className="max-w-[690px] border-t border-[var(--line)]">
                    {seo.faqs.map((faq) => (
                      <details
                        key={faq.question}
                        className="group border-b border-[var(--line)]"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3.5 text-sm font-medium text-[#d2cfd7] marker:content-none [&::-webkit-details-marker]:hidden">
                          <span>{faq.question}</span>
                          <span
                            className="grid h-5 w-5 shrink-0 place-items-center text-base leading-none text-[var(--muted)] transition-transform duration-200 ease-out group-open:rotate-45"
                            aria-hidden
                          >
                            +
                          </span>
                        </summary>
                        <p className="m-0 origin-top pb-4 text-sm leading-relaxed text-[#d2cfd7] motion-safe:animate-[faq-answer-in_180ms_ease-out]">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          ) : null}
        </article>

        <aside
          id="customize-prompt"
          className="rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-[23px] shadow-[0_18px_55px_rgba(0,0,0,0.2)] lg:sticky lg:top-[calc(var(--header)+18px)]"
        >
          <h2 className="m-0 mb-1 text-[23px] tracking-[-0.025em]">
            Customize this prompt
          </h2>
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
              options={RATIO_OPTIONS.map((item) => ({ value: item, label: item }))}
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
              <span className="text-[var(--danger)]">{assembled.errors.join(" ")}</span>
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
                Upload{" "}
                {style.promptVariant.inputImageCount >= 2
                  ? Array.from(
                      { length: style.promptVariant.inputImageCount },
                      (_, index) => `Photo ${index + 1}`,
                    ).join(", then ")
                  : style.promptVariant.inputImageRoles.join(", then ")}
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

      {(() => {
        const extraExamples = style.examplePairs.filter(
          (example) =>
            !(example.source === style.source && example.result === style.result),
        );
        if (extraExamples.length === 0) return null;
        return (
          <section className="container py-12 sm:py-16">
            <h2 className="mb-7 text-[clamp(28px,3vw,42px)] tracking-[-0.035em]">
              More examples
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {extraExamples.map((example, index) => (
                <div
                  key={`${style.id}-example-${index}`}
                  className="grid h-[220px] grid-cols-2 gap-0.5 overflow-hidden rounded-[var(--radius)] border border-[var(--line)] md:h-[260px] lg:h-[280px]"
                >
                  <div className="relative">
                    <Image
                      src={example.source}
                      alt={example.altSource}
                      fill
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 220px"
                      className="object-cover"
                      style={{
                        objectPosition: focusObjectPosition(example.sourceFocus),
                      }}
                      loading="lazy"
                    />
                    <span className="absolute bottom-3 left-3 rounded-lg bg-[rgba(11,11,16,0.72)] px-2 py-1 text-[10px] font-extrabold">
                      {usesMergeStack(style) ? `Photo ${index + 1}` : "Source photo"}
                    </span>
                  </div>
                  <div className={cn("relative", resultFit.contain && "bg-[#f5f3ee]")}>
                    <Image
                      src={example.result}
                      alt={example.altResult}
                      fill
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 220px"
                      className={resultFit.contain ? "object-contain" : "object-cover"}
                      style={
                        resultFit.contain
                          ? undefined
                          : {
                              objectPosition: focusObjectPosition(
                                example.resultFocus,
                              ),
                            }
                      }
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
        );
      })()}

      {children}

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

      {shareOpen && ShareModal ? (
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
      <span id={`toggle-label-${label.replace(/\s+/g, "-").toLowerCase()}`}>{label}</span>
      <label className="relative h-11 w-11 shrink-0 cursor-pointer">
        <input
          type="checkbox"
          className="h-0 w-0 opacity-0"
          checked={checked}
          aria-label={label}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span
          className={`absolute top-1/2 left-1/2 h-6 w-[42px] -translate-x-1/2 -translate-y-1/2 rounded-[var(--pill)] border border-[var(--line)] transition ${
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

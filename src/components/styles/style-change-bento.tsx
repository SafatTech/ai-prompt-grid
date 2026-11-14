"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { getStyleChangeCategory } from "@/lib/catalog/style-change-categories";
import type { StyleChangeDetail } from "@/lib/catalog/style-change-detail-types";
import { resolveStyleChangeDetails } from "@/lib/catalog/style-change-resolve";
import { cn } from "@/lib/utils";
import { StyleChangeBanner } from "./style-change-banners";
import { CardInspectBadge, StyleChangeCategoryIcon } from "./style-change-icons";

/** Result of a silent copy from the detail modal (no global toast). */
export type StyleChangeModalCopyResult = {
  ok: boolean;
  /** Short notice for the in-modal confirmation strip. */
  notice: string;
};

type Props = {
  styleId: string;
  styleTitle: string;
  labels: readonly string[];
  prompt: string;
  onCopyPrompt: () => Promise<StyleChangeModalCopyResult>;
  onCopyTrigger?: (phrase: string) => Promise<StyleChangeModalCopyResult>;
};

export function StyleChangeBento({
  styleId,
  styleTitle,
  labels,
  prompt,
  onCopyPrompt,
  onCopyTrigger,
}: Props) {
  const details = resolveStyleChangeDetails({
    styleId,
    styleTitle,
    labels,
  });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lastFocusedCard = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const bannerUid = useId().replace(/:/g, "");

  const openAt = (index: number, cardEl: HTMLElement | null) => {
    lastFocusedCard.current = cardEl;
    setActiveIndex(index);
  };

  const close = () => {
    setActiveIndex(null);
  };

  const navigate = (delta: number) => {
    if (activeIndex === null || details.length === 0) return;
    const next = (activeIndex + delta + details.length) % details.length;
    setActiveIndex(next);
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveIndex(null);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) => {
          if (current === null || details.length === 0) return current;
          return (current + 1) % details.length;
        });
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((current) => {
          if (current === null || details.length === 0) return current;
          return (current - 1 + details.length) % details.length;
        });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      lastFocusedCard.current?.focus();
    };
  }, [activeIndex, details.length]);

  const active = activeIndex !== null ? details[activeIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {details.map((item, index) => (
          <ChangeCard
            key={`${item.label}-${index}`}
            item={item}
            index={index}
            onOpen={openAt}
          />
        ))}
      </div>

      {active && activeIndex !== null ? (
        <EffectDetailModal
          item={active}
          index={activeIndex}
          total={details.length}
          uid={bannerUid}
          closeBtnRef={closeBtnRef}
          prompt={prompt}
          onClose={close}
          onNavigate={navigate}
          onCopyPrompt={onCopyPrompt}
          onCopyTrigger={onCopyTrigger}
        />
      ) : null}
    </>
  );
}

function ChangeCard({
  item,
  index,
  onOpen,
}: {
  item: StyleChangeDetail;
  index: number;
  onOpen: (index: number, el: HTMLElement | null) => void;
}) {
  const accent = getStyleChangeCategory(item.category).accent;
  const cardRef = useRef<HTMLElement>(null);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(index, cardRef.current);
    }
  };

  return (
    <article
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`Inspect ${item.label} effect`}
      onClick={() => onOpen(index, cardRef.current)}
      onKeyDown={handleKeyDown}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-[#13131A] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div
        className={cn(
          "pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full blur-2xl transition-opacity group-hover:opacity-100",
          accent.glow,
        )}
        aria-hidden
      />
      <div className="relative flex items-center justify-between gap-2">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
            accent.iconBorder,
            accent.iconBg,
            accent.iconText,
          )}
        >
          <StyleChangeCategoryIcon category={item.category} />
        </div>
        <CardInspectBadge />
      </div>
      <h3 className="mt-3.5 text-[13.5px] font-semibold text-white transition-colors group-hover:text-violet-200">
        {item.label}
      </h3>
      <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
        {item.shortDescription}
      </p>
    </article>
  );
}

function EffectDetailModal({
  item,
  index,
  total,
  uid,
  closeBtnRef,
  prompt,
  onClose,
  onNavigate,
  onCopyPrompt,
  onCopyTrigger,
}: {
  item: StyleChangeDetail;
  index: number;
  total: number;
  uid: string;
  closeBtnRef: React.RefObject<HTMLButtonElement | null>;
  prompt: string;
  onClose: () => void;
  onNavigate: (delta: number) => void;
  onCopyPrompt: () => Promise<StyleChangeModalCopyResult>;
  onCopyTrigger?: (phrase: string) => Promise<StyleChangeModalCopyResult>;
}) {
  /** Stamp feedback with the effect index so navigating clears it without remount. */
  const [feedback, setFeedback] = useState<{
    at: number;
    phraseCopied: boolean;
    promptCopied: boolean;
    notice: { message: string; tone: "success" | "error" } | null;
  }>({ at: -1, phraseCopied: false, promptCopied: false, notice: null });
  const phraseTimer = useRef<number | null>(null);
  const promptTimer = useRef<number | null>(null);
  const noticeTimer = useRef<number | null>(null);
  const indexRef = useRef(index);

  const phraseCopied = feedback.at === index && feedback.phraseCopied;
  const promptCopied = feedback.at === index && feedback.promptCopied;
  const footerNotice = feedback.at === index ? feedback.notice : null;

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    return () => {
      if (phraseTimer.current) window.clearTimeout(phraseTimer.current);
      if (promptTimer.current) window.clearTimeout(promptTimer.current);
      if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    };
  }, []);

  const showFooterNotice = (
    at: number,
    message: string,
    tone: "success" | "error",
  ) => {
    setFeedback((prev) => ({
      ...prev,
      at,
      notice: { message, tone },
    }));
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => {
      if (indexRef.current !== at) return;
      setFeedback((prev) =>
        prev.at === at ? { ...prev, notice: null } : prev,
      );
    }, 2800);
  };

  const copyTrigger = async () => {
    const at = index;
    let result: StyleChangeModalCopyResult;
    if (onCopyTrigger) {
      result = await onCopyTrigger(item.trigger);
    } else {
      try {
        await navigator.clipboard?.writeText(item.trigger);
        result = { ok: true, notice: "Phrase copied." };
      } catch {
        result = {
          ok: false,
          notice: "Could not copy automatically. Select the phrase manually.",
        };
      }
    }

    if (indexRef.current !== at) return;

    if (result.ok) {
      setFeedback((prev) => ({
        ...prev,
        at,
        phraseCopied: true,
      }));
      if (phraseTimer.current) window.clearTimeout(phraseTimer.current);
      phraseTimer.current = window.setTimeout(() => {
        if (indexRef.current !== at) return;
        setFeedback((prev) =>
          prev.at === at ? { ...prev, phraseCopied: false } : prev,
        );
      }, 1600);
      showFooterNotice(at, result.notice, "success");
    } else {
      showFooterNotice(at, result.notice, "error");
    }
  };

  const copyPrompt = async () => {
    const at = index;
    const result = await onCopyPrompt();
    if (indexRef.current !== at) return;

    if (result.ok) {
      setFeedback((prev) => ({
        ...prev,
        at,
        promptCopied: true,
      }));
      if (promptTimer.current) window.clearTimeout(promptTimer.current);
      promptTimer.current = window.setTimeout(() => {
        if (indexRef.current !== at) return;
        setFeedback((prev) =>
          prev.at === at ? { ...prev, promptCopied: false } : prev,
        );
      }, 1600);
      showFooterNotice(at, result.notice, "success");
    } else {
      showFooterNotice(at, result.notice, "error");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="style-change-modal-title"
      aria-describedby="style-change-modal-desc"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="style-change-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-[#050508]/75 p-4 backdrop-blur-[10px]"
    >
      <div className="style-change-modal-card relative max-h-[min(900px,calc(100dvh-2rem))] w-full max-w-[460px] overflow-y-auto overflow-x-hidden rounded-2xl border border-white/[0.12] bg-[#13131A] shadow-[0_28px_80px_rgba(0,0,0,0.85),0_0_0_1px_rgba(139,92,246,0.2)]">
        <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] bg-[#0E0E14]/90 px-4 py-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-violet-300 uppercase">
            {index + 1} / {total}
          </span>

          <div className="flex items-center gap-1.5">
            <div className="inline-flex items-center rounded-lg border border-white/[0.08] bg-[#191B24] p-0.5">
              <button
                type="button"
                onClick={() => onNavigate(-1)}
                aria-label="Previous effect"
                title="Previous effect (Left Arrow)"
                className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <span className="h-3.5 w-px bg-white/[0.08]" />
              <button
                type="button"
                onClick={() => onNavigate(1)}
                aria-label="Next effect"
                title="Next effect (Right Arrow)"
                className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close effect details"
              title="Close (Esc)"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-[#191B24] text-zinc-400 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative h-36 w-full overflow-hidden border-b border-white/[0.08] bg-[#08080D]">
          <StyleChangeBanner
            category={item.category}
            chip={item.chip}
            uid={`${uid}-${index}`}
          />
        </div>

        <div className="scm-body">
          <div>
            <span className="mb-1.5 inline-flex rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
              {item.category}
            </span>
            <h3
              id="style-change-modal-title"
              className="text-lg font-bold tracking-tight text-white"
            >
              {item.label}
            </h3>
            <p
              id="style-change-modal-desc"
              className="mt-1.5 text-[13px] leading-relaxed text-zinc-300"
            >
              {item.summary}
            </p>
          </div>

          <div className="scm-shift-box">
            <div className="scm-shift-head">
              <span className="font-mono text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                Visual Shift
              </span>
              <span className="font-mono text-[10px] text-teal-400">
                Identity Preserved
              </span>
            </div>
            <div className="scm-shift-pills">
              <span className="scm-shift-pill border border-white/[0.06] bg-white/[0.03] text-zinc-400 line-through decoration-zinc-500">
                {item.beforeLabel}
              </span>
              <svg
                className="h-3.5 w-3.5 shrink-0 self-center text-violet-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
              <span className="scm-shift-pill border border-violet-500/30 bg-violet-500/15 font-medium text-violet-200">
                {item.afterLabel}
              </span>
            </div>
          </div>

          <div className="scm-trigger-box">
            <div className="scm-trigger-head">
              <span className="font-mono text-[10px] font-semibold leading-none tracking-wider text-zinc-500 uppercase">
                Prompt Trigger
              </span>
              <button
                type="button"
                onClick={() => void copyTrigger()}
                className="scm-btn-mini"
                title="Copy just this effect phrase"
                aria-label={phraseCopied ? "Phrase copied" : "Copy phrase"}
              >
                {phraseCopied ? (
                  <svg
                    className="text-teal-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    aria-hidden
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    className="text-violet-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
                <span>{phraseCopied ? "Copied" : "Copy phrase"}</span>
              </button>
            </div>
            <p className="font-mono text-xs leading-relaxed text-violet-300">
              &ldquo;{item.trigger}&rdquo;
            </p>
          </div>
        </div>

        <div className="border-t border-white/[0.08] bg-[#0E0E14]/90 px-5 py-3.5">
          {footerNotice ? (
            <div
              role={footerNotice.tone === "error" ? "alert" : "status"}
              className={cn(
                "mb-2.5 rounded-xl border px-3 py-2 text-[12px] leading-snug backdrop-blur-md",
                footerNotice.tone === "error"
                  ? "border-[rgba(255,124,142,0.28)] bg-[rgba(48,22,28,0.88)] text-[#f0c4cb]"
                  : "border-[rgba(103,216,178,0.22)] bg-[rgba(18,32,30,0.92)] text-[#d7efe6]",
              )}
            >
              {footerNotice.message}
            </div>
          ) : null}
          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="scm-btn-footer scm-btn-footer--close"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => void copyPrompt()}
              disabled={!prompt}
              className="scm-btn-footer scm-btn-footer--copy"
              aria-label={promptCopied ? "Prompt copied" : "Copy prompt"}
            >
              {promptCopied ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  aria-hidden
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
              <span>{promptCopied ? "Copied" : "Copy prompt"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

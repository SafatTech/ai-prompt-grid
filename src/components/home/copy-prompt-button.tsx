"use client";

import { useRef, useState, type MouseEvent } from "react";
import { track } from "@/lib/analytics";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

type Props = {
  /** Style slug / id only — prompt is fetched on interaction to keep RSC slim. */
  styleId: string;
  className?: string;
  /** Dense catalog wall: icon-only control matching explore-v5 cards. */
  variant?: "label" | "icon";
};

type PromptPayload = {
  prompt: string;
  variantId?: string;
  tool?: string;
};

async function fetchPrompt(styleId: string): Promise<PromptPayload> {
  const res = await fetch(`/api/styles/${encodeURIComponent(styleId)}/prompt`);
  if (!res.ok) {
    throw new Error("prompt-fetch-failed");
  }
  const data = (await res.json()) as {
    prompt?: string;
    variantId?: string;
    tool?: string;
  };
  const prompt = data.prompt ?? "";
  if (!prompt) throw new Error("prompt-empty");
  return {
    prompt,
    variantId: data.variantId,
    tool: data.tool,
  };
}

async function writeTextFallback(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement("textarea");
  area.value = text;
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}

/**
 * N-29: Keep the clipboard write inside the tap gesture. ClipboardItem accepts a
 * Promise-backed Blob so Safari allows the async prompt fetch; writeText is the
 * fallback when ClipboardItem / clipboard.write is unavailable.
 */
export function CopyPromptButton({
  styleId,
  className,
  variant = "label",
}: Props) {
  const { toast } = useToast();
  const [copying, setCopying] = useState(false);
  const [done, setDone] = useState(false);
  const cacheRef = useRef<PromptPayload | null>(null);
  const inflightRef = useRef<Promise<PromptPayload> | null>(null);

  function ensurePrompt(): Promise<PromptPayload> {
    if (cacheRef.current) return Promise.resolve(cacheRef.current);
    if (inflightRef.current) return inflightRef.current;
    const request = fetchPrompt(styleId)
      .then((payload) => {
        cacheRef.current = payload;
        return payload;
      })
      .finally(() => {
        if (inflightRef.current === request) inflightRef.current = null;
      });
    inflightRef.current = request;
    return request;
  }

  function prefetch() {
    void ensurePrompt().catch(() => {
      /* prefetch is best-effort; tap path surfaces errors */
    });
  }

  function onCopy(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (copying) return;
    setCopying(true);

    const payloadPromise = ensurePrompt();
    const textPromise = payloadPromise.then((payload) => payload.prompt);

    // Must start clipboard.write in this synchronous turn (iOS Safari gesture).
    const writePromise =
      typeof ClipboardItem !== "undefined" && navigator.clipboard?.write
        ? navigator.clipboard.write([
            new ClipboardItem({
              "text/plain": textPromise.then(
                (text) => new Blob([text], { type: "text/plain" }),
              ),
            }),
          ])
        : textPromise.then((text) => writeTextFallback(text));

    void writePromise
      .then(async () => {
        const payload = await payloadPromise;
        track("prompt_copy", {
          style_id: styleId,
          variant_id: payload.variantId,
          tool: payload.tool,
        });
        track("copy_prompt", { style_id: styleId });
        toast("Prompt copied. Open your AI image editor and upload your photo there.");
        if (variant === "icon") {
          setDone(true);
          window.setTimeout(() => setDone(false), 900);
        }
      })
      .catch(() => {
        toast("Could not copy automatically. Select the prompt text manually.", "error");
      })
      .finally(() => {
        setCopying(false);
      });
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        className={cn("icon-btn copy-btn", done && "is-done", className)}
        aria-label="Copy prompt"
        aria-busy={copying || undefined}
        data-testid={`copy-prompt-${styleId}`}
        disabled={copying}
        onPointerEnter={prefetch}
        onTouchStart={prefetch}
        onFocus={prefetch}
        onClick={onCopy}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M4 16V6a2 2 0 0 1 2-2h10" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn("style-card-copy", className)}
      aria-label="Copy prompt"
      aria-busy={copying || undefined}
      data-testid={`copy-prompt-${styleId}`}
      disabled={copying}
      onPointerEnter={prefetch}
      onTouchStart={prefetch}
      onFocus={prefetch}
      onClick={onCopy}
    >
      {copying ? "Copying…" : "Copy prompt"}
    </button>
  );
}

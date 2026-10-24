"use client";

import { useRef, useState, type MouseEvent } from "react";
import { track } from "@/lib/analytics";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

type Props = {
  /** Style slug / id only — prompt is fetched on interaction to keep RSC slim. */
  styleId: string;
  className?: string;
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
export function CopyPromptButton({ styleId, className }: Props) {
  const { toast } = useToast();
  const [copying, setCopying] = useState(false);
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
      })
      .catch(() => {
        toast("Could not copy automatically. Select the prompt text manually.", "error");
      })
      .finally(() => {
        setCopying(false);
      });
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

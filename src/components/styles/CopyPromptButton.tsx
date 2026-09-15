"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type CopyPromptButtonProps = {
  prompt: string;
  styleId: string;
  className?: string;
  size?: "md" | "lg";
  /** Dark prompt atelier: solid teal CTA. */
  appearance?: "default" | "atelier";
};

export function CopyPromptButton({
  prompt,
  styleId,
  className,
  size = "lg",
  appearance = "default",
}: CopyPromptButtonProps) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleCopy() {
    if (busy) return;
    setBusy(true);
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);

      if (isSupabaseConfigured() && !styleId.startsWith("demo-")) {
        try {
          const supabase = createClient();
          void supabase.rpc("increment_style_copy_count", {
            style_id: styleId,
          });
        } catch {
          // Copy still succeeds offline / without RPC.
        }
      }

      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    } finally {
      setBusy(false);
    }
  }

  if (appearance === "atelier") {
    return (
      <div className={cn("shrink-0", className)}>
        <button
          type="button"
          onClick={handleCopy}
          disabled={busy}
          aria-label={copied ? "Prompt copied" : "Copy prompt"}
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold tracking-tight transition-all duration-300 sm:w-auto",
            "bg-accent text-accent-contrast shadow-[0_16px_36px_-12px_rgba(12,107,107,0.85)]",
            "hover:bg-accent-hover hover:shadow-[0_20px_44px_-12px_rgba(12,107,107,0.95)]",
            "active:scale-[0.98]",
            "disabled:pointer-events-none disabled:opacity-60",
            copied && "bg-accent-hover",
          )}
        >
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4 shrink-0"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="5.5"
              y="5.5"
              width="7"
              height="7"
              rx="1.25"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M3.5 10.5V4.25A1.75 1.75 0 0 1 5.25 2.5H10.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <span>{copied ? "Copied" : "Copy prompt"}</span>
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? "Prompt copied to clipboard" : ""}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("inline-flex flex-col items-stretch gap-1", className)}>
      <Button
        type="button"
        size={size}
        onClick={handleCopy}
        disabled={busy}
        aria-label={copied ? "Prompt copied" : "Copy prompt"}
      >
        {copied ? "Copied" : "Copy prompt"}
      </Button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Prompt copied to clipboard" : ""}
      </span>
    </div>
  );
}

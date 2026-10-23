"use client";

import type { MouseEvent } from "react";
import { track } from "@/lib/analytics";
import type { StyleCardData } from "@/lib/catalog/style-card-data";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

type Props = {
  /** Prefer id + title only — fetch the prompt on click to keep card RSC payloads slim. */
  style: Pick<StyleCardData, "id" | "title"> &
    Partial<Pick<StyleCardData, "copyPrompt" | "promptVariantId" | "promptTool">>;
  className?: string;
};

async function writeClipboard(text: string) {
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

export function CopyPromptButton({ style, className }: Props) {
  const { toast } = useToast();

  async function onCopy(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    try {
      let prompt = style.copyPrompt;
      let variantId = style.promptVariantId;
      let tool = style.promptTool;
      if (!prompt) {
        const res = await fetch(`/api/styles/${encodeURIComponent(style.id)}/prompt`);
        if (!res.ok) {
          toast("Prompt is incomplete and cannot be copied.", "error");
          return;
        }
        const data = (await res.json()) as {
          prompt?: string;
          variantId?: string;
          tool?: string;
        };
        prompt = data.prompt ?? "";
        variantId = data.variantId ?? variantId;
        tool = data.tool ?? tool;
      }
      if (!prompt) {
        toast("Prompt is incomplete and cannot be copied.", "error");
        return;
      }
      await writeClipboard(prompt);
      track("prompt_copy", {
        style_id: style.id,
        variant_id: variantId,
        tool,
      });
      track("copy_prompt", { style_id: style.id });
      toast("Prompt copied. Open your AI image editor and upload your photo there.");
    } catch {
      toast("Could not copy automatically. Select the prompt text manually.", "error");
    }
  }

  return (
    <button
      type="button"
      className={cn("style-card-copy", className)}
      aria-label={`Copy prompt for ${style.title}`}
      data-testid={`copy-prompt-${style.id}`}
      onClick={onCopy}
    >
      Copy prompt
    </button>
  );
}

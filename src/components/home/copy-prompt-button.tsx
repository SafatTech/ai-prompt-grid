"use client";

import type { MouseEvent } from "react";
import { track } from "@/lib/analytics";
import { assemblePrompt, defaultsForStyle } from "@/lib/catalog/prompts";
import type { CatalogStyle } from "@/lib/catalog/types";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

type Props = {
  style: CatalogStyle;
  className?: string;
};

export function CopyPromptButton({ style, className }: Props) {
  const { toast } = useToast();

  async function onCopy(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const result = assemblePrompt(style, defaultsForStyle(style));
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

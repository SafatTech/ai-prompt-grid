"use client";

import { useState } from "react";
import { CopyIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { copyText } from "@/lib/share";

export function CopyPromptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      type="button"
      variant="secondary"
      className="min-h-11 shrink-0 px-3 py-2 text-xs"
      aria-label={copied ? "Prompt copied" : "Copy prompt"}
      onClick={async () => {
        const ok = await copyText(text);
        if (!ok) return;
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }}
    >
      <CopyIcon className="h-4 w-4" />
      {copied ? "Copied" : "Copy prompt"}
    </Button>
  );
}

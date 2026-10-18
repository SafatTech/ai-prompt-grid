"use client";

import { useState } from "react";
import { copyText } from "@/lib/share";

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="relative inline-flex items-center rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-[var(--text)] transition-colors hover:bg-white/5 after:absolute after:inset-[-5px_-4px]"
      onClick={async () => {
        const ok = await copyText(url);
        if (!ok) return;
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }}
    >
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}

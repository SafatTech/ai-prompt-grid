"use client";

import { useState } from "react";
import { ModalShell } from "@/components/modals/modal-shell";
import { useToast } from "@/components/providers/toast-provider";
import { track } from "@/lib/analytics";
import {
  SHARE_PLATFORMS,
  copyText,
  openPlatformAppOrWeb,
  openShareWindow,
  pasteHint,
  shareIntentUrl,
  type SharePlatformId,
} from "@/lib/share";
import { cn } from "@/lib/utils";

type Props = {
  url: string;
  title: string;
  styleId: string;
  onClose: () => void;
};

export function ShareModal({ url, title, styleId, onClose }: Props) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  async function onCopyLink(source: "button" | SharePlatformId = "button") {
    const ok = await copyText(url);
    if (!ok) {
      toast("Could not copy the link. Select and copy it manually.", "error");
      return false;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
    track("style_share", {
      style_id: styleId,
      method: source === "button" ? "clipboard" : `copy_${source}`,
    });
    if (source === "button") {
      toast("Link copied.");
    } else {
      toast(pasteHint(source));
    }
    return true;
  }

  async function onShare(platform: SharePlatformId, mode: "intent" | "copy") {
    if (mode === "copy") {
      const ok = await onCopyLink(platform);
      if (ok) openPlatformAppOrWeb(platform);
      return;
    }

    const href = shareIntentUrl(platform, url, title);
    if (!href) {
      const ok = await onCopyLink(platform);
      if (ok) openPlatformAppOrWeb(platform);
      return;
    }

    openShareWindow(href);
    track("style_share", { style_id: styleId, method: platform });
  }

  return (
    <ModalShell label="Share" title="Share" onClose={onClose}>
      <div className="grid grid-cols-4 gap-x-2 gap-y-5 sm:gap-x-3 sm:gap-y-6">
        {SHARE_PLATFORMS.map((platform) => (
          <button
            key={platform.id}
            type="button"
            onClick={() => onShare(platform.id, platform.mode)}
            className="group flex cursor-pointer flex-col items-center gap-2 border-0 bg-transparent p-0 text-[var(--text)]"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[rgba(255,255,255,0.06)] transition group-hover:bg-[rgba(255,255,255,0.1)] sm:h-[60px] sm:w-[60px]">
              <ShareIcon id={platform.id} />
            </span>
            <span className="text-[11px] font-medium text-[#d8d6e0] sm:text-xs">
              {platform.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-7">
        <p className="m-0 mb-2.5 text-sm font-medium text-[var(--text)]">
          Copy page link
        </p>
        <div className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[rgba(12,12,18,0.9)] p-1.5 pl-3.5">
          <input
            readOnly
            value={url}
            aria-label="Page link"
            className="min-w-0 flex-1 truncate border-0 bg-transparent text-[13px] text-[#c9c7d1] outline-none"
            onFocus={(event) => event.currentTarget.select()}
          />
          <button
            type="button"
            aria-label={copied ? "Copied" : "Copy link"}
            onClick={() => onCopyLink("button")}
            className={cn(
              "grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-[10px] border border-[var(--line-strong)] bg-[rgba(255,255,255,0.04)] text-[var(--text)] transition hover:bg-[rgba(255,255,255,0.08)]",
              copied && "border-[rgba(103,216,178,0.45)] text-[var(--mint)]",
            )}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function ShareIcon({ id }: { id: SharePlatformId }) {
  switch (id) {
    case "instagram":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
          <defs>
            <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f58529" />
              <stop offset="45%" stopColor="#dd2a7b" />
              <stop offset="100%" stopColor="#8134af" />
            </linearGradient>
          </defs>
          <rect
            x="2.5"
            y="2.5"
            width="19"
            height="19"
            rx="5.5"
            fill="none"
            stroke="url(#ig)"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="12" r="4.2" fill="none" stroke="url(#ig)" strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1.15" fill="url(#ig)" />
        </svg>
      );
    case "twitter":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden fill="#fff">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.992 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      );
    case "facebook":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="10" fill="#1877F2" />
          <path
            fill="#fff"
            d="M13.5 19.5v-6.2h2.1l.3-2.5h-2.4V9.2c0-.7.2-1.2 1.2-1.2h1.3V5.7c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3v1.9H8.6v2.5h2.3v6.2h2.6z"
          />
        </svg>
      );
    case "tiktok":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#25F4EE"
            d="M16.6 5.8c.9 1 2.1 1.7 3.4 1.9V10c-1.2-.05-2.4-.4-3.4-1.1v5.4c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.3 0 .6 0 .9.1v2.7c-.3-.1-.6-.1-.9-.1-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3V2.5h2.7c0 1.1.4 2.2 1 3.3z"
            transform="translate(0.4 0.2)"
          />
          <path
            fill="#FE2C55"
            d="M15.9 5.2c.9 1 2.1 1.7 3.4 1.9V9.4c-1.2-.05-2.4-.4-3.4-1.1v5.4c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.3 0 .6 0 .9.1v2.7c-.3-.1-.6-.1-.9-.1-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3V1.9h2.7c0 1.1.4 2.2 1 3.3z"
          />
          <path
            fill="#fff"
            d="M15.6 5.5c.9 1 2.1 1.7 3.4 1.9V9.7c-1.2-.05-2.4-.4-3.4-1.1v5.4c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.3 0 .6 0 .9.1v2.7c-.3-.1-.6-.1-.9-.1-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3V2.2h2.7c0 1.1.4 2.2 1 3.3z"
          />
        </svg>
      );
    case "whatsapp":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#25D366"
            d="M12 2.04c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.45 3.38 1.25 4.81L2 22l5.4-1.41A9.86 9.86 0 0 0 12 21.84c5.46 0 9.9-4.44 9.9-9.9 0-5.46-4.44-9.9-9.9-9.9zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.2.84.86-3.12-.2-.32A8.18 8.18 0 1 1 12 20.14z"
          />
          <path
            fill="#25D366"
            d="M16.6 14.2c-.25-.12-1.46-.72-1.69-.8-.23-.09-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.17 1.75 2.67 4.24 3.74 1.49.64 2.07.7 2.81.59.43-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.14-1.17-.06-.11-.23-.17-.48-.29z"
          />
        </svg>
      );
    case "discord":
      return (
        <svg width="26" height="20" viewBox="0 0 71 55" aria-hidden fill="#5865F2">
          <path d="M60.1 4.9A58.5 58.5 0 0 0 45.4.2a.2.2 0 0 0-.2.1 40.8 40.8 0 0 0-1.8 3.7 54.1 54.1 0 0 0-16.2 0A37.4 37.4 0 0 0 25.4.3a.2.2 0 0 0-.2-.1A58.4 58.4 0 0 0 10.5 4.9a.2.2 0 0 0-.1.1C1.5 18.7-.9 32.2.3 45.5v.2a58.7 58.7 0 0 0 17.9 9.1h.1a.2.2 0 0 0 .2-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.8 38.8 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.9a.2.2 0 0 1 .2 0 41.9 41.9 0 0 0 35.6 0 .2.2 0 0 1 .2 0l1.1.9a.2.2 0 0 1 0 .4 36.4 36.4 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.2 47.2 0 0 0 3.6 5.9.2.2 0 0 0 .2.1 58.5 58.5 0 0 0 18-9.1v-.2c1.4-15.4-2.4-28.8-10.1-40.5a.2.2 0 0 0-.1-.1zM23.7 37.3c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2 6.5 3.3 6.4 7.2c0 4-2.9 7.2-6.4 7.2zm23.3 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2 6.5 3.3 6.4 7.2c0 4-2.9 7.2-6.4 7.2z" />
        </svg>
      );
    case "reddit":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="10" fill="#FF4500" />
          <circle cx="12" cy="13.2" r="5.2" fill="#fff" />
          <circle cx="9.7" cy="12.6" r="1.1" fill="#FF4500" />
          <circle cx="14.3" cy="12.6" r="1.1" fill="#FF4500" />
          <path
            fill="none"
            stroke="#FF4500"
            strokeWidth="1.2"
            strokeLinecap="round"
            d="M9.6 15c.7.7 1.6 1 2.4 1s1.7-.3 2.4-1"
          />
          <circle cx="16.8" cy="9.2" r="1.2" fill="#fff" />
          <path stroke="#fff" strokeWidth="1.4" strokeLinecap="round" d="M12.2 7.2V5.6" />
          <circle cx="14.7" cy="5.2" r="1.1" fill="#fff" />
        </svg>
      );
    case "telegram":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="10" fill="#2AABEE" />
          <path
            fill="#fff"
            d="M9.7 15.7 9.5 18.4c.3 0 .5-.1.7-.3l1.7-1.6 3.5 2.6c.6.4 1.1.2 1.3-.6l2.3-10.9c.2-.9-.3-1.3-.9-1.1L6.2 11.1c-.9.3-.9.8-.2 1l2.9.9 6.7-4.2c.3-.2.6-.1.4.1l-5.3 4.8z"
          />
        </svg>
      );
  }
}

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="9"
        y="9"
        width="11"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5 9.5 17 19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

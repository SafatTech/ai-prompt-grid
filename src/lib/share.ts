export type SharePlatformId =
  | "instagram"
  | "twitter"
  | "facebook"
  | "tiktok"
  | "whatsapp"
  | "discord"
  | "reddit"
  | "telegram";

export type SharePlatform = {
  id: SharePlatformId;
  label: string;
  /** Platforms without a web share intent copy the link instead. */
  mode: "intent" | "copy";
};

export const SHARE_PLATFORMS: SharePlatform[] = [
  { id: "instagram", label: "Instagram", mode: "copy" },
  { id: "twitter", label: "Twitter", mode: "intent" },
  { id: "facebook", label: "Facebook", mode: "intent" },
  { id: "tiktok", label: "Tiktok", mode: "copy" },
  { id: "whatsapp", label: "Whatsapp", mode: "intent" },
  { id: "discord", label: "Discord", mode: "copy" },
  { id: "reddit", label: "Reddit", mode: "intent" },
  { id: "telegram", label: "Telegram", mode: "intent" },
];

type AppDestination = {
  app: string;
  web: string;
  /** Android package for intent:// deep links. */
  androidPackage: string;
};

/** Native app schemes + HTTPS destinations for copy-then-open platforms. */
const APP_DESTINATIONS: Partial<Record<SharePlatformId, AppDestination>> = {
  instagram: {
    app: "instagram://app",
    web: "https://www.instagram.com/",
    androidPackage: "com.instagram.android",
  },
  tiktok: {
    app: "tiktok://",
    web: "https://www.tiktok.com/",
    androidPackage: "com.zhiliaoapp.musically",
  },
  discord: {
    app: "discord://-/channels/@me",
    web: "https://discord.com/channels/@me",
    androidPackage: "com.discord",
  },
};

export function buildShareMessage(title: string) {
  return `${title} — AI Prompt Grid`;
}

export function shareIntentUrl(
  platform: SharePlatformId,
  url: string,
  title: string,
): string | null {
  const text = buildShareMessage(title);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);
  const titleEnc = encodeURIComponent(title);

  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${u}&text=${t}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    case "whatsapp":
      return `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
    case "reddit":
      return `https://www.reddit.com/submit?url=${u}&title=${titleEnc}`;
    case "telegram":
      return `https://t.me/share/url?url=${u}&text=${t}`;
    default:
      return null;
  }
}

export async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // fall through to legacy path
  }

  try {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

export function openShareWindow(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

function isMobileUserAgent() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

function androidIntentUrl(dest: AppDestination) {
  const parsed = new URL(dest.web);
  return (
    `intent://${parsed.host}${parsed.pathname}${parsed.search}` +
    `#Intent;scheme=https;package=${dest.androidPackage};` +
    `S.browser_fallback_url=${encodeURIComponent(dest.web)};end`
  );
}

/**
 * Opens the installed native app when possible, otherwise the web app.
 * - Desktop: HTTPS web app in a new tab
 * - Android: intent:// (app if installed, else web fallback)
 * - iOS: custom scheme first; if the page stays visible, open the web app
 */
export function openPlatformAppOrWeb(platform: SharePlatformId) {
  const dest = APP_DESTINATIONS[platform];
  if (!dest) return;

  if (!isMobileUserAgent()) {
    openShareWindow(dest.web);
    return;
  }

  if (/Android/i.test(navigator.userAgent)) {
    openShareWindow(androidIntentUrl(dest));
    return;
  }

  // iOS / other mobile: try the native scheme without unloading this page.
  let handedOff = false;

  const markHandedOff = () => {
    if (document.hidden) handedOff = true;
  };

  const timer = window.setTimeout(() => {
    document.removeEventListener("visibilitychange", markHandedOff);
    window.removeEventListener("pagehide", markHandedOff);
    if (handedOff || document.hidden) return;
    openShareWindow(dest.web);
  }, 1000);

  document.addEventListener("visibilitychange", markHandedOff);
  window.addEventListener("pagehide", markHandedOff);

  // Hidden iframe keeps the style page in place if the app isn't installed.
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = dest.app;
  document.body.appendChild(iframe);
  window.setTimeout(() => {
    iframe.remove();
    window.clearTimeout(timer);
  }, 2000);

  // Some iOS versions ignore iframe custom schemes — also try an anchor click.
  const anchor = document.createElement("a");
  anchor.href = dest.app;
  anchor.rel = "noopener noreferrer";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export function pasteHint(platform: SharePlatformId): string {
  switch (platform) {
    case "instagram":
      return "Link copied. Opening Instagram — paste it there.";
    case "tiktok":
      return "Link copied. Opening TikTok — paste it there.";
    case "discord":
      return "Link copied. Opening Discord — paste it there.";
    default:
      return "Link copied.";
  }
}

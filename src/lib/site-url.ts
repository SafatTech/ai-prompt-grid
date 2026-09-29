/** Canonical production origin used when env is missing in production builds. */
export const PRODUCTION_SITE_URL = "https://aipromptgrid.com";

/**
 * Absolute site origin for sitemap, robots, and metadataBase.
 * Prefer NEXT_PUBLIC_APP_URL; never emit a trailing slash.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (configured) {
    try {
      return new URL(configured).origin;
    } catch {
      // fall through
    }
  }

  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_SITE_URL;
  }

  return "http://localhost:3000";
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

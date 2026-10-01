export type LegacyAction =
  { kind: "ignore" } | { kind: "gone" } | { kind: "redirect"; pathname: string };

/**
 * WordPress slugs that now have a real page on this site.
 * `/terms-of-service` is intentionally absent: another change adds that page,
 * and this module must not redirect or 410 it.
 */
const CONTENT_REDIRECTS: Record<string, string> = {
  "/privacy-policy": "/privacy",
  "/about-us": "/about",
  "/contact-us": "/contact",
};

const RESERVED_PATHS = new Set(["/terms-of-service"]);

function stripTrailingSlash(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function isDatedPostPath(path: string): boolean {
  return /^\/(?:19|20)\d{2}\/\d{1,2}(?:\/.*)?$/.test(path);
}

function isWordPressGonePath(path: string): boolean {
  if (
    path === "/feed" ||
    path.startsWith("/feed/") ||
    path === "/comments/feed" ||
    path.startsWith("/comments/feed/") ||
    path === "/rss" ||
    path.startsWith("/rss/") ||
    path === "/atom" ||
    path.startsWith("/atom/") ||
    path === "/rdf" ||
    path.startsWith("/rdf/")
  ) {
    return true;
  }

  if (
    path === "/wp-login.php" ||
    path === "/wp-login" ||
    path === "/xmlrpc.php" ||
    path === "/wp-cron.php" ||
    path === "/wp-signup.php" ||
    path === "/wp-mail.php" ||
    path === "/wp-trackback.php" ||
    path === "/index.php"
  ) {
    return true;
  }

  if (
    path === "/wp-admin" ||
    path.startsWith("/wp-admin/") ||
    path === "/wp-content" ||
    path.startsWith("/wp-content/") ||
    path === "/wp-includes" ||
    path.startsWith("/wp-includes/") ||
    path === "/wp-json" ||
    path.startsWith("/wp-json/")
  ) {
    return true;
  }

  if (
    path === "/category" ||
    path.startsWith("/category/") ||
    path === "/tag" ||
    path.startsWith("/tag/") ||
    path === "/author" ||
    path.startsWith("/author/")
  ) {
    return true;
  }

  if (path === "/trackback" || path.endsWith("/trackback")) return true;
  if (isDatedPostPath(path)) return true;

  return false;
}

/**
 * Classify a request that may be left over from the 2025 WordPress site.
 * `ignore` leaves Next.js routing alone (including the real app, and
 * `/terms-of-service`, which must not be redirected or retired here).
 */
export function classifyLegacyRequest(
  pathname: string,
  searchParams: URLSearchParams,
): LegacyAction {
  const stripped = stripTrailingSlash(pathname || "/");
  if (RESERVED_PATHS.has(stripped)) return { kind: "ignore" };

  const postId = searchParams.get("p");
  if (postId !== null && (postId === "" || /^\d+$/.test(postId))) {
    return { kind: "gone" };
  }

  const path = stripped.toLowerCase();
  const redirectTo = CONTENT_REDIRECTS[path];
  if (redirectTo) return { kind: "redirect", pathname: redirectTo };
  if (isWordPressGonePath(path)) return { kind: "gone" };
  return { kind: "ignore" };
}

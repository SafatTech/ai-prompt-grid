export type LegacyAction =
  { kind: "ignore" } | { kind: "gone" } | { kind: "redirect"; pathname: string };

/**
 * Old WordPress slugs that still have a different current page.
 * `/privacy-policy` is not here: the legal pages own that URL, and `/privacy`
 * will redirect to it. This module must not redirect or 410 it.
 */
const CONTENT_REDIRECTS: Record<string, string> = {
  "/about-us": "/about",
  "/contact-us": "/contact",
};

/**
 * Real pages this change must leave to their own routes, including trailing
 * slashes and `?p=` permalinks. `/terms-of-service` and `/privacy-policy` are
 * added by the legal-pages work.
 */
const RESERVED_PATHS = new Set([
  "/terms-of-service",
  "/privacy-policy",
  "/cookie-policy",
  "/disclaimer",
  "/about",
  "/contact",
]);

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
 * `ignore` leaves Next.js routing alone, including the real app and the
 * legal/about/contact URLs this change must not redirect or retire.
 */
export function classifyLegacyRequest(
  pathname: string,
  searchParams: URLSearchParams,
): LegacyAction {
  const stripped = stripTrailingSlash(pathname || "/");
  const path = stripped.toLowerCase();

  // App and framework routes are never leftover WordPress URLs.
  if (path.startsWith("/api/") || path.startsWith("/_next/")) {
    return { kind: "ignore" };
  }

  if (RESERVED_PATHS.has(path)) return { kind: "ignore" };

  // WordPress post permalinks were only `/?p=N` and `/index.php?p=N`.
  // An empty `p` is not an id; let `/` render the homepage.
  const postId = searchParams.get("p");
  if (
    (path === "/" || path === "/index.php") &&
    postId !== null &&
    /^\d+$/.test(postId)
  ) {
    return { kind: "gone" };
  }

  const redirectTo = CONTENT_REDIRECTS[path];
  if (redirectTo) return { kind: "redirect", pathname: redirectTo };
  if (isWordPressGonePath(path)) return { kind: "gone" };
  return { kind: "ignore" };
}

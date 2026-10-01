/**
 * Old in-app legal URLs. Canonical pages live at `/privacy-policy` and
 * `/terms-of-service`. Trailing slashes are included so `/privacy/` does not
 * stop at `/privacy` before this redirect runs.
 */
const LEGACY_LEGAL_PATHS: Record<string, string> = {
  "/privacy": "/privacy-policy",
  "/terms": "/terms-of-service",
};

export function legalCanonicalPath(pathname: string): string | null {
  let path = pathname || "/";
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return LEGACY_LEGAL_PATHS[path.toLowerCase()] ?? null;
}

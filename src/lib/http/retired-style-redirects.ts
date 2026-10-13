/**
 * Retired style detail pages. Trailing slashes are included so
 * `/styles/foo/` does not stop at `/styles/foo` before this redirect runs.
 */
const RETIRED_STYLE_PATHS: Record<string, string> = {
  "/styles/saree-office-linkedin-profile-picture-prompt-gemini-women":
    "/guides/gemini-headshot-cv-photo-prompts",
  "/styles/80s-aerobics-studio": "/guides/80s-ai-photo-prompts-solo-couple",
};

/** Slugs that 301 away from `/styles/:slug` and must stay out of the sitemap. */
export const retiredStyleSlugs: ReadonlySet<string> = new Set(
  Object.keys(RETIRED_STYLE_PATHS).map((path) => path.slice("/styles/".length)),
);

export function isRetiredStyleSlug(slug: string): boolean {
  return retiredStyleSlugs.has(slug.trim());
}

/** 301 target for a retired `/styles/:slug` path, or null when the path is still live. */
export function retiredStyleRedirectPath(pathname: string): string | null {
  let path = pathname || "/";
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return RETIRED_STYLE_PATHS[path] ?? null;
}

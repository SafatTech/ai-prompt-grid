/**
 * Leave a faceted `/explore?*` URL via a full document load of bare `/explore`.
 *
 * Soft-navigating off a rewritten (or query) explore URL can leave Next's head
 * manager with two `<meta name="robots">` tags in next dev (N-21 smoke). A
 * document navigation resets head cleanly. Returns true when it navigated.
 */
export function assignBareExploreIfFaceted(): boolean {
  if (typeof window === "undefined") return false;
  if (window.location.pathname !== "/explore") return false;
  if (!window.location.search) return false;
  window.location.assign("/explore");
  return true;
}

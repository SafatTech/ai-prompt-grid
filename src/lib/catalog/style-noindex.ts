/**
 * Temporary AdSense / Search re-review list: keep these style pages live (200)
 * and linked site-wide, but ask crawlers not to index them.
 *
 * To re-index a style later, remove its id from TEMPORARY_NOINDEX_STYLE_IDS
 * (and redeploy so sitemap + metadata update). Do not delete the page.
 */
const TEMPORARY_NOINDEX_STYLE_IDS = [
  "anime-couple-cherry-blossoms-ai-photo-prompt",
  "everyday-in-hand-scale",
  "golden-boho-storyboard",
  "clay-crew",
  "tactile-macro-detail",
  "botanical-wellness-still-life",
  "cozy-dream-room",
  "refined-luxury-living",
  "modern-virtual-staging",
  "midnight-luxury-spotlight",
  "floating-motion-hero",
  "amber-shadow-triptych",
  "golden-flora-triptych",
  "sunlit-bouquet-triptych",
  "blue-note-scrapbook",
  "color-pop-pedestal",
  "luxury-editorial-crew",
  "royal-blue-rose-storyboard",
  "analog-street-fashion",
  "monochrome-echo-trio",
  "mini-collectible-figure",
  "chibi-3d-couple-ai-photo-prompt",
  "retro-90s-blister-card-action-figure-ai-prompt",
  "retro-hand-painted-film-poster-ai-prompt",
  "bathroom-spa-upgrade",
  "kitchen-remodel-vision",
  "cozy-plushie-pet",
  "plastic-brick-toy-figure-group-ai-photo-prompt",
  "outdoor-living-oasis",
  "garden-lawn-makeover",
  "modern-curb-refresh",
  "historic-revival",
  "street-beautification",
] as const;

/** Style ids that stay reachable but must stay out of the index + sitemap. */
export const temporaryNoindexStyleIds: ReadonlySet<string> = new Set(
  TEMPORARY_NOINDEX_STYLE_IDS,
);

export function isTemporaryNoindexStyleSlug(slug: string): boolean {
  return temporaryNoindexStyleIds.has(slug.trim());
}

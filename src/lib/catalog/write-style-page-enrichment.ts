/**
 * Build-time writers for style-page enrichment data.
 * Prefer `scripts/generate-style-page-enrichment.mts` (also regenerates Best for).
 * next.config.ts only rewrites the light guide-membership index.
 */
import { writeStyleBestForData } from "@/lib/catalog/style-best-for";
import { getPublishedStyles } from "@/lib/catalog/styles";
import { writeStyleGuideIndex } from "@/lib/guides/style-guide-index";

/** Regenerate guide membership/cards + Best for lines for all published seeds. */
export function writeStylePageEnrichment(): void {
  const index = writeStyleGuideIndex();
  writeStyleBestForData(getPublishedStyles(), {
    membership: index.membership,
  });
}

/**
 * Regenerates style↔guide membership cards and Best for lines.
 * Run: npx tsx scripts/generate-style-page-enrichment.mts
 * Also invoked from next.config.ts after the published-guide manifest.
 */
import { writeStyleBestForData } from "../src/lib/catalog/style-best-for";
import { getPublishedStyles } from "../src/lib/catalog/styles";
import { writeStyleGuideIndex } from "../src/lib/guides/style-guide-index";

const index = writeStyleGuideIndex();

const bestFor = writeStyleBestForData(getPublishedStyles(), {
  membership: index.membership,
});

const featuredCount = Object.keys(index.membership).length;
console.log(
  `style-guide-index: ${Object.keys(index.guides).length} guides, ${featuredCount} styles with membership`,
);
console.log(`style-best-for: ${Object.keys(bestFor).length} styles`);

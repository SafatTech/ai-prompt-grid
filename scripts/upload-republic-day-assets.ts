/**
 * Upload the approved Republic Day guide WebPs (347-363) to catalog-public.
 *
 *   npx tsx --env-file=.env.local scripts/upload-republic-day-assets.ts <package-root>
 *
 * The root must contain webp/<slug>-before.webp and webp/<slug>-after.webp
 * (plus webp/<slug>-before-b.webp for two-person styles).
 * Assets for this guide are already uploaded; do not run this in CI.
 */
import path from "node:path";
import {
  createCatalogUploadClient,
  uploadEditorialAsset,
} from "./lib/catalog-upload";

type Pair = { n: string; slug: string; secondSource?: boolean };

const pairs: Pair[] = [
  { n: "347", slug: "sunrise-terrace-salute-women" },
  { n: "348", slug: "office-ethnic-day-kurta-men" },
  { n: "349", slug: "couple-tricolour-rangoli-courtyard", secondSource: true },
  { n: "350", slug: "family-parade-on-tv-living-room", secondSource: true },
  { n: "351", slug: "rooftop-tricolour-kites-women" },
  { n: "352", slug: "park-tiranga-balloons-men" },
  { n: "353", slug: "office-ethnic-day-saree-women" },
  { n: "354", slug: "couple-terrace-tiranga-balloons", secondSource: true },
  { n: "355", slug: "community-flag-hoist-salute-men" },
  { n: "356", slug: "courtyard-tricolour-flowers-women" },
  { n: "357", slug: "couple-balcony-parade-viewing", secondSource: true },
  { n: "358", slug: "community-hall-tricolour-bunting-women" },
  { n: "359", slug: "kartavya-path-parade-boulevard-couple", secondSource: true },
  { n: "360", slug: "india-gate-dusk-portrait-men" },
  { n: "361", slug: "parent-child-school-function-hall", secondSource: true },
  { n: "362", slug: "parent-child-terrace-kites", secondSource: true },
  { n: "363", slug: "parent-child-balcony-parade", secondSource: true },
];

async function main() {
  const archiveRoot = process.argv[2];
  if (!archiveRoot) {
    throw new Error("Pass the package root as the first argument");
  }

  const client = createCatalogUploadClient();

  async function upload(localPath: string, keyStem: string): Promise<void> {
    await uploadEditorialAsset({
      localPath,
      keyStem,
      mimeHint: "image/webp",
      supabase: client,
      forceWebpKey: true,
    });
  }

  for (const pair of pairs) {
    const base = path.resolve(archiveRoot, "webp");
    await upload(
      path.join(base, `${pair.slug}-before.webp`),
      `source-${pair.n}`,
    );
    if (pair.secondSource) {
      await upload(
        path.join(base, `${pair.slug}-before-b.webp`),
        `source-${pair.n}b`,
      );
    }
    await upload(path.join(base, `${pair.slug}-after.webp`), `result-${pair.n}`);
    console.log(`${pair.n} ${pair.slug} OK`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});

/**
 * Pure CLI helpers for scripts/seed-catalog.ts (unit-tested; no DB I/O).
 */

import { eightiesStyleIds } from "../src/lib/catalog/seed-80s-styles";
import type { CatalogStyle } from "../src/lib/catalog/types";

export type SeedCliOptions = {
  /** Legacy filter: only 80s seed styles (full upsert path). */
  only: string | null;
  /** Additive: insert styles present in seed but missing from the DB. */
  onlyMissing: boolean;
  /** Additive: limit candidates to these seed slugs. */
  slugs: string[] | null;
  /** Print planned inserts without writing. */
  dryRun: boolean;
};

export function parseSeedCliArgs(argv: string[]): SeedCliOptions {
  const only =
    argv.find((arg) => arg.startsWith("--only="))?.slice("--only=".length) ??
    null;
  const onlyMissing = argv.includes("--only-missing");
  const dryRun = argv.includes("--dry-run");

  let slugs: string[] | null = null;
  const slugsEq = argv.find((arg) => arg.startsWith("--slugs="));
  if (slugsEq) {
    slugs = slugsEq
      .slice("--slugs=".length)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  } else {
    const idx = argv.indexOf("--slugs");
    const next = idx >= 0 ? argv[idx + 1] : undefined;
    if (next && !next.startsWith("--")) {
      slugs = next
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  return { only, onlyMissing, slugs, dryRun };
}

/** True when the run must only insert missing rows (no deletes / rewrites / uploads). */
export function isAdditiveMode(options: SeedCliOptions): boolean {
  return options.onlyMissing || (options.slugs !== null && options.slugs.length > 0);
}

export function selectCandidateStyles(
  allStyles: CatalogStyle[],
  options: SeedCliOptions,
): CatalogStyle[] {
  let candidates =
    options.only === "80s"
      ? allStyles.filter((style) => eightiesStyleIds.has(style.id))
      : allStyles;

  if (options.slugs && options.slugs.length > 0) {
    const wanted = new Set(options.slugs);
    const unknown = options.slugs.filter(
      (slug) => !allStyles.some((style) => style.id === slug),
    );
    if (unknown.length > 0) {
      throw new Error(`Unknown style slug(s): ${unknown.join(", ")}`);
    }
    candidates = candidates.filter((style) => wanted.has(style.id));
  }

  return candidates;
}

export function filterMissingStyles(
  candidates: CatalogStyle[],
  existingSlugs: Iterable<string>,
): CatalogStyle[] {
  const have = new Set(existingSlugs);
  return candidates.filter((style) => !have.has(style.id));
}

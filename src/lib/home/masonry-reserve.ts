/**
 * Estimate reserved height for homepage masonry auto-load slots (N-19).
 * Skeletons under-measure real card height at 390, so we size from live cards.
 */

/** Prefer real masonry cards in the SSR grid; fall back to children already in the extra grid. */
export function sampleMasonryCardHeights(extraGrid: HTMLElement): number[] {
  const section = extraGrid.closest("section");
  const ssrGrid = section?.querySelector<HTMLElement>(
    ".home-masonry:not(.home-masonry-extra)",
  );
  const fromSsr = ssrGrid
    ? [...ssrGrid.querySelectorAll<HTMLElement>("article")].map((el) =>
        el.getBoundingClientRect().height,
      )
    : [];
  const heights = fromSsr.filter((h) => h > 0);
  if (heights.length > 0) return heights;

  return [...extraGrid.querySelectorAll<HTMLElement>("article")]
    .map((el) => el.getBoundingClientRect().height)
    .filter((h) => h > 0);
}

/** Column count from laid-out card width (CSS `columns` reports "auto" often). */
export function estimateMasonryColumns(grid: HTMLElement, cardWidth: number): number {
  if (cardWidth <= 0) return 1;
  const gridWidth = grid.getBoundingClientRect().width;
  if (gridWidth <= 0) return 1;
  const gapRaw = getComputedStyle(grid).columnGap;
  const gap = Number.parseFloat(gapRaw) || 0;
  return Math.max(1, Math.round((gridWidth + gap) / (cardWidth + gap)));
}

/**
 * Height to reserve for `slotCount` masonry items so batch commits do not push
 * trust / load-more / newsletter (overflow-anchor still disabled on those).
 * Adds a small buffer so taller-than-average real cards still fit.
 */
export function reserveMasonryHeight(
  grid: HTMLElement,
  slotCount: number,
): number | undefined {
  if (slotCount <= 0) return undefined;

  const heights = sampleMasonryCardHeights(grid);
  if (heights.length === 0) return undefined;

  const avg = heights.reduce((sum, h) => sum + h, 0) / heights.length;
  // Prefer a high percentile so portrait-heavy batches are covered.
  const sorted = [...heights].sort((a, b) => a - b);
  const p90 = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.9))] ?? avg;
  const cardH = Math.max(avg, p90);

  const sample =
    grid
      .closest("section")
      ?.querySelector<HTMLElement>(".home-masonry:not(.home-masonry-extra) article") ??
    grid.querySelector<HTMLElement>("article");
  const cardWidth = sample?.getBoundingClientRect().width ?? 0;
  const marginBottom = sample
    ? Number.parseFloat(getComputedStyle(sample).marginBottom) || 0
    : 0;
  const rowH = cardH + marginBottom;
  const cols = estimateMasonryColumns(grid, cardWidth || grid.getBoundingClientRect().width);
  const rows = Math.ceil(slotCount / cols);
  // ~8% buffer: QA saw ~330px shortfall on ~7000px (~4.7%); stay conservative.
  return Math.ceil(rows * rowH * 1.08);
}

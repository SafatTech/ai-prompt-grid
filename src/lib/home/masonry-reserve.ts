/**
 * Estimate reserved height for homepage masonry click-expansion slots (N-19 / N-24).
 * Skeletons under-measure real card height at 390, so we size from live cards.
 * Use remaining slot count × measured average — no extra % buffer (N-24 blank band).
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
 * Height to reserve for `slotCount` remaining masonry items (N-24: exact
 * remaining × measured average card height, no 8% pad).
 */
export function reserveMasonryHeight(
  grid: HTMLElement,
  slotCount: number,
): number | undefined {
  if (slotCount <= 0) return undefined;

  const heights = sampleMasonryCardHeights(grid);
  if (heights.length === 0) return undefined;

  const avg = heights.reduce((sum, h) => sum + h, 0) / heights.length;

  const sample =
    grid
      .closest("section")
      ?.querySelector<HTMLElement>(".home-masonry:not(.home-masonry-extra) article") ??
    grid.querySelector<HTMLElement>("article");
  const cardWidth = sample?.getBoundingClientRect().width ?? 0;
  const marginBottom = sample
    ? Number.parseFloat(getComputedStyle(sample).marginBottom) || 0
    : 0;
  const rowH = avg + marginBottom;
  const cols = estimateMasonryColumns(grid, cardWidth || grid.getBoundingClientRect().width);
  const rows = Math.ceil(slotCount / cols);
  return Math.ceil(rows * rowH);
}

/**
 * Read the grid's natural content height with min-height cleared so a prior
 * soft-cap reserve cannot inflate the measurement (N-24 blank band).
 */
export function measureMasonryContentHeight(grid: HTMLElement): number {
  const prev = grid.style.minHeight;
  grid.style.minHeight = "0px";
  const height = Math.ceil(grid.getBoundingClientRect().height);
  grid.style.minHeight = prev;
  return height;
}

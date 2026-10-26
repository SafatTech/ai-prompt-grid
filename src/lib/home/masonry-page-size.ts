/**
 * Homepage "Explore everything" CSS multi-column masonry.
 * Cards fill top-down per column, so the SSR count must be a multiple of the
 * desktop column count (5) or the last column stays empty at the top.
 *
 * 25 = 5 rows × 5 cols. Append batches use the same size so page offsets stay
 * aligned with the API.
 */
export const HOME_MASONRY_COLUMN_COUNT = 5;

/** SSR + API page size for the homepage explore feed. */
export const HOME_MASONRY_PAGE_SIZE = 25;

/** First row only — one priority preload + eager siblings; rest layout-IO / lazy. */
export const HOME_MASONRY_FIRST_ROW = HOME_MASONRY_COLUMN_COUNT;

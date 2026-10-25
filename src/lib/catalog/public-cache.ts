/** Public catalog reads are shared across routes, functions, and ISR renders. */
export const PUBLIC_CATALOG_CACHE_TAG = "public-catalog";
export const HOMEPAGE_SETTINGS_CACHE_TAG = "homepage-settings";
export const PUBLIC_DATA_REVALIDATE_SECONDS = 3_600;

/**
 * Keep every serialized Data Cache item comfortably below Vercel's 2 MB hard
 * limit. At current production density, 150 rows remain below 1 MB after
 * omitting per-asset blur data.
 */
export const PUBLIC_CATALOG_PAGE_SIZE = 150;
export const PUBLIC_CATALOG_CACHE_ENTRY_BUDGET_BYTES = 1_500_000;

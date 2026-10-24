import "server-only";
import { revalidateTag } from "next/cache";
import { HOMEPAGE_SETTINGS_CACHE_TAG, PUBLIC_CATALOG_CACHE_TAG } from "./public-cache";

/**
 * Admin Route Handlers call these after a successful write. Expiring the data
 * immediately ensures the next public render sees the edit; the cache is then
 * repopulated once and shared by every public route.
 */
export function expirePublicCatalogCache(): void {
  revalidateTag(PUBLIC_CATALOG_CACHE_TAG, { expire: 0 });
}

export function expireHomepageSettingsCache(): void {
  revalidateTag(HOMEPAGE_SETTINGS_CACHE_TAG, { expire: 0 });
}

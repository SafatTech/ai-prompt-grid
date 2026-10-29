/** Public AdSense publisher client id used when the env var is unset. */
export const DEFAULT_ADSENSE_CLIENT = "ca-pub-4446032458804047";

/**
 * AdSense client id (`ca-pub-…`). Prefers NEXT_PUBLIC_ADSENSE_CLIENT when set;
 * otherwise falls back to the known publisher id so ads.txt and the site tag
 * work without a Vercel env change.
 */
export function getAdSenseClient(
  value: string | undefined = process.env.NEXT_PUBLIC_ADSENSE_CLIENT,
): string {
  const raw = value?.trim() || DEFAULT_ADSENSE_CLIENT;
  if (raw.startsWith("pub-")) return `ca-${raw}`;
  return raw;
}

/** Publisher id for ads.txt (`pub-…`), derived from the client id. */
export function getAdSensePublisherId(
  value: string | undefined = process.env.NEXT_PUBLIC_ADSENSE_CLIENT,
): string | null {
  const client = getAdSenseClient(value);
  const publisherId = client.startsWith("ca-") ? client.slice(3) : client;
  return publisherId.startsWith("pub-") ? publisherId : null;
}

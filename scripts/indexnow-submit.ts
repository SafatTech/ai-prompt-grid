/**
 * Submit sitemap URLs to IndexNow (Bing and other participating engines).
 *
 * Manual only — not wired into `next build`. Run after publish:
 *   npm run indexnow
 *   npm run indexnow -- --dry-run
 *
 * Key file: public/<key>.txt (must be served at https://host/<key>.txt).
 * Override host/key with INDEXNOW_HOST / INDEXNOW_KEY or NEXT_PUBLIC_APP_URL.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PRODUCTION_SITE_URL } from "../src/lib/site-url";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH_SIZE = 10_000;

/** Filename (without path) of the ownership key hosted under /public. */
export const INDEXNOW_KEY_FILE = "b5e340b94005434693b49047ce38a9ca.txt";

type SubmitOptions = {
  host: string;
  key: string;
  keyLocation: string;
  dryRun: boolean;
};

function parseArgs(argv: string[]): { dryRun: boolean; sitemapUrl?: string } {
  let dryRun = false;
  let sitemapUrl: string | undefined;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--dry-run") dryRun = true;
    else if (arg === "--sitemap" && argv[i + 1]) {
      sitemapUrl = argv[++i];
    }
  }
  return { dryRun, sitemapUrl };
}

function originFromEnv(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (configured) {
    try {
      return new URL(configured).origin;
    } catch {
      // fall through
    }
  }
  return PRODUCTION_SITE_URL;
}

function hostFromOrigin(origin: string): string {
  return new URL(origin).host;
}

/** Extract absolute http(s) URLs from a sitemap or sitemap-index XML string. */
export function extractSitemapUrls(xml: string): string[] {
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) =>
    m[1]!.trim(),
  );
  return [...new Set(locs.filter((url) => /^https?:\/\//i.test(url)))];
}

async function resolveKey(origin: string): Promise<{ key: string; keyLocation: string }> {
  const fromEnv = process.env.INDEXNOW_KEY?.trim();
  if (fromEnv) {
    if (!/^[a-zA-Z0-9-]{8,128}$/.test(fromEnv)) {
      throw new Error("INDEXNOW_KEY must be 8–128 letters, digits, or hyphens.");
    }
    return { key: fromEnv, keyLocation: `${origin}/${fromEnv}.txt` };
  }

  const fileName = INDEXNOW_KEY_FILE;
  const key = (await readFile(path.join(process.cwd(), "public", fileName), "utf8")).trim();
  const expected = fileName.replace(/\.txt$/i, "");
  if (key !== expected) {
    throw new Error(
      `IndexNow key file ${fileName} must contain exactly "${expected}".`,
    );
  }
  return { key, keyLocation: `${origin}/${key}.txt` };
}

async function loadUrls(sitemapUrl: string): Promise<string[]> {
  const res = await fetch(sitemapUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap ${sitemapUrl}: HTTP ${res.status}`);
  }
  const xml = await res.text();
  const urls = extractSitemapUrls(xml);
  // If this is a sitemap index, fetch child sitemaps.
  const childSitemaps = urls.filter((url) => /sitemap/i.test(url) && url.endsWith(".xml"));
  if (childSitemaps.length > 0 && childSitemaps.length === urls.length) {
    const nested: string[] = [];
    for (const child of childSitemaps) {
      const childRes = await fetch(child);
      if (!childRes.ok) {
        throw new Error(`Failed to fetch child sitemap ${child}: HTTP ${childRes.status}`);
      }
      nested.push(...extractSitemapUrls(await childRes.text()));
    }
    return [...new Set(nested)];
  }
  return urls;
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

async function submitBatch(opts: SubmitOptions, batch: string[]): Promise<void> {
  const body = {
    host: opts.host,
    key: opts.key,
    keyLocation: opts.keyLocation,
    urlList: batch,
  };

  if (opts.dryRun) {
    console.log(`[indexnow] dry-run batch of ${batch.length} URL(s)`);
    console.log(`  first: ${batch[0]}`);
    if (batch.length > 1) console.log(`  last:  ${batch[batch.length - 1]}`);
    return;
  }

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  // 200 = accepted; 202 = accepted, key verification pending (first submit).
  if (res.status !== 200 && res.status !== 202) {
    const text = await res.text().catch(() => "");
    throw new Error(`IndexNow HTTP ${res.status}: ${text.slice(0, 300)}`);
  }
  console.log(`[indexnow] submitted ${batch.length} URL(s) → HTTP ${res.status}`);
}

async function main(): Promise<void> {
  const { dryRun, sitemapUrl: sitemapOverride } = parseArgs(process.argv.slice(2));
  const origin = originFromEnv();
  const host = process.env.INDEXNOW_HOST?.trim() || hostFromOrigin(origin);
  const sitemapUrl = sitemapOverride ?? `${origin}/sitemap.xml`;
  const { key, keyLocation } = await resolveKey(origin);

  console.log(`[indexnow] host=${host}`);
  console.log(`[indexnow] keyLocation=${keyLocation}`);
  console.log(`[indexnow] sitemap=${sitemapUrl}`);
  if (dryRun) console.log("[indexnow] dry-run (no POST)");

  const urls = await loadUrls(sitemapUrl);
  if (urls.length === 0) {
    throw new Error("Sitemap contained no URLs.");
  }
  console.log(`[indexnow] ${urls.length} URL(s) from sitemap`);

  const opts: SubmitOptions = { host, key, keyLocation, dryRun };
  for (const batch of chunk(urls, BATCH_SIZE)) {
    await submitBatch(opts, batch);
  }
}

const isDirectRun =
  process.argv[1] !== undefined &&
  /indexnow-submit\.(ts|js|mjs|cjs)$/.test(path.basename(process.argv[1]));

if (isDirectRun) {
  main().catch((err) => {
    console.error("[indexnow]", err instanceof Error ? err.message : err);
    process.exit(1);
  });
}

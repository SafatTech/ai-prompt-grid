/**
 * Backfill style_assets source/result focus points via BlazeFace.
 *
 * Downloads each published style's before/after image once, detects faces,
 * and writes focus as 0–100 percent (face-box center; multi-face = union center;
 * no face → 50, 30).
 *
 * Does not run in CI. Requires local Supabase credentials + migration applied:
 *
 *   npx tsx --env-file=.env.local scripts/backfill-image-focus.ts --dry-run
 *   npx tsx --env-file=.env.local scripts/backfill-image-focus.ts
 *
 * Flags:
 *   --dry-run     Print planned updates without writing
 *   --force       Recompute rows that already have focus values
 *   --limit=N     Process at most N assets
 *   --delay=MS    Pause between downloads (default 150; keeps egress modest)
 */

import { createClient } from "@supabase/supabase-js";
import { detectFaceFocusFromUrl } from "../src/lib/catalog/detect-face-focus-node";
import type { ImageFocus } from "../src/lib/catalog/image-focus";

type AssetRow = {
  id: string;
  kind: string;
  source_storage_key: string;
  result_storage_key: string;
  source_focus_x: number | null;
  source_focus_y: number | null;
  result_focus_x: number | null;
  result_focus_y: number | null;
  styles: { status: string } | { status: string }[] | null;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

function parseLimit(argv: string[]): number | null {
  const raw = argv.find((arg) => arg.startsWith("--limit="));
  if (!raw) return null;
  const value = Number.parseInt(raw.slice("--limit=".length), 10);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function parseDelayMs(argv: string[]): number {
  const raw = argv.find((arg) => arg.startsWith("--delay="));
  if (!raw) return 150;
  const value = Number.parseInt(raw.slice("--delay=".length), 10);
  return Number.isFinite(value) && value >= 0 ? value : 150;
}

function sleep(ms: number): Promise<void> {
  return ms > 0 ? new Promise((resolve) => setTimeout(resolve, ms)) : Promise.resolve();
}

function styleStatus(row: AssetRow): string | null {
  const styles = row.styles;
  if (Array.isArray(styles)) return styles[0]?.status ?? null;
  return styles?.status ?? null;
}

function hasFocus(x: number | null, y: number | null): boolean {
  return typeof x === "number" && typeof y === "number";
}

/** Resolve relative storage keys the same way the catalog mapper does. */
function resolveUrl(key: string, publicBaseUrl: string): string {
  if (!key) return "";
  if (/^https?:\/\//i.test(key)) return key;
  if (key.startsWith("/")) {
    // Site-relative public files — not fetchable from this script without a site origin.
    return key;
  }
  const base = publicBaseUrl.replace(/\/$/, "");
  return `${base}/storage/v1/object/public/catalog-public/${key.replace(/^\//, "")}`;
}

const urlCache = new Map<string, ImageFocus>();

async function focusForUrl(url: string): Promise<ImageFocus> {
  const cached = urlCache.get(url);
  if (cached) return cached;
  const focus = await detectFaceFocusFromUrl(url);
  urlCache.set(url, focus);
  return focus;
}

async function main() {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes("--dry-run");
  const force = argv.includes("--force");
  const limit = parseLimit(argv);
  const delayMs = parseDelayMs(argv);

  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let query = client
    .from("style_assets")
    .select(
      "id, kind, source_storage_key, result_storage_key, source_focus_x, source_focus_y, result_focus_x, result_focus_y, styles!inner(status)",
    )
    .in("kind", ["example_pair", "card_pair", "hero"])
    .eq("styles.status", "published")
    .order("sort_order", { ascending: true });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;

  const rows = ((data ?? []) as AssetRow[]).filter(
    (row) => styleStatus(row) === "published",
  );

  console.log(
    `Found ${rows.length} published asset(s). dryRun=${dryRun} force=${force} delayMs=${delayMs}`,
  );

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const row of rows) {
    const needSource = force || !hasFocus(row.source_focus_x, row.source_focus_y);
    const needResult = force || !hasFocus(row.result_focus_x, row.result_focus_y);

    if (!needSource && !needResult) {
      skipped += 1;
      continue;
    }

    const sourceUrl = resolveUrl(row.source_storage_key, url);
    const resultUrl = resolveUrl(row.result_storage_key, url);

    if ((needSource && !/^https?:\/\//i.test(sourceUrl)) || (needResult && !/^https?:\/\//i.test(resultUrl))) {
      skipped += 1;
      console.warn(`skip ${row.id}: non-http storage key (site-relative path)`);
      continue;
    }

    const patch: Record<string, number> = {};

    try {
      if (needSource) {
        const focus = await focusForUrl(sourceUrl);
        patch.source_focus_x = focus.x;
        patch.source_focus_y = focus.y;
        await sleep(delayMs);
      }
      if (needResult) {
        // Same URL as source (placeholder rows) → reuse without a second download.
        const focus =
          needSource && sourceUrl === resultUrl
            ? {
                x: patch.source_focus_x!,
                y: patch.source_focus_y!,
              }
            : await focusForUrl(resultUrl);
        patch.result_focus_x = focus.x;
        patch.result_focus_y = focus.y;
        if (!(needSource && sourceUrl === resultUrl)) await sleep(delayMs);
      }
    } catch (err) {
      failed += 1;
      console.warn(
        `fail ${row.id}: ${err instanceof Error ? err.message : String(err)}`,
      );
      continue;
    }

    const summary = Object.entries(patch)
      .map(([k, v]) => `${k}=${v}`)
      .join(" ");
    console.log(`${dryRun ? "dry-run" : "update"} ${row.id} ${summary}`);

    if (dryRun) {
      updated += 1;
      continue;
    }

    const { error: updateError } = await client
      .from("style_assets")
      .update(patch)
      .eq("id", row.id);

    if (updateError) {
      failed += 1;
      console.warn(`fail ${row.id}: ${updateError.message}`);
      continue;
    }
    updated += 1;
  }

  console.log(
    `Done. updated=${updated} skipped=${skipped} failed=${failed} uniqueDownloads=${urlCache.size}`,
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

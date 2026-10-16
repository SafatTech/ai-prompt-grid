/**
 * Backfill style_assets.result_blur_data_url for merge example pairs.
 *
 * Does not run in CI. Requires local Supabase credentials:
 *
 *   npx tsx --env-file=.env.local scripts/generate-blur-thumbs.ts
 *
 * Optional flags:
 *   --dry-run   Print counts without writing
 *   --limit=N   Process at most N assets
 */

import { createClient } from "@supabase/supabase-js";
import { buildResultBlurDataUrlFromUrl } from "../src/lib/catalog/result-blur";

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

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const limit = parseLimit(process.argv);

  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let query = client
    .from("style_assets")
    .select("id, result_storage_key, result_blur_data_url, kind")
    .in("kind", ["example_pair", "card_pair"])
    .is("result_blur_data_url", null)
    .order("sort_order", { ascending: true });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;

  const rows = data ?? [];
  console.log(`Found ${rows.length} asset(s) without blur data URLs.`);
  if (dryRun || rows.length === 0) return;

  let updated = 0;
  let skipped = 0;

  for (const row of rows) {
    const resultUrl = String(row.result_storage_key ?? "");
    const blur = await buildResultBlurDataUrlFromUrl(resultUrl);
    if (!blur) {
      skipped += 1;
      console.warn(`skip ${row.id}: could not build blur from ${resultUrl}`);
      continue;
    }

    const { error: updateError } = await client
      .from("style_assets")
      .update({ result_blur_data_url: blur })
      .eq("id", row.id);

    if (updateError) {
      skipped += 1;
      console.warn(`skip ${row.id}: ${updateError.message}`);
      continue;
    }

    updated += 1;
    console.log(`updated ${row.id}`);
  }

  console.log(`Done. updated=${updated} skipped=${skipped}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

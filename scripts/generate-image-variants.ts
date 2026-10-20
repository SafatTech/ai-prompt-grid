/**
 * Generate responsive WebP variants for catalog-public (and optional local
 * public/ mirrors) so Hobby can skip Vercel /_next/image.
 *
 * Naming (next to the original):
 *   seed/catalog/editorial/result-01.webp
 *   seed/catalog/editorial/result-01.w360.webp
 *   seed/catalog/editorial/result-01.w540.webp
 *   seed/catalog/editorial/result-01.w720.webp
 *   seed/catalog/editorial/result-01.w1080.webp
 *
 * Usage (owner team — do not commit secrets):
 *   npx tsx --env-file=.env.local scripts/generate-image-variants.ts
 *
 * Env:
 *   SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Flags:
 *   --dry-run      Count only; no upload / no local write / no manifest write
 *   --force        Rebuild even when the variant object already exists
 *   --fix-cache   Re-upload originals with cacheControl 31536000 (Supabase)
 *   --local-only   Skip Supabase; only process public/catalog + public/guides
 *   --remote-only  Skip local public/ trees
 *
 * Writes src/lib/images/variant-manifest.json (loader safety allow-list).
 * Prints counts only — never logs the service role key.
 *
 * Recommended (owner team, before merge / after adding catalog assets):
 *   npx tsx --env-file=.env.local scripts/generate-image-variants.ts --fix-cache
 */

import fs from "node:fs";
import path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import sharp from "sharp";
import {
  VARIANT_QUALITY,
  VARIANT_WIDTHS,
  isVariantObjectKey,
  variantObjectKey,
  type VariantManifest,
} from "../src/lib/images/variant-config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StorageClient = SupabaseClient<any>;

const BUCKET = "catalog-public";
const ROOT = path.resolve(import.meta.dirname, "..");
const MANIFEST_PATH = path.join(ROOT, "src/lib/images/variant-manifest.json");
const LOCAL_ROOTS = ["public/catalog", "public/guides"] as const;
const IMAGE_EXT_RE = /\.(jpe?g|png|webp|gif)$/i;

type Counts = {
  originals: number;
  uploaded: number;
  writtenLocal: number;
  skippedExisting: number;
  skippedUpscale: number;
  cacheFixed: number;
  failed: number;
};

const LONG_CACHE = "31536000";

function contentTypeForKey(key: string): string {
  const lower = key.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  return "application/octet-stream";
}

function requireSupabaseUrl(): string {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error("Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL");
  }
  return url;
}

function requireServiceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  return key;
}

function emptyCounts(): Counts {
  return {
    originals: 0,
    uploaded: 0,
    writtenLocal: 0,
    skippedExisting: 0,
    skippedUpscale: 0,
    cacheFixed: 0,
    failed: 0,
  };
}

async function listRemoteObjectKeys(client: StorageClient): Promise<string[]> {
  const keys: string[] = [];

  async function walk(prefix: string) {
    let offset = 0;
    for (;;) {
      const { data, error } = await client.storage.from(BUCKET).list(prefix, {
        limit: 1000,
        offset,
        sortBy: { column: "name", order: "asc" },
      });
      if (error) throw new Error(`list ${prefix || "/"}: ${error.message}`);
      if (!data || data.length === 0) break;

      for (const entry of data) {
        const full = prefix ? `${prefix}/${entry.name}` : entry.name;
        // Folders have null metadata / no id content-type; files have metadata.
        const isFile = Boolean(entry.metadata) || IMAGE_EXT_RE.test(entry.name);
        const isFolder = !entry.metadata && !IMAGE_EXT_RE.test(entry.name);
        if (isFolder) {
          await walk(full);
          continue;
        }
        if (!isFile) continue;
        if (isVariantObjectKey(full)) continue;
        if (!IMAGE_EXT_RE.test(full)) continue;
        keys.push(full);
      }

      if (data.length < 1000) break;
      offset += data.length;
    }
  }

  await walk("");
  return keys;
}

function listLocalOriginals(): { objectKey: string; absPath: string }[] {
  const out: { objectKey: string; absPath: string }[] = [];
  for (const root of LOCAL_ROOTS) {
    const absRoot = path.join(ROOT, root);
    if (!fs.existsSync(absRoot)) continue;
    const stack = [absRoot];
    while (stack.length) {
      const dir = stack.pop()!;
      for (const name of fs.readdirSync(dir)) {
        const abs = path.join(dir, name);
        const stat = fs.statSync(abs);
        if (stat.isDirectory()) {
          stack.push(abs);
          continue;
        }
        if (!IMAGE_EXT_RE.test(name) || isVariantObjectKey(name)) continue;
        const rel = path.relative(path.join(ROOT, "public"), abs).replace(/\\/g, "/");
        out.push({ objectKey: `/${rel}`, absPath: abs });
      }
    }
  }
  return out;
}

async function encodeVariant(
  input: Buffer,
  targetWidth: number,
): Promise<{ buffer: Buffer; skippedUpscale: boolean } | null> {
  const image = sharp(input, { failOn: "none" });
  const meta = await image.metadata();
  const sourceWidth = meta.width ?? 0;
  if (sourceWidth <= 0) return null;
  if (sourceWidth < targetWidth) {
    return { buffer: Buffer.alloc(0), skippedUpscale: true };
  }
  const buffer = await image
    .resize({
      width: targetWidth,
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality: VARIANT_QUALITY, effort: 4 })
    .toBuffer();
  return { buffer, skippedUpscale: false };
}

async function remoteExists(client: StorageClient, key: string): Promise<boolean> {
  const dir = path.posix.dirname(key);
  const base = path.posix.basename(key);
  const prefix = dir === "." ? "" : dir;
  const { data, error } = await client.storage.from(BUCKET).list(prefix, {
    search: base,
    limit: 100,
  });
  if (error) return false;
  return (data ?? []).some((entry) => entry.name === base);
}

async function processRemoteOriginal(
  client: StorageClient,
  objectKey: string,
  force: boolean,
  dryRun: boolean,
  counts: Counts,
  manifestKeys: Record<string, number[]>,
) {
  counts.originals += 1;
  const available: number[] = [];

  const { data: blob, error: downloadError } = await client.storage
    .from(BUCKET)
    .download(objectKey);
  if (downloadError || !blob) {
    counts.failed += 1;
    return;
  }
  const input = Buffer.from(await blob.arrayBuffer());

  for (const width of VARIANT_WIDTHS) {
    const destKey = variantObjectKey(objectKey, width);
    if (!force && (await remoteExists(client, destKey))) {
      counts.skippedExisting += 1;
      available.push(width);
      continue;
    }

    const encoded = await encodeVariant(input, width);
    if (!encoded) {
      counts.failed += 1;
      continue;
    }
    if (encoded.skippedUpscale) {
      counts.skippedUpscale += 1;
      continue;
    }

    if (dryRun) {
      available.push(width);
      counts.uploaded += 1;
      continue;
    }

    const { error: uploadError } = await client.storage.from(BUCKET).upload(destKey, encoded.buffer, {
      contentType: "image/webp",
      cacheControl: LONG_CACHE,
      upsert: true,
    });
    if (uploadError) {
      counts.failed += 1;
      continue;
    }
    available.push(width);
    counts.uploaded += 1;
  }

  if (available.length > 0) {
    manifestKeys[objectKey] = available;
  }
}

async function processLocalOriginal(
  entry: { objectKey: string; absPath: string },
  force: boolean,
  dryRun: boolean,
  counts: Counts,
  manifestKeys: Record<string, number[]>,
) {
  counts.originals += 1;
  const available: number[] = [];
  let input: Buffer;
  try {
    input = fs.readFileSync(entry.absPath);
  } catch {
    counts.failed += 1;
    return;
  }

  for (const width of VARIANT_WIDTHS) {
    const destKey = variantObjectKey(entry.objectKey, width);
    const destAbs = path.join(ROOT, "public", destKey.replace(/^\//, ""));

    if (!force && fs.existsSync(destAbs)) {
      counts.skippedExisting += 1;
      available.push(width);
      continue;
    }

    const encoded = await encodeVariant(input, width);
    if (!encoded) {
      counts.failed += 1;
      continue;
    }
    if (encoded.skippedUpscale) {
      counts.skippedUpscale += 1;
      continue;
    }

    if (dryRun) {
      available.push(width);
      counts.writtenLocal += 1;
      continue;
    }

    fs.mkdirSync(path.dirname(destAbs), { recursive: true });
    fs.writeFileSync(destAbs, encoded.buffer);
    available.push(width);
    counts.writtenLocal += 1;
  }

  if (available.length > 0) {
    manifestKeys[entry.objectKey] = available;
  }
}

function writeManifest(keys: Record<string, number[]>) {
  const manifest: VariantManifest = {
    version: 1,
    widths: [...VARIANT_WIDTHS],
    keys,
  };
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

/** Re-upload an original with long-lived Cache-Control (Supabase default is 3600). */
async function fixOriginalCacheControl(
  client: StorageClient,
  objectKey: string,
  dryRun: boolean,
  counts: Counts,
) {
  if (dryRun) {
    counts.cacheFixed += 1;
    return;
  }
  const { data: blob, error: downloadError } = await client.storage
    .from(BUCKET)
    .download(objectKey);
  if (downloadError || !blob) {
    counts.failed += 1;
    return;
  }
  const input = Buffer.from(await blob.arrayBuffer());
  const { error: uploadError } = await client.storage.from(BUCKET).upload(objectKey, input, {
    contentType: contentTypeForKey(objectKey),
    cacheControl: LONG_CACHE,
    upsert: true,
  });
  if (uploadError) {
    counts.failed += 1;
    return;
  }
  counts.cacheFixed += 1;
}

async function main() {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes("--dry-run");
  const force = argv.includes("--force");
  const fixCache = argv.includes("--fix-cache");
  const localOnly = argv.includes("--local-only");
  const remoteOnly = argv.includes("--remote-only");

  const counts = emptyCounts();
  const manifestKeys: Record<string, number[]> = {};

  // Preserve keys we are not refreshing in this run.
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      const prev = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")) as VariantManifest;
      if (prev?.keys && typeof prev.keys === "object") {
        Object.assign(manifestKeys, prev.keys);
      }
    } catch {
      /* start fresh */
    }
  }

  if (!localOnly) {
    const url = requireSupabaseUrl();
    const serviceRoleKey = requireServiceRoleKey();
    const client = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const keys = await listRemoteObjectKeys(client);
    for (const key of keys) {
      await processRemoteOriginal(client, key, force, dryRun, counts, manifestKeys);
      if (fixCache) {
        await fixOriginalCacheControl(client, key, dryRun, counts);
      }
    }
  } else if (fixCache) {
    throw new Error("--fix-cache requires Supabase access (omit --local-only)");
  }

  if (!remoteOnly) {
    const locals = listLocalOriginals();
    for (const entry of locals) {
      await processLocalOriginal(entry, force, dryRun, counts, manifestKeys);
    }
  }

  if (!dryRun) {
    writeManifest(manifestKeys);
  }

  console.log(
    [
      `originals=${counts.originals}`,
      `uploaded=${counts.uploaded}`,
      `writtenLocal=${counts.writtenLocal}`,
      `skippedExisting=${counts.skippedExisting}`,
      `skippedUpscale=${counts.skippedUpscale}`,
      `cacheFixed=${counts.cacheFixed}`,
      `failed=${counts.failed}`,
      `manifestKeys=${Object.keys(manifestKeys).length}`,
      dryRun ? "dryRun=1" : "dryRun=0",
    ].join(" "),
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

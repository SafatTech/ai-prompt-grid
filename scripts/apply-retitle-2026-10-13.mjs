/**
 * Apply SEO retitles from uploads/retitle-2026-10-13.csv.
 *
 * Updates matching seed files, publish-*-standalone.mjs DATA blobs, and guide
 * frontmatter in the repo. When SUPABASE_SERVICE_ROLE_KEY is set, also updates
 * styles.title / styles.description by slug (idempotent; skips missing slugs).
 *
 *   node scripts/apply-retitle-2026-10-13.mjs
 *
 *   NEXT_PUBLIC_SUPABASE_URL=https://....supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=... \
 *   node scripts/apply-retitle-2026-10-13.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import WebSocketImpl from "ws";

globalThis.WebSocket ??= WebSocketImpl;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CSV_PATH = path.join(ROOT, "uploads", "retitle-2026-10-13.csv");

/**
 * Outfit/audience corrections when the CSV title does not match the style's
 * prompt and result alt. Fairy-light (anarkali, "for Girls") is left as-is.
 */
const SANITY_OVERRIDES = {
  "varanasi-sunset-voyage": {
    new_title: "Varanasi Sunset Lehenga AI Photo Prompt (Riverside Boat)",
    new_description:
      "Lehenga AI photo prompt for a Varanasi sunset: a riverside boat voyage at golden hour in a red-orange skirt look, built from your selfie. Copy-paste for Gemini or ChatGPT free.",
    reason:
      "Prompt and alts describe a black blouse with a red-orange skirt/lehenga, not a saree.",
  },
  "golden-hour-sparkler-shot": {
    new_title: "Sparkler Diwali AI Photo Editing Prompt for Girls",
    new_description:
      "Diwali AI photo editing prompt for girls: a festive golden-hour portrait in an emerald lehenga holding a lit sparkler, keeping your real face. Copy-paste into Gemini free.",
    reason:
      "Prompt outfits the subject in an emerald silk lehenga with a dupatta, not menswear.",
  },
};

const SEED_FILES = [
  "src/lib/catalog/seed-halloween-styles.ts",
  "src/lib/catalog/seed-diwali-styles.ts",
  "src/lib/catalog/seed-linkedin-styles.ts",
  "src/lib/catalog/seed-80s-styles.ts",
  "src/lib/catalog/seed-pet-styles.ts",
  "src/lib/catalog/seed-group-styles.ts",
  "src/lib/catalog/seed-place-styles.ts",
  "src/lib/catalog/seed-product-styles.ts",
  "src/lib/catalog/seed-editorial-styles.ts",
  "src/lib/catalog/seed-editorial-styles-10-30.ts",
  "src/lib/catalog/seed-merge-styles.ts",
  "src/lib/catalog/seed-winter-styles.ts",
];

const PUBLISH_FILES = [
  "scripts/publish-linkedin-standalone.mjs",
  "scripts/publish-80s-standalone.mjs",
  "scripts/publish-merge-standalone.mjs",
  "scripts/publish-winter-standalone.mjs",
];

function parseCsv(text) {
  const rows = [];
  let i = 0;
  const field = () => {
    if (text[i] === '"') {
      i += 1;
      let out = "";
      while (i < text.length) {
        if (text[i] === '"') {
          if (text[i + 1] === '"') {
            out += '"';
            i += 2;
            continue;
          }
          i += 1;
          break;
        }
        out += text[i];
        i += 1;
      }
      return out;
    }
    let out = "";
    while (i < text.length && text[i] !== "," && text[i] !== "\n" && text[i] !== "\r") {
      out += text[i];
      i += 1;
    }
    return out;
  };
  const row = () => {
    const cols = [];
    while (i < text.length) {
      cols.push(field());
      if (text[i] === ",") {
        i += 1;
        continue;
      }
      if (text[i] === "\r") i += 1;
      if (text[i] === "\n") i += 1;
      break;
    }
    return cols;
  };
  const header = row();
  while (i < text.length) {
    if (text[i] === "\n" || text[i] === "\r") {
      i += 1;
      continue;
    }
    const cols = row();
    if (cols.length === 1 && cols[0] === "") continue;
    const obj = {};
    for (let c = 0; c < header.length; c += 1) obj[header[c]] = cols[c] ?? "";
    rows.push(obj);
  }
  return rows;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function jsonEscape(value) {
  return JSON.stringify(value).slice(1, -1);
}

function loadRetitles() {
  if (!fs.existsSync(CSV_PATH)) {
    throw new Error(`Missing CSV: ${CSV_PATH}`);
  }
  const rows = parseCsv(fs.readFileSync(CSV_PATH, "utf8"));
  if (rows.length !== 113) {
    console.warn(`Expected 113 CSV rows, found ${rows.length}`);
  }
  const changedFromCsv = [];
  const styles = [];
  const guides = [];
  for (const row of rows) {
    const slug = (row.slug || "").trim();
    if (!slug) continue;
    let title = (row.new_title || "").trim();
    let description = (row.new_description || "").trim();
    const h1 = (row.new_h1 || "").trim();
    const override = SANITY_OVERRIDES[slug];
    if (override) {
      if (override.new_title !== title || override.new_description !== description) {
        changedFromCsv.push({
          slug,
          fromTitle: title,
          toTitle: override.new_title,
          reason: override.reason,
        });
      }
      title = override.new_title;
      description = override.new_description;
    }
    if (slug.startsWith("guides/")) {
      guides.push({ slug: slug.slice("guides/".length), title, description, h1 });
    } else {
      styles.push({ slug, title, description });
    }
  }
  return { styles, guides, changedFromCsv };
}

function updateTsSeed(content, slug, title, description) {
  const idPattern = new RegExp(
    `(id:\\s*"${escapeRegExp(slug)}"[\\s\\S]{0,1200}?title:\\s*")([^"]*)(")`,
  );
  if (!idPattern.test(content)) return { content, changed: false };
  let next = content.replace(idPattern, `$1${title}$3`);

  const descInline = new RegExp(
    `(id:\\s*"${escapeRegExp(slug)}"[\\s\\S]{0,1600}?description:\\s*")([^"]*)(")`,
  );
  if (descInline.test(next)) {
    next = next.replace(descInline, `$1${description}$3`);
    return { content: next, changed: next !== content };
  }

  const descBlock = new RegExp(
    `(id:\\s*"${escapeRegExp(slug)}"[\\s\\S]{0,1600}?description:\\s*\\n\\s*")([^"]*)(")`,
  );
  if (descBlock.test(next)) {
    next = next.replace(descBlock, `$1${description}$3`);
    return { content: next, changed: next !== content };
  }

  // e.g. `description: passportLimit,` — replace the identifier with a string.
  const descIdent = new RegExp(
    `(id:\\s*"${escapeRegExp(slug)}"[\\s\\S]{0,1600}?description:\\s*)([A-Za-z_][A-Za-z0-9_]*)(\\s*,)`,
  );
  if (descIdent.test(next)) {
    next = next.replace(descIdent, `$1\n      "${description}"$3`);
  }
  return { content: next, changed: next !== content };
}

function updatePublishData(content, slug, title, description) {
  const pattern = new RegExp(
    `("id"\\s*:\\s*"${escapeRegExp(slug)}"\\s*,\\s*"title"\\s*:\\s*")([^"]*)("\\s*,\\s*"note"\\s*:\\s*"[^"]*"\\s*,\\s*"description"\\s*:\\s*")([^"]*)(")`,
  );
  if (!pattern.test(content)) {
    // Some publish blobs put fields in a slightly different order; try title then description nearby.
    const loose = new RegExp(
      `("id"\\s*:\\s*"${escapeRegExp(slug)}"[\\s\\S]{0,400}?"title"\\s*:\\s*")([^"]*)("[\\s\\S]{0,400}?"description"\\s*:\\s*")([^"]*)(")`,
    );
    if (!loose.test(content)) return { content, changed: false };
    const next = content.replace(
      loose,
      `$1${jsonEscape(title)}$3${jsonEscape(description)}$5`,
    );
    return { content: next, changed: next !== content };
  }
  const next = content.replace(
    pattern,
    `$1${jsonEscape(title)}$3${jsonEscape(description)}$5`,
  );
  return { content: next, changed: next !== content };
}

function updateGuideFrontmatter(filePath, title, description, h1) {
  if (!fs.existsSync(filePath)) return false;
  let text = fs.readFileSync(filePath, "utf8");
  if (!text.startsWith("---\n")) return false;
  const end = text.indexOf("\n---\n", 4);
  if (end < 0) return false;
  let fm = text.slice(4, end);
  const body = text.slice(end + 5);
  fm = fm.replace(/^title:\s*.*$/m, `title: ${JSON.stringify(title)}`);
  fm = fm.replace(/^description:\s*.*$/m, `description: ${JSON.stringify(description)}`);
  let nextBody = body;
  if (h1) {
    if (/^h1:\s*.*$/m.test(fm)) {
      fm = fm.replace(/^h1:\s*.*$/m, `h1: ${JSON.stringify(h1)}`);
    } else {
      fm = fm.replace(/^(title:.*)$/m, `$1\nh1: ${JSON.stringify(h1)}`);
    }
    nextBody = body.replace(/^#\s+.*$/m, `# ${h1}`);
  }
  const next = `---\n${fm}\n---\n${nextBody}`;
  if (next === text) return false;
  fs.writeFileSync(filePath, next);
  return true;
}

function applyRepoUpdates(styles, guides) {
  const bySlug = new Map(styles.map((row) => [row.slug, row]));
  let seedHits = 0;
  let publishHits = 0;
  let guideHits = 0;
  const missingSeeds = [];

  for (const rel of SEED_FILES) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) continue;
    let content = fs.readFileSync(full, "utf8");
    let fileChanged = false;
    for (const [slug, row] of bySlug) {
      if (!content.includes(`"${slug}"`)) continue;
      const result = updateTsSeed(content, slug, row.title, row.description);
      if (result.changed) {
        content = result.content;
        fileChanged = true;
        seedHits += 1;
        bySlug.get(slug).seeded = true;
      }
    }
    if (fileChanged) fs.writeFileSync(full, content);
  }

  for (const rel of PUBLISH_FILES) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) continue;
    let content = fs.readFileSync(full, "utf8");
    let fileChanged = false;
    for (const [slug, row] of bySlug) {
      if (!content.includes(`"${slug}"`)) continue;
      const result = updatePublishData(content, slug, row.title, row.description);
      if (result.changed) {
        content = result.content;
        fileChanged = true;
        publishHits += 1;
        bySlug.get(slug).published = true;
      }
    }
    if (fileChanged) fs.writeFileSync(full, content);
  }

  for (const guide of guides) {
    const full = path.join(ROOT, "content/guides", `${guide.slug}.mdx`);
    if (updateGuideFrontmatter(full, guide.title, guide.description, guide.h1)) {
      guideHits += 1;
    }
  }

  for (const row of styles) {
    if (!row.seeded && !row.published) missingSeeds.push(row.slug);
  }

  return { seedHits, publishHits, guideHits, missingSeeds };
}

async function applyDatabaseUpdates(styles) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.log(
      "DB update skipped (set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to update styles).",
    );
    return { updated: 0, skippedMissing: 0, unchanged: 0 };
  }

  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let updated = 0;
  let skippedMissing = 0;
  let unchanged = 0;

  for (const row of styles) {
    const { data, error } = await client
      .from("styles")
      .select("slug, title, description")
      .eq("slug", row.slug)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      skippedMissing += 1;
      console.log(`skip missing slug: ${row.slug}`);
      continue;
    }
    if (data.title === row.title && data.description === row.description) {
      unchanged += 1;
      continue;
    }
    const { error: updateError } = await client
      .from("styles")
      .update({ title: row.title, description: row.description })
      .eq("slug", row.slug);
    if (updateError) throw updateError;
    updated += 1;
  }

  return { updated, skippedMissing, unchanged };
}

async function main() {
  const { styles, guides, changedFromCsv } = loadRetitles();
  console.log(`Loaded ${styles.length} style rows and ${guides.length} guide rows`);

  if (changedFromCsv.length) {
    console.log("Sanity overrides vs CSV:");
    for (const change of changedFromCsv) {
      console.log(`- ${change.slug}`);
      console.log(`  from: ${change.fromTitle}`);
      console.log(`  to:   ${change.toTitle}`);
      console.log(`  why:  ${change.reason}`);
    }
  }

  const repo = applyRepoUpdates(styles, guides);
  console.log(
    `Repo: seed fields touched=${repo.seedHits}, publish fields touched=${repo.publishHits}, guides updated=${repo.guideHits}`,
  );
  if (repo.missingSeeds.length) {
    console.log(
      `No seed/publish match for ${repo.missingSeeds.length} slug(s) (retired or absent):`,
    );
    for (const slug of repo.missingSeeds) console.log(`  - ${slug}`);
  }

  const db = await applyDatabaseUpdates(styles);
  console.log(
    `DB: updated=${db.updated}, unchanged=${db.unchanged}, skippedMissing=${db.skippedMissing}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Converts MCP SQL export files into INSERT SQL for the Singapore project.
 * Usage: node scripts/prepare-sin1-sql.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "tmp", "sin1-migrate");
const OLD = "vdsysqvdvdxlmvtsaejf";
const NEW = "rbmirzmppbytorbhncxj";
const AGENT = path.join(
  process.env.USERPROFILE || "",
  ".cursor/projects/c-my-work-directory-Business-image-prompts-website-v3/agent-tools",
);

fs.mkdirSync(OUT, { recursive: true });

function extractJsonArray(filePath, key) {
  const text = fs.readFileSync(filePath, "utf8");
  const obj = JSON.parse(text);
  let payload = obj;
  if (typeof obj.result === "string") {
    const match = obj.result.match(
      /<untrusted-data-[a-f0-9-]+>\s*(\[[\s\S]*?\])\s*<\/untrusted-data-[a-f0-9-]+>/,
    );
    if (!match) throw new Error(`No untrusted JSON payload in ${filePath}`);
    payload = JSON.parse(match[1].trim());
  }
  const row = Array.isArray(payload) ? payload[0] : payload;
  const data = row[key];
  if (!Array.isArray(data)) throw new Error(`Missing ${key} in ${filePath}`);
  return data;
}

function sqlLiteral(value) {
  if (value === null || value === undefined) return "null";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "object") {
    return `${JSON.stringify(JSON.stringify(value))}::jsonb`;
  }
  return `'${String(value).replace(/'/g, "''")}'`;
}

function arrayLiteral(arr, cast = "text[]") {
  if (!arr) return `'{}'::${cast}`;
  const inner = arr
    .map((v) => `"${String(v).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`)
    .join(",");
  return `'{${inner}}'::${cast}`;
}

function rewriteUrl(url) {
  if (typeof url !== "string") return url;
  return url.split(OLD).join(NEW);
}

function writeInsert(table, columns, rows, transform) {
  const chunks = [];
  const size = 5;
  for (let i = 0; i < rows.length; i += size) {
    const slice = rows.slice(i, i + size);
    const values = slice
      .map((row) => {
        const r = transform(row);
        return `(${columns.map((c) => r[c]).join(", ")})`;
      })
      .join(",\n");
    chunks.push(
      `insert into ${table} (${columns.join(", ")}) values\n${values}\non conflict do nothing;`,
    );
  }
  const file = path.join(OUT, `${table.replace(".", "_")}.sql`);
  fs.writeFileSync(file, chunks.join("\n\n"));
  console.log("wrote", path.basename(file), "rows", rows.length, "chunks", chunks.length);
  return chunks;
}

const categories = [
  ["82b05c94-af71-54b2-b729-058a5c6683d8", "Professional portraits", "professional-portraits", 0, "2026-09-20T12:29:01.544569+00:00"],
  ["97b81f65-f003-546f-a1c5-d9134324563e", "Cinematic", "cinematic", 1, "2026-09-20T12:29:00.131939+00:00"],
  ["b18c1468-db02-5d32-8223-3d34645081f8", "Painting", "painting", 2, "2026-09-20T12:29:01.107513+00:00"],
  ["45b6b9cc-8ec3-5fca-bef8-8f1630ee4e0d", "Vintage", "vintage", 2, "2026-09-20T12:29:00.673215+00:00"],
  ["d393b595-8d9e-5bad-be82-2f60ece23afb", "Travel", "travel", 3, "2026-09-20T12:29:03.760117+00:00"],
  ["1d0c68da-32d8-5913-b5e3-6178ce0687bb", "Anime", "anime", 4, "2026-09-20T12:29:02.013958+00:00"],
  ["7063ddc4-1265-5926-ab2c-e72849d09677", "Fantasy", "fantasy", 4, "2026-09-20T12:29:02.875821+00:00"],
  ["2aeefdfc-961e-5bc5-a7f3-f734ac61c7df", "3D avatars", "3d-avatars", 5, "2026-09-20T12:29:02.433606+00:00"],
  ["e5fece9a-75be-5e1a-aae0-4ba1d210c8fc", "Product and objects", "product-and-objects", 5, "2026-09-20T12:29:04.176214+00:00"],
  ["9ae1d285-85dc-55af-af81-6d51c3be18cb", "Pets", "pets", 7, "2026-09-20T12:29:03.328484+00:00"],
].map(([id, name, slug, sort_order, created_at]) => ({ id, name, slug, sort_order, created_at }));

writeInsert(
  "public.categories",
  ["id", "name", "slug", "sort_order", "created_at"],
  categories,
  (r) => ({
    id: sqlLiteral(r.id),
    name: sqlLiteral(r.name),
    slug: sqlLiteral(r.slug),
    sort_order: sqlLiteral(r.sort_order),
    created_at: sqlLiteral(r.created_at),
  }),
);

const tagsData = [
  ["75a8dd83-6dcf-5875-b0b6-3f9db799d443", "intent", "Artistic restyle", "intent-artistic-restyle", "2026-09-20T12:29:16.88813+00:00"],
  ["f72aed36-5048-5f27-b0bd-8781e9bf413f", "intent", "Change background", "intent-change-background", "2026-09-20T12:29:26.146133+00:00"],
  ["89644fd6-d7a4-596d-a24e-991ef85bda79", "intent", "Change lighting", "intent-change-lighting", "2026-09-20T12:29:07.584958+00:00"],
  ["0aa2d3a4-b45f-5840-b70d-4c64b198624c", "tool", "ChatGPT Image", "tool-chatgpt-image", "2026-09-20T12:29:08.417309+00:00"],
  ["eb16ed75-1e0c-5ad4-8bd0-9d285312a997", "tool", "Flux", "tool-flux", "2026-09-20T12:29:36.866574+00:00"],
  ["bcd45ba0-de01-54cd-9f62-e6ddc2f6d1be", "intent", "Full scene transformation", "intent-full-scene-transformation", "2026-09-20T12:29:31.354608+00:00"],
  ["83f5177c-bf1d-53a1-aa94-9fc2a28f6297", "tool", "Gemini", "tool-gemini", "2026-09-20T12:29:13.081572+00:00"],
  ["e63c761f-26c0-598b-9ec6-a38a2cf88081", "subject", "Group", "subject-group", "2026-09-20T12:29:16.031543+00:00"],
  ["a1d17d4f-5e68-525e-85ee-53bc87a1f989", "intent", "New outfit or theme", "intent-new-outfit-or-theme", "2026-09-20T12:29:41.361278+00:00"],
  ["793aa330-509e-5c51-8353-bd2f343bea70", "tool", "Other AI editor", "tool-other-ai-editor", "2026-09-20T12:29:22.349473+00:00"],
  ["2158f8fd-4d0f-5b9f-8828-dca0347e0f59", "subject", "Person", "subject-person", "2026-09-20T12:29:06.746736+00:00"],
  ["bfcc625d-f380-56bf-a65f-f1a07b90fac0", "subject", "Pet", "subject-pet", "2026-09-20T12:29:45.194801+00:00"],
  ["631b10af-d1a7-5377-9e75-00afa0782c8b", "subject", "Place", "subject-place", "2026-09-20T12:29:50.142211+00:00"],
  ["35d50ebd-4746-54d2-a24e-fa6c897f2b60", "subject", "Product or object", "subject-product-or-object", "2026-09-20T12:29:59.546507+00:00"],
].map(([id, kind, name, slug, created_at]) => ({ id, kind, name, slug, created_at }));

writeInsert(
  "public.tags",
  ["id", "name", "slug", "kind", "created_at"],
  tagsData,
  (r) => ({
    id: sqlLiteral(r.id),
    name: sqlLiteral(r.name),
    slug: sqlLiteral(r.slug),
    kind: sqlLiteral(r.kind),
    created_at: sqlLiteral(r.created_at),
  }),
);

const styles = extractJsonArray(path.join(AGENT, "30b075da-be15-4951-aefb-dbbd7cdd9e41.txt"), "styles");
writeInsert(
  "public.styles",
  [
    "id", "slug", "title", "category_id", "summary", "description", "supported_subjects",
    "edit_intent", "input_requirement", "photo_requirements", "preservation_targets",
    "change_targets", "target_source_photo", "card_height", "save_count", "status",
    "author_id", "published_at", "created_at", "updated_at", "trending_rank",
  ],
  styles,
  (r) => ({
    id: sqlLiteral(r.id),
    slug: sqlLiteral(r.slug),
    title: sqlLiteral(r.title),
    category_id: sqlLiteral(r.category_id),
    summary: sqlLiteral(r.summary),
    description: sqlLiteral(r.description),
    supported_subjects: arrayLiteral(r.supported_subjects),
    edit_intent: sqlLiteral(r.edit_intent),
    input_requirement: sqlLiteral(r.input_requirement),
    photo_requirements: sqlLiteral(r.photo_requirements),
    preservation_targets: arrayLiteral(r.preservation_targets),
    change_targets: arrayLiteral(r.change_targets),
    target_source_photo: sqlLiteral(r.target_source_photo),
    card_height: sqlLiteral(r.card_height),
    save_count: sqlLiteral(r.save_count),
    status: sqlLiteral(r.status),
    author_id: sqlLiteral(r.author_id),
    published_at: sqlLiteral(r.published_at),
    created_at: sqlLiteral(r.created_at),
    updated_at: sqlLiteral(r.updated_at),
    trending_rank: sqlLiteral(r.trending_rank),
  }),
);

const variants = extractJsonArray(path.join(AGENT, "7c486192-ee8a-4c4e-ab14-78c0e4400eb7.txt"), "prompt_variants");
writeInsert(
  "public.prompt_variants",
  [
    "id", "style_id", "tool", "mode", "input_image_count", "input_image_roles", "version",
    "template", "variables", "settings", "test_record", "is_primary", "status", "created_at", "updated_at",
  ],
  variants,
  (r) => ({
    id: sqlLiteral(r.id),
    style_id: sqlLiteral(r.style_id),
    tool: sqlLiteral(r.tool),
    mode: sqlLiteral(r.mode),
    input_image_count: sqlLiteral(r.input_image_count),
    input_image_roles: sqlLiteral(r.input_image_roles),
    version: sqlLiteral(r.version),
    template: sqlLiteral(r.template),
    variables: sqlLiteral(r.variables),
    settings: sqlLiteral(r.settings),
    test_record: sqlLiteral(r.test_record),
    is_primary: sqlLiteral(r.is_primary),
    status: sqlLiteral(r.status),
    created_at: sqlLiteral(r.created_at),
    updated_at: sqlLiteral(r.updated_at),
  }),
);

const assets = extractJsonArray(path.join(AGENT, "29241376-b4a6-46ba-a95d-ac81419f0d01.txt"), "style_assets");
writeInsert(
  "public.style_assets",
  [
    "id", "style_id", "kind", "source_storage_key", "result_storage_key",
    "alt_text", "provenance", "sort_order", "created_at",
  ],
  assets,
  (r) => ({
    id: sqlLiteral(r.id),
    style_id: sqlLiteral(r.style_id),
    kind: sqlLiteral(r.kind),
    source_storage_key: sqlLiteral(rewriteUrl(r.source_storage_key)),
    result_storage_key: sqlLiteral(rewriteUrl(r.result_storage_key)),
    alt_text: sqlLiteral(r.alt_text),
    provenance: sqlLiteral(r.provenance),
    sort_order: sqlLiteral(r.sort_order),
    created_at: sqlLiteral(r.created_at),
  }),
);

// Save object list for storage copy
const objects = [
  ...Array.from({ length: 30 }, (_, i) => `seed/catalog/editorial/result-${String(i + 1).padStart(2, "0")}.webp`),
  ...Array.from({ length: 30 }, (_, i) => `seed/catalog/editorial/source-${String(i + 1).padStart(2, "0")}.webp`),
  ...Array.from({ length: 10 }, (_, i) => `seed/catalog/product/result-${String(i + 1).padStart(2, "0")}.webp`),
  ...Array.from({ length: 10 }, (_, i) => `seed/catalog/product/source-${String(i + 1).padStart(2, "0")}.webp`),
];
fs.writeFileSync(path.join(OUT, "storage-objects.json"), JSON.stringify(objects, null, 2));
console.log("done", { styles: styles.length, variants: variants.length, assets: assets.length, objects: objects.length });

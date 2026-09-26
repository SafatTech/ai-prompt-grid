import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, "queries");
fs.mkdirSync(outDir, { recursive: true });

const manifest = JSON.parse(
  fs.readFileSync(path.join(here, "mcp-wrapped/manifest.json"), "utf8"),
);
const start = Number(process.argv[2] ?? 1);
const end = Number(process.argv[3] ?? manifest.length - 1);

for (let i = start; i <= end && i < manifest.length; i++) {
  const entry = manifest[i];
  const { query } = JSON.parse(fs.readFileSync(entry.out, "utf8"));
  const name = path.basename(entry.out, ".json");
  fs.writeFileSync(path.join(outDir, `${String(i).padStart(3, "0")}-${name}.sql`), query);
  console.log("wrote", i, name, query.length);
}

for (const extra of ["style_tags.json", "assets-all.json"]) {
  const file = path.join(here, "mcp-wrapped", extra);
  if (!fs.existsSync(file)) continue;
  const { query } = JSON.parse(fs.readFileSync(file, "utf8"));
  fs.writeFileSync(path.join(outDir, extra.replace(".json", ".sql")), query);
  console.log("wrote", extra, query.length);
}

// variants: per-chunk only (manifest 8-15)
for (let i = 8; i <= 15 && i < manifest.length; i++) {
  const entry = manifest[i];
  const { query } = JSON.parse(fs.readFileSync(entry.out, "utf8"));
  const name = path.basename(entry.out, ".json");
  fs.writeFileSync(path.join(outDir, `${String(i).padStart(3, "0")}-${name}.sql`), query);
}

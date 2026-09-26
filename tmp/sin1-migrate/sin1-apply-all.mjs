import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fixExportSql } from "./fix-export-sql.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectId = "rbmirzmppbytorbhncxj";

function wrapSql(sql) {
  const b64 = Buffer.from(sql, "utf8").toString("base64");
  return `DO $mig$ BEGIN EXECUTE convert_from(decode('${b64}', 'base64'), 'UTF8'); END $mig$;`;
}

function collectSqlFiles() {
  const files = [];
  for (const dir of ["public_styles", "public_prompt_variants", "public_style_assets"]) {
    const d = path.join(here, "chunks2", dir);
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".sql")).sort()) {
      files.push(path.join(d, f));
    }
  }
  return files;
}

const outDir = path.join(here, "mcp-wrapped");
fs.mkdirSync(outDir, { recursive: true });

const manifest = [];
for (const sqlPath of collectSqlFiles()) {
  const raw = fs.readFileSync(sqlPath, "utf8");
  const fixed = fixExportSql(raw);
  const wrapped = wrapSql(fixed);
  const name = path.relative(path.join(here, "chunks2"), sqlPath).replace(/[/\\]/g, "__");
  const payload = { project_id: projectId, query: wrapped };
  const out = path.join(outDir, `${name}.json`);
  fs.writeFileSync(out, JSON.stringify(payload));
  manifest.push({ sqlPath, out, queryLen: wrapped.length });
}

for (const rootFile of ["public_categories.sql", "public_tags.sql"]) {
  const p = path.join(here, rootFile);
  if (!fs.existsSync(p)) continue;
  const fixed = fixExportSql(fs.readFileSync(p, "utf8"));
  const wrapped = wrapSql(fixed);
  const out = path.join(outDir, rootFile.replace(".sql", ".json"));
  fs.writeFileSync(out, JSON.stringify({ project_id: projectId, query: wrapped }));
  manifest.push({ sqlPath: p, out, queryLen: wrapped.length });
}

fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`Wrote ${manifest.length} MCP payloads to ${outDir}`);

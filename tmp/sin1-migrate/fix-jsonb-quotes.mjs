import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const BAD = ', "[\\"source photo\\"]"::jsonb';
const GOOD = ", '[\"source photo\"]'::jsonb";

function fixInnerSql(sql) {
  if (!sql.includes(BAD)) return sql;
  return sql.split(BAD).join(GOOD);
}

function fixWrappedDo(filePath) {
  let q = fs.readFileSync(filePath, "utf8");
  if (!q.includes("decode('")) return false;
  const start = q.indexOf("decode('") + 8;
  const end = q.indexOf("', 'base64')");
  const inner = Buffer.from(q.slice(start, end), "base64").toString("utf8");
  const fixed = fixInnerSql(inner);
  if (fixed === inner) return false;
  const b64 = Buffer.from(fixed, "utf8").toString("base64");
  const out = q.slice(0, start) + b64 + q.slice(end);
  fs.writeFileSync(filePath, out);
  return true;
}

function fixPlain(filePath) {
  let q = fs.readFileSync(filePath, "utf8");
  const fixed = fixInnerSql(q);
  if (fixed === q) return false;
  fs.writeFileSync(filePath, fixed);
  return true;
}

function fixMcpJson(filePath) {
  const j = JSON.parse(fs.readFileSync(filePath, "utf8"));
  let q = j.query;
  q = q.split(', \\"[\\\\\\"source photo\\\\\\"\\]"::jsonb').join(GOOD);
  q = q.split(BAD).join(GOOD);
  if (q === j.query) return false;
  j.query = q;
  fs.writeFileSync(filePath, JSON.stringify(j));
  return true;
}

const dirs = [
  path.join(here, "queries-out"),
  path.join(here, "mcp-invoke"),
  path.join(here, "apply-queue"),
  path.join(here, "chunks2", "public_prompt_variants"),
  here,
];

const extraFiles = ["mcp-variants-0.json", "mcp-variants-1.json", "mcp-variants-2.json", "mcp-variants-3.json"];

let n = 0;
for (const f of extraFiles) {
  const fp = path.join(here, f);
  if (fs.existsSync(fp) && fixMcpJson(fp)) n++;
}
for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    const fp = path.join(dir, f);
    if (f.endsWith(".sql")) {
      if (fixWrappedDo(fp) || fixPlain(fp)) n++;
    } else if (f.endsWith(".json")) {
      try {
        if (fixMcpJson(fp)) n++;
      } catch {
        /* skip */
      }
    }
  }
}
console.log("fixed files:", n);

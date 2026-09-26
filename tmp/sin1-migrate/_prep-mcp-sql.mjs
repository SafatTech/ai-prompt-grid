/**
 * Emit one SQL query string per chunk for MCP apply.
 * Prefers apply-ready (padded base64) over queries-out.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const start = Number(process.argv[2] ?? 9);
const end = Number(process.argv[3] ?? 41);
const outDir = path.join(here, "_mcp-sql-ready");
fs.mkdirSync(outDir, { recursive: true });

const preferred = ["apply-ready", "mcp-invoke", "queries-out"];

for (let i = start; i <= end; i++) {
  const base = i === 42 ? "42-style_tags" : String(i).padStart(2, "0");
  let query = null;
  let src = null;
  for (const d of preferred) {
    const sqlPath = path.join(here, d, `${base}.sql`);
    const jsonPath = path.join(here, d, `${base}.json`);
    if (fs.existsSync(sqlPath)) {
      query = fs.readFileSync(sqlPath, "utf8").trim();
      src = sqlPath;
      break;
    }
    if (fs.existsSync(jsonPath)) {
      query = JSON.parse(fs.readFileSync(jsonPath, "utf8")).query;
      src = jsonPath;
      break;
    }
  }
  if (!query) {
    console.error("missing", base);
    process.exit(1);
  }
  // ensure base64 padding for Postgres decode()
  query = query.replace(/decode\('([A-Za-z0-9+/]+)=*'/, (_, b64) => {
    const pad = (4 - (b64.length % 4)) % 4;
    return `decode('${b64}${"=".repeat(pad)}'`;
  });
  fs.writeFileSync(path.join(outDir, `${base}.sql`), query);
  console.log(base, "from", path.relative(here, src), "len", query.length);
}

/**
 * Print chunk id + query length for MCP apply range.
 * Agent: read mcp-invoke/{id}.json query via fs and execute_sql.
 * Usage: node mcp-apply-range.mjs 8 42
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const start = Number(process.argv[2] ?? 8);
const end = Number(process.argv[3] ?? 42);

for (let i = start; i <= end; i++) {
  const base = i === 42 ? "42-style_tags" : String(i).padStart(2, "0");
  const file = path.join(here, "mcp-invoke", `${base}.json`);
  const { query } = JSON.parse(fs.readFileSync(file, "utf8"));
  const out = path.join(here, `.q-${base}.txt`);
  fs.writeFileSync(out, query);
  console.log(base, query.length, out);
}

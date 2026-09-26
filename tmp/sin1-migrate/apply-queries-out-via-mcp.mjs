/**
 * Writes one MCP payload per queries-out chunk (for agent loop).
 * Usage: node apply-queries-out-via-mcp.mjs 9 42
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const qdir = path.join(here, "queries-out");
const outDir = path.join(here, "mcp-payloads-out");
fs.mkdirSync(outDir, { recursive: true });

const start = Number(process.argv[2] ?? 9);
const end = Number(process.argv[3] ?? 42);

for (let i = start; i <= end; i++) {
  const base = i === 42 ? "42-style_tags" : String(i).padStart(2, "0");
  const query = fs.readFileSync(path.join(qdir, `${base}.sql`), "utf8").trim();
  const payload = { project_id: "rbmirzmppbytorbhncxj", query };
  fs.writeFileSync(path.join(outDir, `${base}.json`), JSON.stringify(payload));
  console.log(base, query.length);
}

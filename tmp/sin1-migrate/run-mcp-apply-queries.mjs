/**
 * Prints each query file as JSON line for external MCP batch apply:
 * { "project_id": "...", "file": "...", "query": "..." }
 * Usage: node run-mcp-apply-queries.mjs [glob-prefix]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(here, "queries");
const prefix = process.argv[2] ?? "";
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".sql") && f.startsWith(prefix))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

for (const file of files) {
  const query = fs.readFileSync(path.join(dir, file), "utf8");
  console.log(JSON.stringify({ project_id: "rbmirzmppbytorbhncxj", file, query }));
}

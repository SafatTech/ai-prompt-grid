/**
 * Print manifest slice for MCP apply: node mcp-run-manifest.mjs <start> <end>
 * Outputs one JSON line per file: { name, project_id, queryLen }
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(
  fs.readFileSync(path.join(here, "mcp-wrapped/manifest.json"), "utf8"),
);
const start = Number(process.argv[2] ?? 0);
const end = Number(process.argv[3] ?? manifest.length - 1);
for (let i = start; i <= end && i < manifest.length; i++) {
  const entry = manifest[i];
  const payload = JSON.parse(fs.readFileSync(entry.out, "utf8"));
  console.log(
    JSON.stringify({
      index: i,
      name: path.basename(entry.out),
      project_id: payload.project_id,
      queryLen: payload.query.length,
    }),
  );
}

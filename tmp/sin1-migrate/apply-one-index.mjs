/**
 * Apply one manifest index by reading wrapped JSON path from argv.
 * Prints OK/FAIL only — actual SQL must be applied via MCP execute_sql using the query from mcp-wrapped file.
 * This script validates decode works locally.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(
  fs.readFileSync(path.join(here, "mcp-wrapped/manifest.json"), "utf8"),
);
const i = Number(process.argv[2]);
const entry = manifest[i];
const payload = JSON.parse(fs.readFileSync(entry.out, "utf8"));
console.log(path.basename(entry.out), payload.query.length);

/** Print one chunk query for MCP (filename as argv[2]) */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const name = process.argv[2];
if (!name) {
  console.error("Usage: node apply-chunk-shell.mjs 04.sql");
  process.exit(1);
}
const file = name.endsWith(".sql") ? name : `${name}.sql`;
const query = fs.readFileSync(path.join(here, "queries-out", file), "utf8").trim();
process.stdout.write(query);

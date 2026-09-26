/**
 * Dump decoded plain SQL for a chunk (for MCP execute_sql).
 * Usage: node _dump-plain.mjs 09
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const base = process.argv[2];
const sql = fs.readFileSync(path.join(here, "_mcp-sql-ready", `${base}.sql`), "utf8");
const m = sql.match(/decode\('([A-Za-z0-9+/=]+)'/);
const plain = Buffer.from(m[1], "base64").toString("utf8");
const out = path.join(here, "_plain", `${base}.sql`);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, plain);
console.log(out, plain.length);
console.log("roles snippet:", plain.match(/,\s*'?\[[^\]]{0,40}\]'?::jsonb/)?.[0]);

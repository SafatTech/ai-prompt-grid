/**
 * Rebuild DO $mig$ wrappers with Postgres-safe padded base64 from queries-out
 * (already jsonb-fixed) into _mcp-sql-ready.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(here, "queries-out");
const outDir = path.join(here, "_mcp-sql-ready");
const plainDir = path.join(here, "_plain");
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(plainDir, { recursive: true });

const start = Number(process.argv[2] ?? 9);
const end = Number(process.argv[3] ?? 41);
const re = /decode\('([A-Za-z0-9+/=]+)'/;

const BAD = ', "[\\"source photo\\"]"::jsonb';
const GOOD = ", '[\"source photo\"]'::jsonb";

for (let i = start; i <= end; i++) {
  const base = i === 42 ? "42-style_tags" : String(i).padStart(2, "0");
  const sql = fs.readFileSync(path.join(srcDir, `${base}.sql`), "utf8").trim();
  const m = sql.match(re);
  if (!m) throw new Error(`no base64 in ${base}`);
  let text = Buffer.from(m[1], "base64").toString("utf8");
  text = text.split(BAD).join(GOOD);
  // catch any remaining double-quoted jsonb arrays
  text = text.replace(/, "(\[[\s\S]*?\])"::jsonb/g, (full, arr) => {
    try {
      const parsed = JSON.parse(arr.replace(/\\"/g, '"'));
      return `, '${JSON.stringify(parsed)}'::jsonb`;
    } catch {
      return full;
    }
  });

  const b64 = Buffer.from(text, "utf8").toString("base64");
  const out = `DO $mig$ BEGIN EXECUTE convert_from(decode('${b64}', 'base64'), 'UTF8'); END $mig$;`;
  fs.writeFileSync(path.join(outDir, `${base}.sql`), out);
  fs.writeFileSync(path.join(plainDir, `${base}.sql`), text);

  const bad =
    text.includes(BAD) ||
    /"\[.*source.*\]"::jsonb/.test(text) ||
    text.includes('"[\\"');
  const roles = text.match(/,\s*'?\[[^\]]{0,40}\]'?::jsonb/)?.[0] ?? "";
  console.log(base, "len", out.length, "plain", text.length, "bad", bad, "roles", roles);
}

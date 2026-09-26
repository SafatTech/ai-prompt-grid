/**
 * Split a wrapped DO SQL into N base64 pieces for MCP stitch apply
 * using durable table public._mig_b64_tmp.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const name = process.argv[2];
const src = process.argv[3];
const partSize = Number(process.argv[4] ?? 5000);

const sql = fs.readFileSync(src, "utf8").trim();
const m = sql.match(/decode\('([A-Za-z0-9+/=]+)'/);
if (!m) throw new Error("no base64");
const b64 = m[1];
const parts = [];
for (let i = 0; i < b64.length; i += partSize) parts.push(b64.slice(i, i + partSize));

const outDir = path.join(here, "_stitch", name);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "parts.json"), JSON.stringify(parts));

fs.writeFileSync(
  path.join(outDir, "00-setup.sql"),
  "create table if not exists public._mig_b64_tmp (ord int primary key, chunk text);\ntruncate public._mig_b64_tmp;",
);

parts.forEach((p, i) => {
  fs.writeFileSync(
    path.join(outDir, `${String(i + 1).padStart(2, "0")}-part.sql`),
    `insert into public._mig_b64_tmp(ord, chunk) values (${i}, '${p}');`,
  );
});

fs.writeFileSync(
  path.join(outDir, "zz-finish.sql"),
  `DO $mig$ DECLARE q text; BEGIN
  SELECT convert_from(decode(string_agg(chunk, '' ORDER BY ord), 'base64'), 'UTF8') INTO q
  FROM public._mig_b64_tmp;
  EXECUTE q;
  TRUNCATE public._mig_b64_tmp;
END $mig$;`,
);

console.log(name, "parts", parts.length, "b64", b64.length);

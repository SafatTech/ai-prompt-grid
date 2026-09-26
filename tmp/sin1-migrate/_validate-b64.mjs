import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(here, "queries-out");
const re = /decode\('([A-Za-z0-9+/=]+)'/;

for (let i = 9; i <= 41; i++) {
  const base = String(i).padStart(2, "0");
  const sql = fs.readFileSync(path.join(dir, `${base}.sql`), "utf8").trim();
  const m = sql.match(re);
  if (!m) {
    console.log(base, "NO_MATCH", sql.slice(0, 80));
    continue;
  }
  const b64 = m[1];
  const padOk = b64.length % 4 === 0;
  try {
    const text = Buffer.from(b64, "base64").toString("utf8");
    const round = Buffer.from(text, "utf8").toString("base64").replace(/=+$/, "");
    const orig = b64.replace(/=+$/, "");
    console.log(
      base,
      "ok",
      "len",
      b64.length,
      "mod4",
      b64.length % 4,
      "padOk",
      padOk,
      "decoded",
      text.length,
      "starts",
      text.slice(0, 50).replace(/\n/g, " "),
      "roundtrip",
      round === orig,
    );
  } catch (e) {
    console.log(base, "DECODE_ERR", e.message, "len", b64.length, "mod4", b64.length % 4);
  }
}

// also check apply-ready and mcp-invoke 09
for (const rel of ["apply-ready/09.sql", "mcp-invoke/09.json"]) {
  const p = path.join(here, rel);
  if (!fs.existsSync(p)) continue;
  let sql;
  if (rel.endsWith(".json")) {
    sql = JSON.parse(fs.readFileSync(p, "utf8")).query;
  } else {
    sql = fs.readFileSync(p, "utf8").trim();
  }
  const m = sql.match(re);
  console.log(
    "compare",
    rel,
    "qlen",
    sql.length,
    "b64len",
    m?.[1]?.length,
    "mod4",
    m?.[1]?.length % 4,
  );
}

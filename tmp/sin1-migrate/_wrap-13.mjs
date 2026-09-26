import fs from "fs";

const sql = fs
  .readFileSync("tmp/sin1-migrate/_mcp-sql-ready/13.sql", "utf8")
  .trim();
const m = sql.match(/decode\('([^']+)'/);
if (!m) throw new Error("no decode");
const b64 = m[1];
const LINE = 200;
const parts = [];
for (let i = 0; i < b64.length; i += LINE) {
  parts.push("  '" + b64.slice(i, i + LINE) + "'");
}
const out =
  "DO $mig$ BEGIN EXECUTE convert_from(decode(\n" +
  parts.join("\n") +
  "\n, 'base64'), 'UTF8'); END $mig$;\n";
fs.writeFileSync(
  "tmp/sin1-migrate/_stitch-lines/variants-13-direct.sql",
  out,
);
console.log(
  "wrapped",
  out.length,
  "lines",
  out.split("\n").length,
  "max",
  Math.max(...out.split("\n").map((l) => l.length)),
);

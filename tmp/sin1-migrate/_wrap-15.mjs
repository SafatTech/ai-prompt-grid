import fs from "fs";

const sql = fs
  .readFileSync("tmp/sin1-migrate/_mcp-sql-ready/15.sql", "utf8")
  .trim();
const m = sql.match(/decode\('([^']+)'/);
if (!m) throw new Error("no decode");
const b64 = m[1];
const LINE = 200;
const parts = [];
for (let j = 0; j < b64.length; j += LINE) {
  parts.push("  '" + b64.slice(j, j + LINE) + "'");
}
const out =
  "DO $mig$ BEGIN EXECUTE convert_from(decode(\n" +
  parts.join("\n") +
  "\n, 'base64'), 'UTF8'); END $mig$;\n";
fs.mkdirSync("tmp/sin1-migrate/_stitch-lines", { recursive: true });
fs.writeFileSync("tmp/sin1-migrate/_stitch-lines/variants-15-direct.sql", out);
console.log("15 wrapped", out.length, "maxLine", Math.max(...out.split("\n").map((l) => l.length)));

for (const s of ["variants-11", "variants-12", "variants-13"]) {
  const dir = "tmp/sin1-migrate/_stitch-lines/" + s;
  const files = fs.readdirSync(dir).filter((f) => f.includes("part")).sort();
  console.log(s, files.length, files.join(","));
}

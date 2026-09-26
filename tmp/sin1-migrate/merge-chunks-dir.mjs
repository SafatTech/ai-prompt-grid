import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fixExportSql } from "./fix-export-sql.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const dirName = process.argv[2];
const outName = process.argv[3];
if (!dirName || !outName) {
  console.error("Usage: node merge-chunks-dir.mjs <chunks2/subdir> <out-json-name>");
  process.exit(1);
}

const dir = path.join(here, "chunks2", dirName);
let sql = "";
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".sql")).sort()) {
  sql += fixExportSql(fs.readFileSync(path.join(dir, f), "utf8"));
  sql += "\n\n";
}
const b64 = Buffer.from(sql, "utf8").toString("base64");
const wrapped = `DO $mig$ BEGIN EXECUTE convert_from(decode('${b64}', 'base64'), 'UTF8'); END $mig$;`;
const out = path.join(here, "mcp-wrapped", outName);
fs.writeFileSync(out, JSON.stringify({ project_id: "rbmirzmppbytorbhncxj", query: wrapped }));
console.log("wrote", out, "qlen", wrapped.length, "sqlBytes", Buffer.byteLength(sql));

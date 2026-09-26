import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fixExportSql } from "./fix-export-sql.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(here, "chunks2/public_styles");
let sql = "";
for (let i = 1; i < 8; i++) {
  sql += fixExportSql(fs.readFileSync(path.join(base, `chunk-${String(i).padStart(3, "0")}.sql`), "utf8"));
  sql += "\n\n";
}
const b64 = Buffer.from(sql, "utf8").toString("base64");
const wrapped = `DO $mig$ BEGIN EXECUTE convert_from(decode('${b64}', 'base64'), 'UTF8'); END $mig$;`;
const out = path.join(here, "mcp-wrapped/styles-chunks-1-7.json");
fs.writeFileSync(out, JSON.stringify({ project_id: "rbmirzmppbytorbhncxj", query: wrapped }));
console.log("wrote", out, "qlen", wrapped.length);

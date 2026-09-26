import fs from "node:fs";
import { fixExportSql } from "./fix-export-sql.mjs";

const sqlPath = process.argv[2];
if (!sqlPath) {
  console.error("Usage: node sin1-apply-chunk.mjs <path-to.sql>");
  process.exit(1);
}
const sql = fixExportSql(fs.readFileSync(sqlPath, "utf8"));
const b64 = Buffer.from(sql, "utf8").toString("base64");
const wrapped = `DO $mig$ BEGIN EXECUTE convert_from(decode('${b64}', 'base64'), 'UTF8'); END $mig$;`;
console.log(JSON.stringify({ project_id: "rbmirzmppbytorbhncxj", query: wrapped }));

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(here, "queries");
const outDir = path.join(here, "query-batches");
fs.mkdirSync(outDir, { recursive: true });

const maxLen = 90000;
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".sql"))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

let batch = [];
let batchLen = 0;
let batchIdx = 0;

function flush() {
  if (!batch.length) return;
  const sql = batch.join("\n");
  const b64 = Buffer.from(sql, "utf8").toString("base64");
  const wrapped = `DO $mig$ BEGIN EXECUTE convert_from(decode('${b64}', 'base64'), 'UTF8'); END $mig$;`;
  const out = path.join(outDir, `batch-${String(batchIdx).padStart(2, "0")}.sql`);
  fs.writeFileSync(out, wrapped);
  console.log("batch", batchIdx, "files", batch.length, "wrappedLen", wrapped.length);
  batchIdx++;
  batch = [];
  batchLen = 0;
}

for (const file of files) {
  const sql = fs.readFileSync(path.join(dir, file), "utf8");
  if (batchLen + sql.length > maxLen && batch.length) flush();
  batch.push(sql);
  batchLen += sql.length;
}
flush();

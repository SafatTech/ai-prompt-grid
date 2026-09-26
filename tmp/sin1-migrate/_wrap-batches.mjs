import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const plain = path.join(here, "_plain");
const outDir = path.join(here, "_batches");

function wrapRange(name, from, to) {
  const parts = [];
  for (let i = from; i <= to; i++) {
    const f = path.join(plain, `${String(i).padStart(2, "0")}.sql`);
    parts.push(fs.readFileSync(f, "utf8").trim());
  }
  const all = parts.join("\n");
  const b64 = Buffer.from(all, "utf8").toString("base64");
  const wrapped = `DO $mig$ BEGIN EXECUTE convert_from(decode('${b64}', 'base64'), 'UTF8'); END $mig$;`;
  fs.writeFileSync(path.join(outDir, `${name}.wrapped.sql`), wrapped);
  fs.writeFileSync(path.join(outDir, `${name}.plain.sql`), all);
  console.log(name, "wrapped", wrapped.length, "plain", all.length);
}

wrapRange("assets-17-28", 17, 28);
wrapRange("assets-29-39", 29, 39);
wrapRange("variants-09", 9, 9);
wrapRange("variants-10", 10, 10);
wrapRange("variants-11", 11, 11);
wrapRange("variants-12", 12, 12);
wrapRange("variants-13", 13, 13);
wrapRange("variants-14-15", 14, 15);
wrapRange("tags-41", 41, 41);

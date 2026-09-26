import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, ".chunks");
fs.mkdirSync(outDir, { recursive: true });
const qdir = path.join(here, "queries-out");

const list = [];
for (let i = 4; i <= 42; i++) {
  const base = i === 42 ? "42-style_tags" : String(i).padStart(2, "0");
  const src = path.join(qdir, `${base}.sql`);
  const dest = path.join(outDir, `${base}.sql`);
  fs.copyFileSync(src, dest);
  list.push(base);
}
fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(list, null, 2));
console.log("prepared", list.length, "chunks in", outDir);

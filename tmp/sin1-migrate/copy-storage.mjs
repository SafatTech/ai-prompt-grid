import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = "https://vdsysqvdvdxlmvtsaejf.supabase.co/storage/v1/object/public/catalog-public";
const DST = "https://rbmirzmppbytorbhncxj.supabase.co/storage/v1/object/catalog-public";
const ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibWlyem1wcGJ5dG9yYmhuY3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAzOTMwMDMsImV4cCI6MjEwNTk2OTAwM30.gTju4LP7HlzgmcGDuqmV1MKno08SV3OPZ4-vPus9Bjc";

const paths = JSON.parse(fs.readFileSync(path.join(here, "storage-objects.json"), "utf8"));
const failures = [];

for (const objectPath of paths) {
  const srcUrl = `${SRC}/${objectPath}`;
  const dstUrl = `${DST}/${objectPath}`;
  try {
    const dl = await fetch(srcUrl);
    if (!dl.ok) throw new Error(`download ${dl.status}`);
    const buf = Buffer.from(await dl.arrayBuffer());
    const up = await fetch(dstUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ANON}`,
        apikey: ANON,
        "Content-Type": "image/webp",
        "x-upsert": "true",
      },
      body: buf,
    });
    if (!up.ok) {
      const t = await up.text();
      throw new Error(`upload ${up.status} ${t.slice(0, 120)}`);
    }
    console.log("OK", objectPath);
  } catch (e) {
    console.error("FAIL", objectPath, e.message);
    failures.push({ objectPath, error: String(e.message) });
  }
}

fs.writeFileSync(
  path.join(here, "storage-copy-results.json"),
  JSON.stringify({ total: paths.length, failures }, null, 2),
);

/**
 * Apply queries-out/*.sql via Supabase Management API.
 * Usage: set SUPABASE_ACCESS_TOKEN then:
 *   node apply-chunks-api.mjs [start] [end]
 * start/end are chunk ids: 4 42 or file prefix like 42-style_tags
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const token = process.env.SUPABASE_ACCESS_TOKEN;
const projectId = "rbmirzmppbytorbhncxj";
const qdir = path.join(here, "queries-out");

if (!token) {
  console.error("SUPABASE_ACCESS_TOKEN not set");
  process.exit(2);
}

const start = Number(process.argv[2] ?? 4);
const end = Number(process.argv[3] ?? 42);
const log = [];

for (let i = start; i <= end; i++) {
  const base = i === 42 ? "42-style_tags" : String(i).padStart(2, "0");
  const file = `${base}.sql`;
  const query = fs.readFileSync(path.join(qdir, file), "utf8").trim();
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${projectId}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    },
  );
  const text = await res.text();
  const entry = { file, ok: res.ok, status: res.status, body: text.slice(0, 300) };
  log.push(entry);
  console.log(entry.ok ? "OK" : "FAIL", file, res.status);
  if (!res.ok) {
    console.error(text.slice(0, 400));
    break;
  }
}

fs.writeFileSync(
  path.join(here, "apply-chunks-api-log.json"),
  JSON.stringify(log, null, 2),
);

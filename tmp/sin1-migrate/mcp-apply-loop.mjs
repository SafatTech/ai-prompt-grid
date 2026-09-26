/**
 * Apply mcp-wrapped payloads via Supabase Management API (needs SUPABASE_ACCESS_TOKEN).
 * Usage: node mcp-apply-loop.mjs [startIndex] [endIndex]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const token = process.env.SUPABASE_ACCESS_TOKEN;
if (!token) {
  console.error("SUPABASE_ACCESS_TOKEN required");
  process.exit(1);
}

const manifest = JSON.parse(
  fs.readFileSync(path.join(here, "mcp-wrapped/manifest.json"), "utf8"),
);
const extraFiles = [
  path.join(here, "mcp-wrapped/style_tags.json"),
];
const start = Number(process.argv[2] ?? 1);
const end = Number(process.argv[3] ?? manifest.length - 1);

const results = [];
for (let i = start; i <= end && i < manifest.length; i++) {
  const entry = manifest[i];
  const name = path.basename(entry.out);
  const { project_id, query } = JSON.parse(fs.readFileSync(entry.out, "utf8"));
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${project_id}/database/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    },
  );
  const body = await res.text();
  results.push({ index: i, name, ok: res.ok, status: res.status, body: body.slice(0, 400) });
  console.log(res.ok ? "OK" : "FAIL", i, name, res.status);
  if (!res.ok) console.log(body.slice(0, 200));
}

for (const file of extraFiles) {
  if (!fs.existsSync(file)) continue;
  const name = path.basename(file);
  const { project_id, query } = JSON.parse(fs.readFileSync(file, "utf8"));
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${project_id}/database/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    },
  );
  const body = await res.text();
  results.push({ name, ok: res.ok, status: res.status, body: body.slice(0, 400) });
  console.log(res.ok ? "OK" : "FAIL", name, res.status);
}

const outPath = path.join(here, "apply-results.json");
const prev = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf8")) : [];
fs.writeFileSync(outPath, JSON.stringify([...prev, ...results], null, 2));

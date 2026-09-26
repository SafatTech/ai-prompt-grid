/**
 * Apply all mcp-wrapped/*.json payloads via Supabase Management API.
 * Requires: SUPABASE_ACCESS_TOKEN (from `supabase login` / dashboard PAT).
 *
 * Usage: node sin1-apply-manifest-loop.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const token = process.env.SUPABASE_ACCESS_TOKEN;
if (!token) {
  console.error("Set SUPABASE_ACCESS_TOKEN before running.");
  process.exit(1);
}

const manifest = JSON.parse(
  fs.readFileSync(path.join(here, "mcp-wrapped/manifest.json"), "utf8"),
);

const extras = ["variants-all.json", "assets-all.json", "styles-chunks-1-7.json"].map(
  (f) => path.join(here, "mcp-wrapped", f),
);

const files = [
  ...manifest.map((e) => e.out),
  ...extras.filter((f) => fs.existsSync(f)),
];

const results = [];
for (const file of files) {
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
  const ok = res.ok;
  results.push({ name, ok, status: res.status, body: body.slice(0, 300) });
  console.log(ok ? "OK" : "FAIL", name, res.status);
}

fs.writeFileSync(path.join(here, "apply-results.json"), JSON.stringify(results, null, 2));

/**
 * Apply every file in queries/*.sql via Supabase Management API.
 * Requires SUPABASE_ACCESS_TOKEN in environment.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const token = process.env.SUPABASE_ACCESS_TOKEN;
const projectId = "rbmirzmppbytorbhncxj";

if (!token) {
  console.error("Set SUPABASE_ACCESS_TOKEN (Supabase dashboard PAT).");
  process.exit(1);
}

const dir = path.join(here, "queries");
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".sql"))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const results = [];
for (const file of files) {
  const query = fs.readFileSync(path.join(dir, file), "utf8");
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${projectId}/database/query`,
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
  const row = { file, ok: res.ok, status: res.status, body: body.slice(0, 400) };
  results.push(row);
  console.log(row.ok ? "OK" : "FAIL", file, res.status);
  if (!row.ok) console.log(body.slice(0, 200));
}

fs.writeFileSync(
  path.join(here, "apply-results.json"),
  JSON.stringify(results, null, 2),
);
const failed = results.filter((r) => !r.ok);
process.exit(failed.length ? 1 : 0);

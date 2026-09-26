import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const token = process.argv[2];
if (!token) {
  console.error("Usage: node sin1-fire-all.mjs <SUPABASE_ACCESS_TOKEN>");
  process.exit(1);
}

const manifest = JSON.parse(
  fs.readFileSync(path.join(here, "mcp-wrapped/manifest.json"), "utf8"),
);

const results = [];
for (const entry of manifest) {
  const { project_id, query } = JSON.parse(fs.readFileSync(entry.out, "utf8"));
  const name = path.basename(entry.out);
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
  results.push({ name, ok: res.ok, status: res.status, body: body.slice(0, 200) });
  console.log(name, res.ok ? "ok" : "FAIL", res.status);
}

fs.writeFileSync(path.join(here, "fire-all-results.json"), JSON.stringify(results, null, 2));

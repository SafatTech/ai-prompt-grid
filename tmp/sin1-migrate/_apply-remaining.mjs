/**
 * Apply remaining chunks via Management API if SUPABASE_ACCESS_TOKEN is set.
 * Falls back to writing a status file listing what still needs MCP apply.
 *
 * Usage:
 *   SUPABASE_ACCESS_TOKEN=... node tmp/sin1-migrate/_apply-remaining.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectId = "rbmirzmppbytorbhncxj";
const token = process.env.SUPABASE_ACCESS_TOKEN;
const start = Number(process.argv[2] ?? 9);
const end = Number(process.argv[3] ?? 41);

const results = [];
for (let i = start; i <= end; i++) {
  const base = String(i).padStart(2, "0");
  const query = fs
    .readFileSync(path.join(here, "_mcp-sql-ready", `${base}.sql`), "utf8")
    .trim();
  if (!token) {
    results.push({ base, skipped: true, reason: "no token", len: query.length });
    continue;
  }
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
  const body = await res.text();
  const entry = {
    base,
    ok: res.ok,
    status: res.status,
    body: body.slice(0, 200),
  };
  results.push(entry);
  console.log(entry.ok ? "OK" : "FAIL", base, res.status);
  if (!res.ok) break;
}

fs.writeFileSync(
  path.join(here, "_apply-remaining-log.json"),
  JSON.stringify(results, null, 2),
);
if (!token) {
  console.error("SUPABASE_ACCESS_TOKEN not set; wrote plan only");
  process.exit(2);
}
process.exit(results.some((r) => r.ok === false) ? 1 : 0);

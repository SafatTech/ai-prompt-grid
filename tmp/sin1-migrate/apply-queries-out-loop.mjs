/**
 * Applies each file in queries-out/*.sql via Supabase Management API when
 * SUPABASE_ACCESS_TOKEN is set. Writes apply-queries-out-log.json.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(here, "queries-out");
const projectId = "rbmirzmppbytorbhncxj";
const token = process.env.SUPABASE_ACCESS_TOKEN;

const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".sql"))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const log = [];

if (!token) {
  console.error("No SUPABASE_ACCESS_TOKEN — use MCP execute_sql per mcp-call-*.json or queries-out/*.sql");
  process.exit(2);
}

for (const file of files) {
  const query = fs.readFileSync(path.join(dir, file), "utf8");
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
  if (!res.ok) {
    log.push({ file, status: "fail", http: res.status, body: text.slice(0, 300) });
    console.error("FAIL", file, res.status);
    break;
  }
  log.push({ file, status: "ok" });
  console.log("OK", file);
}

fs.writeFileSync(path.join(here, "apply-queries-out-log.json"), JSON.stringify(log, null, 2));

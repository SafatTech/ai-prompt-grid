/**
 * Apply all mcp-payloads/*.json via Supabase Management API.
 * Requires SUPABASE_ACCESS_TOKEN in environment (Cursor MCP uses this internally).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(here, "mcp-payloads");
const projectId = "rbmirzmppbytorbhncxj";
const token = process.env.SUPABASE_ACCESS_TOKEN;
if (!token) {
  console.error("SUPABASE_ACCESS_TOKEN not set");
  process.exit(2);
}

const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".json"))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const skip = new Set(["01.json"]);
const log = [];

for (const file of files) {
  if (skip.has(file)) {
    log.push({ file, status: "skipped" });
    continue;
  }
  const { query } = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
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
    log.push({ file, status: "fail", http: res.status, body: text.slice(0, 500) });
    console.error("FAIL", file, res.status, text.slice(0, 200));
    break;
  }
  log.push({ file, status: "ok" });
  console.log("OK", file);
}

fs.writeFileSync(path.join(here, "apply-all-log.json"), JSON.stringify(log, null, 2));

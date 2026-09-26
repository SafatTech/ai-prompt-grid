/**
 * Apply one .sql query file via Supabase Management API.
 * Usage: set SUPABASE_ACCESS_TOKEN then node apply-query-file.mjs <path-to.sql>
 */
import fs from "node:fs";

const token = process.env.SUPABASE_ACCESS_TOKEN;
const sqlPath = process.argv[2];
const projectId = "rbmirzmppbytorbhncxj";

if (!token || !sqlPath) {
  console.error("Usage: SUPABASE_ACCESS_TOKEN=... node apply-query-file.mjs <sql-file>");
  process.exit(1);
}

const query = fs.readFileSync(sqlPath, "utf8");
const res = await fetch(`https://api.supabase.com/v1/projects/${projectId}/database/query`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ query }),
});
const body = await res.text();
console.log(res.ok ? "OK" : "FAIL", sqlPath, res.status, body.slice(0, 300));
process.exit(res.ok ? 0 : 1);

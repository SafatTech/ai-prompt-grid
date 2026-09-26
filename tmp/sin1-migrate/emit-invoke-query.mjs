/** stdout: single JSON line { project_id, file, query } for MCP apply */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(here, "mcp-invoke");
const start = Number(process.argv[2] ?? 4);
const end = Number(process.argv[3] ?? 42);

const files = [];
for (let i = start; i <= end; i++) {
  const name = i === 42 ? "42-style_tags.json" : `${String(i).padStart(2, "0")}.json`;
  files.push(name);
}

for (const file of files) {
  const payload = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  process.stdout.write(JSON.stringify({ file, project_id: payload.project_id, query: payload.query }));
  process.stdout.write("\n");
}

/**
 * Prints one line per payload: INDEX<TAB>STATUS for agent to apply via MCP.
 * Usage: node mcp-apply-runner.mjs list
 *        node mcp-apply-runner.mjs query 02
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(here, "mcp-payloads");

function listFiles() {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

const cmd = process.argv[2];
if (cmd === "list") {
  for (const f of listFiles()) console.log(f);
} else if (cmd === "query") {
  const name = process.argv[3];
  const file = name.endsWith(".json") ? name : `${name}.json`;
  const payload = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  process.stdout.write(payload.query);
} else if (cmd === "meta") {
  const name = process.argv[3];
  const file = name.endsWith(".json") ? name : `${name}.json`;
  const payload = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  console.log(JSON.stringify({ project_id: payload.project_id, len: payload.query.length, file }));
} else {
  console.error("Usage: list | query <file> | meta <file>");
  process.exit(1);
}

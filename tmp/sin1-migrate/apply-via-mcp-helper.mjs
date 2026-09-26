/**
 * Prints one line per payload: index<TAB>ok|fail<TAB>message
 * Agent reads query from mcp-payloads/*.json and calls MCP execute_sql.
 * This script only validates decode by running against local... no, just lists files.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const payloadsDir = path.join(here, "mcp-payloads");
const batchDir = path.join(here, "mcp-payload-batch-00.json").replace("mcp-payload-batch-00.json", "");

const files = [
  ...fs.readdirSync(path.join(here, "query-batches")).filter((f) => f.startsWith("batch-") && f.endsWith(".sql")).sort(),
];

// Also list individual payloads
const singles = fs.readdirSync(payloadsDir).filter((f) => f.endsWith(".json")).sort();

console.log("BATCHES", files.length);
console.log("SINGLES", singles.length);

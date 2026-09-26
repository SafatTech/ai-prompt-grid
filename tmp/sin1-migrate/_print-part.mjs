/**
 * Apply one stitch-lines part via stdout for agent MCP paste.
 * Usage: node _print-part.mjs <set> <partNum>
 * Prints ONLY the SQL (no extra text).
 */
import fs from "fs";
const [set, part] = process.argv.slice(2);
const p = `tmp/sin1-migrate/_stitch-lines/${set}/${String(part).padStart(2,"0")}-part.sql`;
process.stdout.write(fs.readFileSync(p, "utf8").trim());

import fs from "fs";
import path from "path";

const set = process.argv[2];
const file = process.argv[3];
if (!set || !file) {
  console.error("Usage: node _print-sql.mjs <set> <filename>");
  process.exit(1);
}
const p = path.join("tmp/sin1-migrate/_stitch-lines", set, file);
process.stdout.write(fs.readFileSync(p, "utf8"));

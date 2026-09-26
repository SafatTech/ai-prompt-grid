import fs from "fs";
import path from "path";

/**
 * Emit one stitch part as a single-line SQL file safe for MCP paste.
 * Also builds combined batches under maxBytes.
 */
const set = process.argv[2];
const part = process.argv[3]; // e.g. 02 or "batch-a"
const dir = path.join("tmp/sin1-migrate/_stitch-lines", set);

if (part.startsWith("batch")) {
  const files =
    part === "batch-a"
      ? ["01", "02", "03"]
      : ["04", "05", "06", "07"];
  const sql = files
    .map((f) => fs.readFileSync(path.join(dir, `${f}-part.sql`), "utf8").trim())
    .join("\n");
  const out = path.join(dir, `${part}-oneline.sql`);
  // keep newlines - postgres fine; write as-is
  fs.writeFileSync(out, sql);
  console.log(out, sql.length);
} else {
  const sql = fs.readFileSync(path.join(dir, `${part}-part.sql`), "utf8").trim();
  console.log(sql.length);
}

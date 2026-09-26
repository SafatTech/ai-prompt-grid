import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(
  fs.readFileSync(path.join(here, "mcp-wrapped/manifest.json"), "utf8"),
);
const i = Number(process.argv[2]);
const entry = manifest[i];
if (!entry) process.exit(1);
const payload = JSON.parse(fs.readFileSync(entry.out, "utf8"));
process.stdout.write(payload.query);

import fs from "node:fs";

const s = fs.readFileSync(
  "c:/my-work-directory/Business/image-prompts-website-v3/tmp/sin1-migrate/chunks2/public_styles/chunk-000.sql",
  "utf8",
);
const i = s.indexOf("Face and identity");
const slice = s.slice(i - 5, i + 20);
console.log([...slice].map((c) => c.charCodeAt(0)).join(","));

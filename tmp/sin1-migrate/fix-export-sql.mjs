import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Fix Sydney export inserts: `"{"best":...}"::jsonb` → `'{"best":...}'::jsonb` */
export function fixExportSql(sql) {
  return sql.replace(/, "\{[\s\S]*?\}"::jsonb/g, (match) => {
    const inner = match.slice(3, -8);
    const json = inner.replace(/\\"/g, '"');
    return `, '${json.replace(/'/g, "''")}'::jsonb`;
  });
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain && process.argv[2]) {
  const fixed = fixExportSql(fs.readFileSync(process.argv[2], "utf8"));
  process.stdout.write(fixed);
}

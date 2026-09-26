import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const tags = JSON.parse(fs.readFileSync(path.join(here, "style_tags.json"), "utf8"));
const jsonLiteral = JSON.stringify(tags).replace(/'/g, "''");
const sql = `insert into public.style_tags (style_id, tag_id) select style_id, tag_id from jsonb_to_recordset('${jsonLiteral}'::jsonb) as x(style_id uuid, tag_id uuid) on conflict do nothing;`;
const b64 = Buffer.from(sql, "utf8").toString("base64");
const wrapped = `DO $mig$ BEGIN EXECUTE convert_from(decode('${b64}', 'base64'), 'UTF8'); END $mig$;`;
const out = path.join(here, "mcp-wrapped/style_tags.json");
fs.writeFileSync(out, JSON.stringify({ project_id: "rbmirzmppbytorbhncxj", query: wrapped }));
console.log("style_tags rows", tags.length, "queryLen", wrapped.length);

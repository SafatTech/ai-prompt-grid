import fs from "fs";
import path from "path";

const LINE = 200;

function escapeChunk(chunk) {
  // chunk is base64 — no quotes — but keep safe
  return chunk;
}

function sqlStringLiteral(chunk) {
  const parts = [];
  for (let i = 0; i < chunk.length; i += LINE) {
    parts.push("  '" + escapeChunk(chunk.slice(i, i + LINE)) + "'");
  }
  return parts.join("\n");
}

function prep(set) {
  const dir = path.join("tmp/sin1-migrate/_stitch", set);
  const out = path.join("tmp/sin1-migrate/_stitch-lines", set);
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(
    path.join(out, "00-setup.sql"),
    fs.readFileSync(path.join(dir, "00-setup.sql"), "utf8"),
  );
  const parts = fs
    .readdirSync(dir)
    .filter((f) => /^\d+-part\.sql$/.test(f))
    .sort();
  for (const f of parts) {
    const q = fs.readFileSync(path.join(dir, f), "utf8");
    const m = q.match(/values \((\d+), '([^']*)'\);?/);
    if (!m) throw new Error("parse " + f);
    const ord = m[1];
    const chunk = m[2];
    const sql =
      `insert into public._mig_b64_tmp(ord, chunk) values (${ord},\n` +
      sqlStringLiteral(chunk) +
      `\n);\n`;
    fs.writeFileSync(path.join(out, f), sql);
  }
  fs.writeFileSync(
    path.join(out, "zz-finish.sql"),
    fs.readFileSync(path.join(dir, "zz-finish.sql"), "utf8"),
  );
  const files = fs.readdirSync(out).sort();
  const maxLine = Math.max(
    ...files.flatMap((f) =>
      fs
        .readFileSync(path.join(out, f), "utf8")
        .split(/\r?\n/)
        .map((l) => l.length),
    ),
  );
  console.log(set, "files", files.length, "maxLine", maxLine);
}

for (const s of [
  "variants-10",
  "variants-11",
  "variants-12",
  "variants-13",
]) {
  prep(s);
}

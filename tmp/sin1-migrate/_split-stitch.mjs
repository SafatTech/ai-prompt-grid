import fs from "fs";
import path from "path";

const PIECE = 900;

function prep(set) {
  const dir = path.join("tmp/sin1-migrate/_stitch", set);
  const out = path.join("tmp/sin1-migrate/_stitch-small", set);
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
  let n = 0;
  for (const f of parts) {
    const q = fs.readFileSync(path.join(dir, f), "utf8");
    const m = q.match(/values \((\d+), '([^']*)'\);?/);
    if (!m) throw new Error("parse " + f);
    const ord = +m[1];
    const chunk = m[2];
    for (let i = 0; i < chunk.length; i += PIECE) {
      const piece = chunk.slice(i, i + PIECE);
      const sql =
        i === 0
          ? `insert into public._mig_b64_tmp(ord, chunk) values (${ord}, '${piece}');`
          : `update public._mig_b64_tmp set chunk = chunk || '${piece}' where ord = ${ord};`;
      const name =
        String(++n).padStart(3, "0") +
        `-o${ord}-p${Math.floor(i / PIECE)}.sql`;
      fs.writeFileSync(path.join(out, name), sql);
    }
  }
  fs.writeFileSync(
    path.join(out, "zz-finish.sql"),
    fs.readFileSync(path.join(dir, "zz-finish.sql"), "utf8"),
  );
  const files = fs.readdirSync(out).sort();
  const max = Math.max(
    ...files.map((f) => fs.statSync(path.join(out, f)).size),
  );
  console.log(set, "files", files.length, "max", max);
}

for (const s of [
  "variants-10",
  "variants-11",
  "variants-12",
  "variants-13",
]) {
  prep(s);
}

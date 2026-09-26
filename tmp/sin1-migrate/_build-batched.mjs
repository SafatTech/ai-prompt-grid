import fs from "fs";
import path from "path";

const PIECE = 900;

function build(set) {
  const dir = path.join("tmp/sin1-migrate/_stitch", set);
  const outDir = path.join("tmp/sin1-migrate/_stitch-batched", set);
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  const stmts = [];
  stmts.push(
    fs.readFileSync(path.join(dir, "00-setup.sql"), "utf8").trim(),
  );
  const parts = fs
    .readdirSync(dir)
    .filter((f) => /^\d+-part\.sql$/.test(f))
    .sort();
  for (const f of parts) {
    const q = fs.readFileSync(path.join(dir, f), "utf8");
    const m = q.match(/values \((\d+), '([^']*)'\);?/);
    const ord = +m[1];
    const chunk = m[2];
    for (let i = 0; i < chunk.length; i += PIECE) {
      const piece = chunk.slice(i, i + PIECE);
      if (i === 0) {
        stmts.push(
          `insert into public._mig_b64_tmp(ord, chunk) values (${ord}, '${piece}');`,
        );
      } else {
        stmts.push(
          `update public._mig_b64_tmp set chunk = chunk || '${piece}' where ord = ${ord};`,
        );
      }
    }
  }
  stmts.push(
    fs.readFileSync(path.join(dir, "zz-finish.sql"), "utf8").trim(),
  );

  const batches = [];
  let cur = [];
  let curLen = 0;
  for (const s of stmts) {
    if (curLen + s.length + 1 > 12000 && cur.length) {
      batches.push(cur.join("\n"));
      cur = [s];
      curLen = s.length;
    } else {
      cur.push(s);
      curLen += s.length + 1;
    }
  }
  if (cur.length) batches.push(cur.join("\n"));

  batches.forEach((b, i) => {
    const name = String(i + 1).padStart(2, "0") + ".sql";
    // wrap long lines for Read safety
    const wrapped = b
      .split("\n")
      .map((line) => {
        if (line.length <= 200) return line;
        // break string literals for readability only if insert/update with long quote
        return line;
      })
      .join("\n");
    fs.writeFileSync(path.join(outDir, name), wrapped);
    const maxLine = Math.max(...wrapped.split("\n").map((l) => l.length));
    console.log(
      set,
      name,
      "bytes",
      wrapped.length,
      "stmts",
      wrapped.split("\n").length,
      "maxLine",
      maxLine,
    );
  });
}

for (const s of [
  "variants-10",
  "variants-11",
  "variants-12",
  "variants-13",
]) {
  build(s);
}

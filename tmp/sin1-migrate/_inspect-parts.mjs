import fs from "fs";

function inspect(set) {
  const dir = `tmp/sin1-migrate/_stitch-lines/${set}`;
  for (const f of ["01", "02", "03", "04", "05", "06", "07"]) {
    const s = fs.readFileSync(`${dir}/${f}-part.sql`, "utf8");
    const om = s.match(/VALUES\s*\((\d+)/);
    const chunks = [...s.matchAll(/'([^']*)'/g)].map((m) => m[1]);
    // first match might be wrong - get only those after VALUES
    const idx = s.indexOf("VALUES");
    const after = s.slice(idx);
    const lit = [...after.matchAll(/'([^']*)'/g)].map((m) => m[1]);
    // skip the ord number if quoted - ord is unquoted
    const b64 = lit.join("");
    console.log(set, f, "ord", om?.[1], "b64len", b64.length, "lits", lit.length);
  }
}

for (const s of ["variants-11", "variants-12", "variants-13"]) inspect(s);

// Also dump first 200 chars of 01-part for format
console.log("---sample---");
console.log(fs.readFileSync("tmp/sin1-migrate/_stitch-lines/variants-11/01-part.sql", "utf8").slice(0, 300));

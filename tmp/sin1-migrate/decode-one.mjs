import fs from "node:fs";

const file = process.argv[2] ?? "queries-out/08.sql";
const q = fs.readFileSync(file, "utf8");
const start = q.indexOf("decode('") + 8;
const end = q.indexOf("', 'base64')");
const sql = Buffer.from(q.slice(start, end), "base64").toString("utf8");
const idx = sql.indexOf(", 1, ");
console.log(sql.slice(idx, idx + 80));

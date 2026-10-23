import fs from "node:fs";
import path from "node:path";

let cached: string | null = null;

/** Homepage hero/shell CSS inlined into `/` HTML so h1 is not blocked on home.css. */
export function homeCriticalCss(): string {
  if (cached) return cached;
  cached = fs.readFileSync(
    path.join(process.cwd(), "src/app/home-critical.css"),
    "utf8",
  );
  return cached;
}

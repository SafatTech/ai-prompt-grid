import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import {
  INDEXNOW_KEY_FILE,
  extractSitemapUrls,
} from "../../scripts/indexnow-submit";

describe("IndexNow submit helpers", () => {
  it("hosts the key file under public/ with matching contents", () => {
    const filePath = path.join(process.cwd(), "public", INDEXNOW_KEY_FILE);
    assert.equal(fs.existsSync(filePath), true);
    const key = fs.readFileSync(filePath, "utf8").trim();
    assert.equal(key, INDEXNOW_KEY_FILE.replace(/\.txt$/i, ""));
    assert.ok(key.length >= 8 && key.length <= 128);
  });

  it("extracts unique absolute URLs from sitemap XML", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset>
        <url><loc>https://aipromptgrid.com/guides/birthday-ai-photo-prompts</loc></url>
        <url><loc>https://aipromptgrid.com/guides/how-to-merge-two-photos-in-gemini</loc></url>
        <url><loc>https://aipromptgrid.com/guides/birthday-ai-photo-prompts</loc></url>
        <url><loc>/relative-ignored</loc></url>
      </urlset>`;
    assert.deepEqual(extractSitemapUrls(xml), [
      "https://aipromptgrid.com/guides/birthday-ai-photo-prompts",
      "https://aipromptgrid.com/guides/how-to-merge-two-photos-in-gemini",
    ]);
  });
});

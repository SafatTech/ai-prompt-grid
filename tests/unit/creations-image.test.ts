import assert from "node:assert/strict";
import { describe, it } from "node:test";
import sharp from "sharp";
import { processUploadImage } from "../../src/lib/creations/image";
import { MAX_UPLOAD_BYTES } from "../../src/lib/creations/constants";

async function makeJpeg(width = 32, height = 32): Promise<Buffer> {
  return sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 40, g: 80, b: 160 },
    },
  })
    .jpeg()
    .toBuffer();
}

describe("processUploadImage", () => {
  it("accepts a real JPEG and re-encodes to WebP", async () => {
    const jpeg = await makeJpeg();
    const result = await processUploadImage(jpeg, "image/jpeg");
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.image.contentType, "image/webp");
    assert.equal(result.image.ext, "webp");
    assert.ok(result.image.buffer.length > 0);
    assert.equal(result.image.width, 32);
    assert.equal(result.image.height, 32);
  });

  it("rejects empty buffers", async () => {
    const result = await processUploadImage(Buffer.alloc(0), "image/jpeg");
    assert.equal(result.ok, false);
  });

  it("rejects oversized files before decode", async () => {
    const huge = Buffer.alloc(MAX_UPLOAD_BYTES + 1, 0xff);
    huge[0] = 0xff;
    huge[1] = 0xd8;
    huge[2] = 0xff;
    const result = await processUploadImage(huge, "image/jpeg");
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.match(result.error, /10 MB/i);
  });

  it("rejects disguised MIME when magic bytes do not match", async () => {
    const jpeg = await makeJpeg();
    const result = await processUploadImage(jpeg, "image/png");
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.match(result.error, /does not match/i);
  });

  it("rejects random bytes that are not images", async () => {
    const result = await processUploadImage(
      Buffer.from("not-an-image"),
      "image/jpeg",
    );
    assert.equal(result.ok, false);
  });
});

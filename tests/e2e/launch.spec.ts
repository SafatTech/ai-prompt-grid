import { test, expect } from "@playwright/test";

test.describe("launch hardening", () => {
  test("privacy and terms pages are linked from the footer", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("contentinfo").getByRole("link", { name: "Privacy" }).click();
    await expect(page).toHaveURL(/\/privacy/);
    await expect(page.getByRole("heading", { name: "Privacy policy" })).toBeVisible();

    await page.getByRole("contentinfo").getByRole("link", { name: "Terms" }).click();
    await expect(page).toHaveURL(/\/terms/);
    await expect(page.getByRole("heading", { name: "Terms of use" })).toBeVisible();
  });

  test("guest save opens sign-in; mock Google restores save", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/styles/meadow-reverie");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByTestId("detail-save-style").click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(page.getByTestId("google-sign-in")).toBeVisible();

    const mockHint = page.getByText(/local mock sign-in/i);
    const usingMock = await mockHint.isVisible().catch(() => false);
    if (!usingMock) {
      test.info().annotations.push({
        type: "note",
        description:
          "Supabase Auth is configured — full OAuth return-to-action is not asserted in this environment.",
      });
      return;
    }

    await page.getByTestId("google-sign-in").click();
    await expect(page.getByText(/Style saved to your library/i)).toBeVisible();
    await page.goto("/library");
    await expect(page.getByRole("heading", { name: "My library" })).toBeVisible();
    await expect(page.getByTestId("style-card-meadow-reverie")).toBeVisible();
  });

  test("protected APIs reject anonymous callers", async ({ request }) => {
    const creation = await request.post("/api/creations", {
      multipart: {
        styleSlug: "meadow-reverie",
        notes: "",
        promptSnapshot: "test prompt",
        result: {
          name: "tiny.png",
          mimeType: "image/png",
          buffer: Buffer.from(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
            "base64",
          ),
        },
      },
    });
    expect([401, 503]).toContain(creation.status());

    const admin = await request.patch(
      "/api/admin/styles/00000000-0000-5000-8000-000000000001",
      {
        data: { status: "published" },
      },
    );
    expect([401, 403, 503]).toContain(admin.status());
  });

  test("save modal rejects an oversized client-side pick when signed in (mock)", async ({
    page,
    context,
  }) => {
    await context.clearCookies();
    await page.goto("/styles/meadow-reverie");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByTestId("detail-save-style").click();
    const mockHint = page.getByText(/local mock sign-in/i);
    const usingMock = await mockHint.isVisible().catch(() => false);
    test.skip(!usingMock, "Requires mock auth (no Supabase env)");

    await page.getByTestId("google-sign-in").click();
    await page.getByTestId("save-result").click();
    await expect(page.getByRole("dialog")).toBeVisible();

    const big = Buffer.alloc(10 * 1024 * 1024 + 1, 1);
    await page.getByTestId("creation-result-input").setInputFiles({
      name: "too-big.jpg",
      mimeType: "image/jpeg",
      buffer: big,
    });
    await expect(page.getByText(/under 10 MB/i)).toBeVisible();
  });
});

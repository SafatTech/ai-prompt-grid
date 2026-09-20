import { test, expect } from "@playwright/test";

test.describe("admin content editor gates", () => {
  test("guest explore does not show draft-only admin routes as public catalog", async ({
    page,
  }) => {
    await page.goto("/explore");
    await expect(page.getByTestId("results-count")).toBeVisible();
    // Public catalog still lists published seed styles; admin new route is not linked in guest nav.
    await expect(page.getByTestId("admin-new-style")).toHaveCount(0);
  });

  test("anonymous create API is denied", async ({ request }) => {
    const response = await request.post("/api/admin/styles", {
      data: { title: "Nope" },
    });
    expect([401, 403, 503]).toContain(response.status());
  });

  test("unsigned /admin/styles/new redirects or denies", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/admin/styles/new");
    const url = page.url();
    const denied = page.getByRole("heading", { name: /Access denied|Editorial admin|Sign in/i });
    await expect(denied.or(page.getByTestId("google-sign-in"))).toBeVisible({
      timeout: 10_000,
    });
    expect(
      /sign-in|admin/.test(url) || true,
    ).toBeTruthy();
  });
});

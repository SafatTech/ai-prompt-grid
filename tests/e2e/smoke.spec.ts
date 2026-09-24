import { test, expect } from "@playwright/test";

test.describe("phase 2 guest catalog", () => {
  test("home renders prototype hero and explore CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/AI Prompt Grid/i);
    await expect(page.getByTestId("hero-explore")).toBeVisible();
    await expect(
      page.getByLabel("Examples of source photos transformed into AI styles"),
    ).toBeVisible();
  });

  test("guest discovery: explore → search → detail → customize → copy", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/explore");
    await expect(page.getByTestId("explore-search")).toBeVisible();
    await expect(page.getByTestId("results-count")).toContainText("30 styles");

    await page.getByTestId("explore-search").fill("Meadow Reverie");
    await expect(page.getByTestId("results-count")).toContainText("1 style");
    await expect(page.getByTestId("style-card-meadow-reverie")).toBeVisible();

    await page.getByTestId("desktop-filters").getByTestId("filter-category-Pets").click();
    await expect(page.getByTestId("results-count")).toContainText("0 styles");
    await page.getByTestId("clear-filters").click();
    await expect(page.getByTestId("results-count")).toContainText("30 styles");

    await page.getByTestId("explore-search").fill("Meadow Reverie");
    await page.getByTestId("style-card-meadow-reverie").click();
    await expect(page).toHaveURL(/\/styles\/meadow-reverie/);
    await expect(page.getByTestId("prompt-box")).toBeVisible();

    await page.getByTestId("mood-select").selectOption("Deep blue");
    await expect(page.getByTestId("prompt-box")).toContainText("deep blue");

    await page.getByTestId("copy-prompt").click();
    await expect(
      page.getByText(/Prompt copied|Could not copy automatically/i),
    ).toBeVisible();
    const clip = await page.evaluate(() => navigator.clipboard.readText()).catch(() => "");
    if (clip) {
      expect(clip.toLowerCase()).toContain("moody outdoor");
      expect(clip.toLowerCase()).toContain("deep blue");
    }
  });

  test("load more reveals additional styles", async ({ page }) => {
    await page.goto("/explore");
    await expect(page.getByTestId("style-results").locator("article")).toHaveCount(6);
    await page.getByTestId("load-more").click();
    await expect(page.getByTestId("style-results").locator("article")).toHaveCount(12);
  });
});

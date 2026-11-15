import { test, expect } from "@playwright/test";

test.describe("phase 2 guest catalog", () => {
  test("home renders photo-wall hero and explore CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/AI Prompt Grid/i);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Turn your photo into/i,
    );
    await expect(page.getByTestId("hero-explore")).toBeVisible();
    await expect(page.getByRole("search")).toBeVisible();
  });

  test("guest discovery: explore → search → detail → customize → copy", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/explore");
    const cookie = page.getByRole("region", { name: "Cookie consent" });
    if (await cookie.isVisible().catch(() => false)) {
      await cookie.getByRole("button", { name: "Reject" }).click();
    }
    await expect(page.getByTestId("explore-search")).toBeVisible();
    await expect(page.getByTestId("results-count")).toContainText(/Showing \d+ of \d+/);

    // Title was retitled to "Moody Meadow Cinematic AI Photo Prompt (Tall Grass)".
    await page.getByTestId("explore-search").fill("Moody Meadow");
    await expect(page.getByTestId("results-count")).toContainText("Showing 1 of 1");
    await expect(page.getByTestId("style-card-meadow-reverie")).toBeVisible();

    await page.getByTestId("explore-search").fill("");
    await expect(page.getByTestId("results-count")).toContainText(/Showing \d+ of \d+/);

    const chips = page.getByRole("toolbar", { name: "Filters" });
    await chips.getByRole("button", { name: "Pets", exact: true }).click();
    await expect(page.getByTestId("results-count")).toContainText(/Showing \d+ of \d+/);
    await chips.getByRole("button", { name: "All", exact: true }).click();
    await expect(page.getByTestId("results-count")).toContainText(/Showing \d+ of \d+/);

    await page.getByTestId("explore-search").fill("Moody Meadow");
    await expect(page.getByTestId("style-card-meadow-reverie")).toBeVisible();
    await page.getByTestId("style-card-meadow-reverie").getByRole("link").first().click();
    await expect(page).toHaveURL(/\/styles\/meadow-reverie/);
    await expect(page.getByTestId("prompt-box")).toBeVisible();

    await page.getByTestId("mood-select").selectOption("Moody cinematic");
    await expect(page.getByTestId("prompt-box")).toContainText("moody cinematic");

    await page.getByTestId("copy-prompt").click();
    await expect(
      page.getByText(/Prompt copied|Could not copy automatically/i),
    ).toBeVisible();
    const clip = await page
      .evaluate(() => navigator.clipboard.readText())
      .catch(() => "");
    if (clip) {
      expect(clip.toLowerCase()).toContain("moody outdoor");
      expect(clip.toLowerCase()).toContain("moody cinematic");
    }
  });

  test("load more reveals additional styles", async ({ page }) => {
    await page.goto("/explore");
    await expect(page.getByTestId("style-results").locator("article")).toHaveCount(50);
    await page.getByTestId("load-more").click();
    await expect(page.getByTestId("style-results").locator("article")).toHaveCount(100);
  });
});



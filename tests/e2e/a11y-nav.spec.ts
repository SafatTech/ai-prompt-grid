import { test, expect } from "@playwright/test";

test.describe("PR34 follow-up a11y", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("explore soft nav after search does not freeze the UI (N-21)", async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (err) => {
      pageErrors.push(err.message);
    });

    await page.goto("/explore");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Find a style for your photo",
    );

    await page.getByTestId("explore-search").fill("christmas");
    await page.getByTestId("explore-search").press("Enter");
    await expect(page.getByTestId("results-count")).toContainText(/\d+ styles?/);
    await expect(page).toHaveURL(/[?&]q=/);

    const firstCard = page.getByTestId("style-results").locator("article").first();
    await expect(firstCard).toBeVisible();
    await firstCard.getByRole("link").first().click();
    await expect(page).toHaveURL(/\/styles\//);
    await expect(page.getByTestId("prompt-box")).toBeVisible();

    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("link", { name: "Explore styles" }).first().click();

    await expect(page).toHaveURL(/\/explore\/?(\?.*)?$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Find a style for your photo",
    );
    await expect(page.getByTestId("explore-search")).toBeVisible();
    await expect(page.getByTestId("results-count")).toBeVisible();

    // Menu and filters must still work after the soft navigations.
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("dialog", { name: "Site menu" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Site menu" })).toHaveCount(0);

    const filters = page.getByTestId("open-filters");
    await expect(filters).toBeVisible();
    await filters.click();
    await expect(page.getByRole("dialog", { name: "Style filters" })).toBeVisible();

    expect(pageErrors, `pageerrors: ${pageErrors.join(" | ")}`).toEqual([]);
  });

  test("explore soft nav keeps at most one robots meta without crashing", async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (err) => {
      pageErrors.push(err.message);
    });

    await page.goto("/explore");
    await expect
      .poll(async () => page.locator('meta[name="robots"]').count())
      .toBeLessThanOrEqual(1);

    await page.getByTestId("explore-search").fill("christmas");
    await expect(page.getByTestId("results-count")).toContainText(/\d+ styles?/);
    await expect(page).toHaveURL(/[?&]q=/);

    // N-23: soft nav to a faceted URL must refresh robots via generateMetadata.
    await expect
      .poll(async () => {
        const content = await page.locator('meta[name="robots"]').first().getAttribute("content");
        return (content ?? "").toLowerCase();
      })
      .toMatch(/noindex/);

    const clear = page.getByTestId("clear-filters");
    if (await clear.isVisible().catch(() => false)) {
      await clear.click();
    } else {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page
        .getByRole("dialog", { name: "Site menu" })
        .getByRole("link", { name: "Explore styles" })
        .first()
        .click();
    }
    await expect(page).toHaveURL(/\/explore\/?(\?.*)?$/);
    await expect(page.getByTestId("explore-search")).toBeVisible();

    await expect
      .poll(async () => page.locator('meta[name="robots"]').count())
      .toBeLessThanOrEqual(1);
    expect(pageErrors).toEqual([]);
  });

  test("mobile menu moves focus in, traps Tab, restores on Esc (N-18)", async ({
    page,
  }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Open menu" });
    await menuButton.focus();
    await menuButton.press("Enter");

    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();

    // Focus should move into the dialog (close button or first control).
    await expect
      .poll(async () =>
        dialog.locator(":focus").count().then((n) => n > 0),
      )
      .toBe(true);

    // Tab through controls; focus must remain inside the dialog.
    for (let i = 0; i < 16; i++) {
      await page.keyboard.press("Tab");
      const inside = await dialog.evaluate((node) => node.contains(document.activeElement));
      expect(inside).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(menuButton).toBeFocused();
  });
});

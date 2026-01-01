import { test, expect } from "@playwright/test"

test.describe("network smoke", () => {
  test.skip(process.env.PLAYWRIGHT_E2E !== "true", "Set PLAYWRIGHT_E2E=true to run network smoke tests")

  test("landing page renders tiles", async ({ page }) => {
    await page.goto("/network")
    await expect(page.getByText("McGill Research Network")).toBeVisible()
    await expect(page.getByRole("link", { name: "Enter" }).first()).toBeVisible()
  })
})

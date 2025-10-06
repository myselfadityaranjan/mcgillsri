import { defineConfig, devices } from "@playwright/test"

const isCI = process.env.CI === "true"

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  retries: isCI ? 1 : 0,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
})

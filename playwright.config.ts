import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: "html",

  use: {
    // Collect trace when retrying the failed test.
    trace: "on-first-retry",
    // Record video only on failure
    video: "retain-on-failure",
    // Take screenshot only on failure
    screenshot: "only-on-failure",
    // timeout for each action
    actionTimeout: 10 * 1000,
  },

  // Configure projects for major browsers.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

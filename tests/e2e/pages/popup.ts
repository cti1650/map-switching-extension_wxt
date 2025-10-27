import { Page } from "@playwright/test";

export async function openPopup(page: Page, extensionId: string) {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  await page.waitForSelector("h1");

  const popup = {
    getHeader: () => page.waitForSelector("h1"),
    getHeaderText: async () => {
      const header = await popup.getHeader();
      return await header.evaluate((el) => el.textContent);
    },
  };
  return popup;
}

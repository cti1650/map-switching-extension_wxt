import type { Page } from "playwright/test";
import { BasePage } from "./base.page";

export class DisaportalPage extends BasePage {
  /**
   * 検索結果のテキストを取得
   */
  async getSearchResultText(): Promise<string | null> {
    const searchResult = await this.page.waitForSelector("#latlng_10", { state: "attached" });
    if (searchResult) {
      return await searchResult.textContent();
    }
    return null;
  }
}

import type { Page } from "playwright/test";
import { BasePage } from "./base.page";

export class KawabouPage extends BasePage {
  /**
   * 検索結果のテキストを取得
   */
  async getSearchResultText(): Promise<string | null> {
    const searchResult = await this.page.waitForSelector("#pcMapHeader .subtitle-1.success--text");
    if (searchResult) {
      return await searchResult.textContent();
    }
    return null;
  }
}

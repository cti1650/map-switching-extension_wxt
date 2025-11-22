import type { Page } from "playwright/test";
import { BasePage } from "./base.page";

export class GoogleMapPage extends BasePage {
  /**
   * 検索結果のテキストを取得
   */
  async getSearchResultText(): Promise<string | null> {
    const searchResult = await this.page.waitForSelector("[name='q']");
    if (searchResult) {
      return await searchResult.inputValue();
    }
    return null;
  }
}

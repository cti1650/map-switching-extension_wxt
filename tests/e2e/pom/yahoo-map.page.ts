import type { Page } from "playwright/test";
import { BasePage } from "./base.page";

export class YahooMapPage extends BasePage {
  /**
   * 検索結果のテキストを取得
   */
  async getSearchResultText(): Promise<string | null> {
    const searchResult = await this.page.waitForSelector("#poi .Heading--level1");
    if (searchResult) {
      return await searchResult.textContent();
    }
    return null;
  }

  /**
   * 検索結果の備考情報を取得
   */
  async getSearchResultNote(): Promise<string | null> {
    const note = await this.page.waitForSelector(".POI__contentRuby");
    if (note) {
      return await note.textContent();
    }
    return null;
  }
}

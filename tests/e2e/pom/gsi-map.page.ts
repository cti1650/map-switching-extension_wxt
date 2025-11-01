import { Page } from "playwright/test";
import { BasePage } from "./base.page";

export class GsiMapPage extends BasePage {
  /**
   * GsiMapPageクラスのコンストラクタ
   * @param page Playwrightのページオブジェクト
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * 検索結果のテキストを取得
   */
  async getSearchResultText(): Promise<string | null> {
    const searchResult = await this.page.waitForSelector("#map .latlng10", { state: "attached" });
    if (searchResult) {
      return await searchResult.textContent();
    }
    return null;
  }
}

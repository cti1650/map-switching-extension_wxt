import { Page } from "playwright/test";
import { BasePage } from "./base.page";

export class ExtensionPopupPage extends BasePage {
  /**
   * ExtensionPopupPageクラスのコンストラクタ
   * @param page Playwrightのページオブジェクト
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * 拡張機能のpopupページにアクセス
   */
  async goto(extensionId: string = "", query: string = ""): Promise<void> {
    await this.page.goto(`chrome-extension://${extensionId}/popup.html${query}`);
  }

  /**
   * ヘッダーテキストを取得
   */
  async getHeaderText(): Promise<string | null> {
    const header = await this.page.$("h1");
    if (header) {
      return await header.textContent();
    }
    return null;
  }

  /**
   * ボタンを押して地図リンクを開く
   */
  async openMapLink(text: string = ""): Promise<Page> {
    const button = this.page.getByText(text).first();
    const promiseOpenNewTab = this.page.context().waitForEvent("page");
    await button.click();
    const newTab = await promiseOpenNewTab;
    return newTab;
  }
}

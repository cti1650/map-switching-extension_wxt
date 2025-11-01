import type { Page } from "@playwright/test";

/**
 * @package
 * Page Object Modelのベースとなるクラス
 */
export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * 現在のURLを取得
   */
  async getUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * ページタイトルを取得
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * クリップボードのテキストを取得
   */
  async getClipboardText(): Promise<string> {
    return await this.page.evaluate(async () => await navigator.clipboard.readText());
  }
}

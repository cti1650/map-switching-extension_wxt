import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// 例: chrome API の最低限モック（必要な分だけ足す）
declare global {
  // eslint-disable-next-line no-var
  var chrome: any;
}

globalThis.chrome = {
  i18n: { getMessage: vi.fn((k) => k) },
  runtime: { getURL: (p: string) => p, sendMessage: vi.fn() },
  tabs: { create: vi.fn(), query: vi.fn(), sendMessage: vi.fn() },
} as any;

// webextension-polyfill を使っている場合の例（必要なときだけ）
// vi.mock('webextension-polyfill', () => ({
//   default: { tabs: { create: vi.fn() }, runtime: { sendMessage: vi.fn() } },
// }))

afterEach(() => {
  cleanup();
});

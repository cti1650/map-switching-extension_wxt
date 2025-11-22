import { defineConfig } from "vitest/config";
import { WxtVitest } from "wxt/testing";
import path from "node:path";

export default defineConfig({
  plugins: [WxtVitest()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ← これ！
    },
  },
  test: {
    environment: "jsdom", // ブラウザDOMをエミュレート
    globals: true, // describe/it/expect をグローバルで
    setupFiles: ["./tests/setup.ts"],
    css: true, // CSS import を無視せず通す（必要なら）
    include: ["src/**/*.spec.ts", "tests/**/*.spec.ts"],
    exclude: ["tests/e2e/**"], // e2eはPlaywrightで実行するので除外
  },
});

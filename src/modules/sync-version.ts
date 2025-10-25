import { defineWxtModule } from "wxt/modules";
import fs from "fs/promises";
import path from "path";
import type { UserManifest } from "wxt";

/**
 * Chrome (Chromium) は manifest.version を最大4つの数値 (x.y.z.a) のみ許容。
 * 例: 1.2.3-beta.4 -> version=1.2.3.4, version_name=1.2.3-beta.4
 */
function normalizeForChromium(semver: string): { version: string; versionName: string } {
  const versionName = semver; // 人間可読はそのまま残す
  // 数字だけを抽出して最大4つまで
  const nums = semver.match(/\d+/g)?.map((n) => parseInt(n, 10)) ?? [];
  // 0埋め＆最大4要素に収める
  const padded = [...nums, 0, 0, 0, 0].slice(0, Math.min(4, nums.length));
  // 最低1つは必要
  if (padded.length === 0) padded.push(0);
  const version = padded.join(".");
  return { version, versionName };
}

export default defineWxtModule({
  name: "sync-version",
  async setup(wxt) {
    wxt.hooks.hook("build:before", async () => {
      const pkgPath = path.resolve(wxt.config.root, "package.json");

      let raw = "";
      try {
        raw = await fs.readFile(pkgPath, "utf8");
      } catch (e) {
        console.warn(`⚠️ package.json が読み込めませんでした: ${pkgPath}`, e);
        return;
      }

      let pkg: {
        version?: string;
      };
      try {
        pkg = JSON.parse(raw);
      } catch (e) {
        console.warn("⚠️ package.json のJSON解析に失敗しました。", e);
        return;
      }

      const semver = pkg?.version;
      if (!semver || typeof semver !== "string") {
        console.warn("⚠️ package.json に有効な version がありません。");
        return;
      }

      const { version, versionName } = normalizeForChromium(semver);

      // Chrome/Firefox どちらでも version は必要
      wxt.config.manifest.version = version;

      // MV3では version_name を持てる（Chrome向け可読表現）
      // Firefoxは無視されるだけなので入れてOK
      (wxt.config.manifest as UserManifest).version_name = versionName;

      console.log(`✅ Synced manifest version → ${version} (name: ${versionName})`);
    });
  },
});

import { defineWxtModule } from "wxt/modules";
import fs from "fs";
import path from "path";

export default defineWxtModule({
  name: "sync-version",
  async setup(wxt) {
    wxt.hooks.hook("build:before", async () => {
      const pkgPath = path.resolve(wxt.config.root, "package.json");
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      const version = pkg.version;
      wxt.config.manifest.version = version;

      console.log(`✅ Synced manifest version → ${version}`);
    });
  },
});

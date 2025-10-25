import { defineConfig } from "wxt";
import path from "path";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  manifest: {
    name: "Map Switching Extension",
    description: "Map Switching Extension",
    version: "1.0.5",
    permissions: ["tabs"],
  },
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  alias: {
    $component: path.resolve("./src/component"),
    $hooks: path.resolve("./src/hooks"),
    $assets: path.resolve("./src/assets"),
  },
});

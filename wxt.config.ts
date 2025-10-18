import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';
import path from 'path';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  manifest: {
    name: 'Map Switching Extension',
    description: 'Map Switching Extension',
    version: '1.1.0',
    permissions: ['tabs'],
  },
  vite: () => ({
    plugins: [react()],
    resolve: {
      alias: {
        $component: path.resolve('./src/component'),
        $hooks: path.resolve('./src/hooks'),
        $assets: path.resolve('./src/assets'),
      },
    },
  }),
});

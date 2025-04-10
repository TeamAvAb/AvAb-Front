import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import prerender from '@prerenderer/rollup-plugin';

export default defineConfig({
  plugins: [
    react(),
    svgrPlugin(),
    prerender({
      routes: [], //TODO: prerender할 페이지 경로 추가
      renderer: '@prerenderer/renderer-puppeteer',
      server: {
        host: 'localhost',
        port: 3000,
      },
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/http:/gi, 'https:')
          .replace(/(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i, 'https://avab.site/');
      },
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

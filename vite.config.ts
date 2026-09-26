import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const pixelIds = [...new Set(
    [env.VITE_FB_PIXEL_ID, env.VITE_FB_PIXEL_ADDITIONAL_IDS]
      .filter(Boolean)
      .flatMap((value) => value.split(/[\s,]+/))
      .filter(Boolean),
  )];
  if (pixelIds.some((id) => !/^\d+$/.test(id))) {
    throw new Error('Meta Pixel IDs must contain only digits, separated by commas or spaces.');
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'meta-pixel-ids',
        transformIndexHtml(html) {
          return html
            .replace('%META_PIXEL_IDS%', JSON.stringify(pixelIds))
            .replace('%META_PIXEL_NOSCRIPT%', pixelIds.map((id) =>
              `<img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1" />`,
            ).join('\n'));
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          gift: path.resolve(__dirname, 'gift/index.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {
        ignored: ['**/.claude/**', '**/.gemini/**', '**/node_modules/**', '**/.git/**', '**/dist/**', '**/public/**']
      },
    },
  };
});

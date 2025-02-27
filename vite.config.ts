import path from 'path';

import react from '@vitejs/plugin-react';
import browserslist from 'browserslist';
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const target = isProduction ? resolveToEsbuildTarget(browserslist(), { printUnknownTargets: false }) : 'esnext';

  return {
    build: {
      emptyOutDir: true,
      sourcemap: true,
      target,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    server: {
      open: true,
      port: 3000,
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
        generateScopedName: isProduction ? undefined : '[path][name]__[local]',
      },
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['import'],
          quietDeps: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      react(),
      viteTsconfigPaths(),
      svgrPlugin(),
      checker({
        eslint: {
          lintCommand:
            'eslint "./src/**/*.{js,ts,tsx}" --cache --cache-location .cache/eslint --cache-strategy content',
          useFlatConfig: true,
        },
        stylelint: {
          lintCommand: 'stylelint ./src/**/*.scss --cache --cache-location .cache/stylelint --cache-strategy content',
        },
        typescript: true,
      }),
    ],
  };
});

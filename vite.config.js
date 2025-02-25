import path from 'path';
import react from '@vitejs/plugin-react';
import browserslist from 'browserslist';
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var isProduction = mode === 'production';
    var target = isProduction ? resolveToEsbuildTarget(browserslist(), { printUnknownTargets: false }) : 'esnext';
    return {
        build: {
            emptyOutDir: true,
            sourcemap: true,
            target: target,
            commonjsOptions: {
                transformMixedEsModules: true,
            },
        },
        server: {
            open: true,
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
            tailwindcss(),
            svgrPlugin(),
            checker({
                eslint: {
                    lintCommand: 'eslint "./src/**/*.{js,ts,tsx}" --cache --cache-location .cache/eslint --cache-strategy content',
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

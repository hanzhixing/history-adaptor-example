import {fileURLToPath, URL} from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import {defineConfig, type Plugin} from 'vite';
import solid from 'vite-plugin-solid';

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url));

/**
 * GitHub Pages extras:
 * - `404.html` is served for every missing path, so deep links under the project
 *   base (`/<repo>/portal/...`) fall back to the shell instead of GitHub's 404.
 * - `.nojekyll` stops Jekyll from dropping Vite chunks whose names start with
 *   `_` (e.g. `_router_module-chunk-*.js`).
 */
const ghPages = (base: string): Plugin => ({
    name: 'gh-pages-extras',
    apply: 'build',
    generateBundle() {
        this.emitFile({
            type: 'asset',
            fileName: '404.html',
            source: `<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="robots" content="noindex" />
        <title>Redirecting…</title>
    </head>
    <body>
        <script>
            window.location.replace(${JSON.stringify(base)});
        </script>
    </body>
</html>
`,
        });
        this.emitFile({type: 'asset', fileName: '.nojekyll', source: '\n'});
    },
});

// Project sites live under `/<repo>/`; the Pages build sets BASE_PATH to that.
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
    base,
    plugins: [
        react({exclude: [/\.solid\.tsx$/]}),
        solid({include: [/\.solid\.tsx$/, /node_modules\/.*\.jsx$/]}),
        vue(),
        tailwindcss(),
        ghPages(base),
    ],
    build: {
        rollupOptions: {
            input: {
                shell: here('./index.html'),
                'vanilla-react': here('./examples/vanilla-react/index.html'),
                'react-vue': here('./examples/react-vue/index.html'),
                'solid-react': here('./examples/solid-react/index.html'),
                'vue-angular': here('./examples/vue-angular/index.html'),
                'angular-solid': here('./examples/angular-solid/index.html'),
            },
        },
    },
});

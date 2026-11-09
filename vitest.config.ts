import vue from '@vitejs/plugin-vue';
import {defineConfig} from 'vitest/config';
import solid from 'vite-plugin-solid';

export default defineConfig({
    plugins: [vue(), solid({include: [/\.solid\.tsx$/, /node_modules\/.*\.jsx$/]})],
    // Solid Router ships browser and server builds; tests need the browser one.
    resolve: {
        conditions: ['module', 'browser', 'development'],
        alias: {
            'solid-js/web': 'solid-js/web/dist/web.js',
        },
    },
    ssr: {
        resolve: {
            conditions: ['module', 'browser', 'development'],
        },
    },
    test: {
        environment: 'jsdom',
        include: ['test/**/*.test.{ts,tsx}'],
        server: {
            deps: {
                inline: [/@solidjs\/router/, /solid-js/],
            },
        },
    },
});

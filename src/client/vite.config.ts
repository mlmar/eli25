import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
// @ts-ignore
import eslint from 'vite-plugin-eslint';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [
        react(),
        eslint(),
        tailwindcss()
    ],
    test: {
        environment: 'jsdom',
        globals: true, // Enables global access to Vitest APIs like `describe`, `it`, `expect`
        setupFiles: ['./src/test/setupTests.ts'],
    },
    build: {
        outDir: '../server/static',
        emptyOutDir: true
    },
    envDir: '../../'
})

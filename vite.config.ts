/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
//import path from 'path';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), legacy()],
  resolve: {
    alias: {
      //'@': path.resolve(__dirname, './src'),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});

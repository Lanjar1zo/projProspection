/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), legacy()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});

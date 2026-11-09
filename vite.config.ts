import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import deployment from './vercel.json' with { type: 'json' };

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Mirror deployment headers in the production preview; development keeps HMR.
  preview: {
    headers: Object.fromEntries(deployment.headers[0].headers.map(({ key, value }) => [key, value])),
  },
  resolve: {
    alias: {
      '@': path.resolve(projectRoot, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    restoreMocks: true,
    pool: 'threads',
    maxWorkers: 1,
    fileParallelism: false,
    include: ['src/**/*.test.{ts,tsx}'],
  },
});

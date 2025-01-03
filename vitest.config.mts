import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  define: {
    'process.env': JSON.stringify({}), // https://github.com/vitest-dev/vitest/issues/6872#issuecomment-2461113494
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    globals: true,
    browser: {
      enabled: false,
      name: 'chromium',
      provider: 'playwright',
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'media/app/index.tsx'),
      formats: ['cjs'],
      fileName: 'index',
    },
    outDir: path.resolve(__dirname, 'media/build'),
  },
});

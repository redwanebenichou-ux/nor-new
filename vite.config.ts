import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Vercel serves the build from the domain root; local builds stay relative so
// dist/index.html still works when opened directly from disk (file://).
const isVercel = Boolean(process.env.VERCEL)

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'classic-script-for-file-protocol',
      // Runs after Vite injects the production script tag so dist/index.html
      // can also be opened directly from disk (file://).
      // Browsers block `type="module"` and `crossorigin` scripts loaded from
      // file:// (origin is "null"), which produced a blank page.
      transformIndexHtml: {
        order: 'post',
        handler(html: string) {
          if (isVercel) return html
          return html
            .replace(/<script([^>]*?)\s*type="module"([^>]*)>/g, '<script$1$2 defer>')
            .replace(/\scrossorigin(=("[^"]*"|'[^']*'|[^\s>]+))?/g, '')
        },
      },
    },
  ],
  // On Vercel use absolute paths (robust for any URL); local builds stay relative
  // so dist/index.html can still be opened directly from disk (file://).
  base: isVercel ? '/' : './',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['<rootDir>/src/test/setup.ts'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Single classic bundle so dist/index.html also opens directly from disk (file://)
        format: 'iife',
        inlineDynamicImports: true,
        manualChunks: undefined,
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      },
    },
  },
})

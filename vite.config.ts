import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // Use @ as shorthand for ./src
      // e.g. import { tags } from '@/data/siteData'
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // Target modern browsers — smaller bundles, no legacy polyfills
    target: 'es2020',

    // Warn if any single chunk exceeds 500 kB
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        // Split vendor libraries into separate cached chunks
        manualChunks: {
          // React core — changes least often, cached longest
          'vendor-react': ['react', 'react-dom'],

          // Animation library
          'vendor-motion': ['framer-motion'],

          // Scroll utilities
          'vendor-scroll': ['react-scroll'],
        },
      },
    },

    // Generate sourcemaps for production debugging
    // Set to false to shave a few KB off the deploy
    sourcemap: false,
  },

  server: {
    port: 5173,
    open: true,
    // Expose to LAN (useful for testing on real mobile devices)
    // host: true,
  },

  // Make env variables available — prefix with VITE_
  // Usage: import.meta.env.VITE_WEB3FORMS_KEY
  envPrefix: 'VITE_',
});
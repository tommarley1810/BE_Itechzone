import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// Lấy __dirname trong ES Module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ================================
  // PATH ALIASES — Dùng @/ thay vì ../../
  // ================================
  resolve: {
    alias: {
      '@':           path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages':      path.resolve(__dirname, './src/pages'),
      '@hooks':      path.resolve(__dirname, './src/hooks'),
      '@services':   path.resolve(__dirname, './src/services'),
      '@store':      path.resolve(__dirname, './src/store'),
      '@routes':     path.resolve(__dirname, './src/routes'),
      '@layouts':    path.resolve(__dirname, './src/layouts'),
      '@contexts':   path.resolve(__dirname, './src/contexts'),
      '@constants':  path.resolve(__dirname, './src/constants'),
      '@utils':      path.resolve(__dirname, './src/utils'),
      '@assets':     path.resolve(__dirname, './src/assets'),
    },
  },

  // ================================
  // DEV SERVER CONFIG
  // ================================
  server: {
    port: 5173,
    open: true,
    // Proxy API calls đến backend khi chạy dev
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  // ================================
  // BUILD CONFIG
  // ================================
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Tách vendor chunk để tối ưu cache (Vite 8 / Rolldown dùng function)
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react'
            }
            if (id.includes('framer-motion') || id.includes('lucide-react') || id.includes('react-icons')) {
              return 'vendor-ui'
            }
            if (id.includes('zustand') || id.includes('axios')) {
              return 'vendor-state'
            }
          }
        },
      },
    },
  },
})

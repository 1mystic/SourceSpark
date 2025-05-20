import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Proxy /api requests to our backend server
      '/api': {
        target: 'http://localhost:3001', // Your backend server address
        changeOrigin: true,
        rewrite: (path) => path // Keep the /api prefix since backend expects it
      }
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          qr: ['qrcode']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['recharts', 'qrcode']
  },
  resolve: {
    alias: {
      'qrcode': 'qrcode'
    }
  }
})

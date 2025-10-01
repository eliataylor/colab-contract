import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'mui-core': ['@mui/material', '@mui/material/styles'],
          'mui-icons': ['@mui/icons-material'],
          'mui-charts': ['@mui/x-charts']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material', '@mui/x-charts']
  }
})

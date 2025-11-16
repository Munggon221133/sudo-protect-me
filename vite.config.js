import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://sudo-protect-me-backend-n01gisuif-munggon221133s-projects.vercel.app',
        changeOrigin: true,
      },
    },
  },
})

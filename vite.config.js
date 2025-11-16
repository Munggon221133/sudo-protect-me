import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://sudo-protect-me-backend-git-main-munggon221133s-projects.vercel.app?_vercel_share=5QKfO4hFuk5JT9MSVtfWSkjCyChRzChc',
        changeOrigin: true,
      },
    },
  },
})

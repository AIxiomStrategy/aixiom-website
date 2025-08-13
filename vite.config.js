import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path auto-set from GitHub Actions or default to '/'
  base: process.env.BASE_PATH || '/',
})

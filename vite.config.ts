import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // Ensures assets in public/ are copied to dist/
  build: {
    outDir: 'dist', // Specifies the output directory for the build
    sourcemap: false, // Can be true for debugging, false for production to reduce size
  },
  server: {
    port: 3000 // Optional: set a default port for local development
  }
})

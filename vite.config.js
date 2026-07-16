import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    __BUNDLED_DEV__: 'false',
    __SERVER_FORWARD_CONSOLE__: 'false',
  },
  server: {
    watch: {
      usePolling: true
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Proxy API requests to backend
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true, // Enable WebSocket proxying for Socket.IO
      },
    },
  },
})

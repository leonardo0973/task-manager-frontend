/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Durante pnpm dev, /api se reenvía a la API de Express (puerto 3000).
    // El proxy no forma parte del build de producción (dist).
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  test: {
    // DOM simulado: las pruebas no necesitan Express ni MongoDB Atlas
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    // Las pruebas siempre usan la dirección de .env.test, aunque el entorno de
    // build (por ejemplo Render) defina VITE_API_URL con la URL de producción
    env: {
      VITE_API_URL: '/api',
    },
    clearMocks: true,
    restoreMocks: true,
  },
})

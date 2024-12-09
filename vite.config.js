import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // O diretório de saída (padrão é 'dist')
    assetsDir: 'assets', // Diretório para arquivos estáticos
  },
})
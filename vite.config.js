import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true, // Certifica-se de que o HMR está habilitado
  },
  watch: {
    usePolling: true, // Para observar alterações em sistemas de arquivos não confiáveis
  },
  build: {
    outDir: 'dist', // O diretório de saída (padrão é 'dist')
    assetsDir: 'assets', // Diretório para arquivos estáticos
  },
})
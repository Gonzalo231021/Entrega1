import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Entrega1/', // 👈 pon el nombre EXACTO de tu repositorio
  plugins: [react()],
})

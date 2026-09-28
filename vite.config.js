import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:"/quize_hp_rakoczi/",
  plugins: [react()],
})

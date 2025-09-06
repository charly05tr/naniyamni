import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      '@FormStyled': path.resolve(__dirname, 'src/shared/styled-components/FormStyled'),
      '@TextStyled': path.resolve(__dirname, 'src/shared/styled-components/TextStyled'),
      '@config': path.resolve(__dirname, 'src/config.js')
    }
  }
})

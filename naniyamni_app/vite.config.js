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
      '@FormStyled': path.resolve(__dirname, 'src/shared/styled-components/FormStyled.jsx'),
      '@TextStyled': path.resolve(__dirname, 'src/shared/styled-components/TextStyled.jsx'),
      '@config': path.resolve(__dirname, 'src/config.js'),
      '@Card': path.resolve(__dirname, 'src/shared/styled-components/Card.jsx'),
      '@authContext': path.resolve(__dirname, 'src/shared/contexts/authContext.jsx'),
      '@getGeoDatos': path.resolve(__dirname, 'src/shared/services/getGeoDatos.js'),
      '@Avatar': path.resolve(__dirname, 'src/shared/styled-components/Avatar.jsx'),
      '@RemoveButton': path.resolve(__dirname, 'src/shared/styled-components/RemoveButton.jsx'),
      '@ReadMoreText': path.resolve(__dirname, 'src/shared/components/ReadMoreText.jsx'),
      '@NumericInput': path.resolve(__dirname, 'src/shared/components/NumericInput.jsx'),
      '@Alert': path.resolve(__dirname, 'src/shared/styled-components/Alert.jsx'),
      '@Error': path.resolve(__dirname, 'src/shared/styled-components/Error.jsx'),
      '@Cargando': path.resolve(__dirname, 'src/shared/components/Cargando.jsx'),
    }
  }
})

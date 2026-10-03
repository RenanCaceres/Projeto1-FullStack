import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { tema } from './styles/tema'
import Global from './styles/Global'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={tema}>
      <Global />
      <App />
    </ThemeProvider>
  </StrictMode>,
)

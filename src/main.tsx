import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './styles/global.css'
import App from './App.tsx'

const root = document.getElementById('root')

if (!root) {
  throw new Error('No se encontró el elemento #root.')
}

// BrowserRouter envuelve la aplicación una sola vez
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

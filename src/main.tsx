import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './styles/global.css'
import App from './App.tsx'
import AuthProvider from './providers/AuthProvider'

const root = document.getElementById('root')

if (!root) {
  throw new Error('No se encontró el elemento #root.')
}

// BrowserRouter aparece una sola vez; AuthProvider queda dentro del enrutador
// para que páginas, navegación y guardas puedan usar useAuth.
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

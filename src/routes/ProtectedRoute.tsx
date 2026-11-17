import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth'

// Coordina la vista; la frontera de seguridad real sigue siendo la API
function ProtectedRoute() {
  const location = useLocation()
  const { status, retrySession, logout } = useAuth()

  if (status === 'checking') {
    return (
      <p className="request-status" role="status">
        Validando la sesión...
      </p>
    )
  }

  if (status === 'error') {
    return (
      <section className="card request-status--error" role="alert">
        <h2 className="page-title">No fue posible validar la sesión</h2>
        <p className="page-text">Comprueba la API e intenta nuevamente.</p>
        <div className="auth-actions">
          <button className="button button--primary" type="button" onClick={() => void retrySession()}>
            Reintentar
          </button>
          <button className="button button--ghost" type="button" onClick={logout}>
            Cerrar sesión local
          </button>
        </div>
      </section>
    )
  }

  if (status !== 'authenticated') {
    // Se recuerda la ruta solicitada para volver a ella después del login
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute

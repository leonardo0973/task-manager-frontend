import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth'

interface FromState {
  from?: {
    pathname: string
    search?: string
  }
}

// Evita que una sesión activa regrese a login o registro
function PublicOnlyRoute() {
  const location = useLocation()
  const { status } = useAuth()

  if (status === 'checking') {
    return (
      <p className="request-status" role="status">
        Validando la sesión...
      </p>
    )
  }

  if (status === 'authenticated') {
    // Si el login venía de una ruta protegida, se respeta ese destino
    // (incluida su búsqueda) para no competir con la navegación de LoginPage.
    const from = (location.state as FromState | null)?.from
    const destination = from ? `${from.pathname}${from.search ?? ''}` : '/tasks'

    return <Navigate to={destination} replace />
  }

  return <Outlet />
}

export default PublicOnlyRoute

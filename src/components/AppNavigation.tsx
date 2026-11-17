import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

function getLinkClassName({ isActive }: { isActive: boolean }): string {
  return ['app-navigation__link', isActive ? 'app-navigation__link--active' : '']
    .filter(Boolean)
    .join(' ')
}

function AppNavigation() {
  const navigate = useNavigate()
  const { status, user, logout } = useAuth()
  const isAuthenticated = status === 'authenticated' && user

  function handleLogout(): void {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-navigation-bar">
      <nav className="app-navigation" aria-label="Navegación principal">
        <ul className="app-navigation__list">
          <li>
            {/* end evita que Inicio quede activo en todas las rutas */}
            <NavLink to="/" end className={getLinkClassName}>
              Inicio
            </NavLink>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/tasks" className={getLinkClassName}>
                  Tareas
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={getLinkClassName}>
                  Perfil
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={getLinkClassName}>
                  Iniciar sesión
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={getLinkClassName}>
                  Crear cuenta
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {isAuthenticated && (
          <div className="session-summary">
            {/* Nombre y rol provienen de login o /auth/me, no del JWT */}
            <span>
              {user.name} · <span className={`role-badge role-badge--${user.role}`}>{user.role}</span>
            </span>
            <button className="button button--ghost" type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </nav>
    </div>
  )
}

export default AppNavigation

import { NavLink } from 'react-router'

function getLinkClassName({ isActive }: { isActive: boolean }): string {
  return ['app-navigation__link', isActive ? 'app-navigation__link--active' : '']
    .filter(Boolean)
    .join(' ')
}

function AppNavigation() {
  return (
    <nav className="app-navigation" aria-label="Navegación principal">
      <ul className="app-navigation__list">
        <li>
          {/* end evita que Inicio quede activo en todas las rutas */}
          <NavLink to="/" end className={getLinkClassName}>
            Inicio
          </NavLink>
        </li>
        <li>
          {/* Sin end: Tareas sigue activa dentro de /tasks/:taskId */}
          <NavLink to="/tasks" className={getLinkClassName}>
            Tareas
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default AppNavigation

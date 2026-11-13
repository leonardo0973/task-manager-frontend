import { Outlet } from 'react-router'
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import AppNavigation from '../components/AppNavigation'

function AppLayout() {
  return (
    <div className="app">
      <AppHeader
        title="Administrador de tareas"
        subtitle="Organiza tus pendientes del semestre en un solo lugar."
      />

      <AppNavigation />

      <main className="app-main">
        {/* Aquí React Router dibuja la página que coincide con la dirección */}
        <Outlet />
      </main>

      <AppFooter courseName="Diseño Frontend con Frameworks" />
    </div>
  )
}

export default AppLayout

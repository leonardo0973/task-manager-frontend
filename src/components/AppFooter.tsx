interface AppFooterProps {
  courseName: string
}

function AppFooter({ courseName }: AppFooterProps) {
  return (
    <footer className="app-footer">
      <p>Administrador de tareas · {courseName} · EC3</p>
    </footer>
  )
}

export default AppFooter

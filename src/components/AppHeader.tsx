interface AppHeaderProps {
  title: string
  subtitle: string
}

function AppHeader({ title, subtitle }: AppHeaderProps) {
  return (
    <header className="app-header">
      <p className="app-header__eyebrow">Proyecto React + TypeScript</p>
      <h1 className="app-header__title">{title}</h1>
      <p className="app-header__subtitle">{subtitle}</p>
    </header>
  )
}

export default AppHeader

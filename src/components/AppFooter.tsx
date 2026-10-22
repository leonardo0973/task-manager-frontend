interface AppFooterProps {
  courseName: string
}

function AppFooter({ courseName }: AppFooterProps) {
  return (
    <footer className="app-footer">
      <p>{courseName} · EC2 F1 A5</p>
    </footer>
  )
}

export default AppFooter

interface AppFooterProps {
  courseName: string
}

function AppFooter({ courseName }: AppFooterProps) {
  return (
    <footer className="app-footer">
      <p>{courseName} · EC2</p>
    </footer>
  )
}

export default AppFooter

interface TaskPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function TaskPagination({ currentPage, totalPages, onPageChange }: TaskPaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className="pagination" aria-label="Paginación de tareas">
      <button
        className="button button--ghost"
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      <span className="pagination__info" aria-live="polite">
        Página {currentPage} de {totalPages}
      </span>

      <button
        className="button button--ghost"
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </nav>
  )
}

export default TaskPagination

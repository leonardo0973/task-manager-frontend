import type { PageMeta } from '../models/api.types'

interface TaskPaginationProps {
  meta: PageMeta
  disabled: boolean
  onPageChange: (page: number) => void
}

function TaskPagination({ meta, disabled, onPageChange }: TaskPaginationProps) {
  if (meta.totalPages <= 1) {
    return null
  }

  return (
    <nav className="pagination" aria-label="Paginación de tareas">
      <button
        className="button button--ghost"
        type="button"
        disabled={disabled || !meta.hasPreviousPage}
        onClick={() => onPageChange(meta.page - 1)}
      >
        Anterior
      </button>

      <span className="pagination__info" aria-live="polite">
        Página {meta.page} de {meta.totalPages}
      </span>

      <button
        className="button button--ghost"
        type="button"
        disabled={disabled || !meta.hasNextPage}
        onClick={() => onPageChange(meta.page + 1)}
      >
        Siguiente
      </button>
    </nav>
  )
}

export default TaskPagination

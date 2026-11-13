import type { TaskFilter, TaskSort } from '../models/task-view.types'

export const TASK_SEARCH_MAX_LENGTH = 60

interface TaskFiltersProps {
  query: string
  filter: TaskFilter
  sortBy: TaskSort
  resultCount: number
  isLoading: boolean
  onQueryChange: (value: string) => void
  onFilterChange: (value: TaskFilter) => void
  onSortChange: (value: TaskSort) => void
  onClear: () => void
}

function TaskFilters({
  query,
  filter,
  sortBy,
  resultCount,
  isLoading,
  onQueryChange,
  onFilterChange,
  onSortChange,
  onClear,
}: TaskFiltersProps) {
  const hasActiveCriteria = query !== '' || filter !== 'all' || sortBy !== 'updated-desc'

  return (
    <section className="task-filters-panel" aria-labelledby="task-filters-title">
      <p className="section-heading__eyebrow">Consulta</p>
      <h3 id="task-filters-title" className="section-heading__title">
        Consultar tareas
      </h3>

      <div className="filters-grid">
        <label className="filter-field">
          <span>Buscar por título</span>
          <input
            className="field__input"
            type="search"
            value={query}
            maxLength={TASK_SEARCH_MAX_LENGTH}
            placeholder="Ejemplo: preparar"
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </label>

        <label className="filter-field">
          <span>Estado</span>
          <select
            className="field__input"
            value={filter}
            onChange={(event) => onFilterChange(event.target.value as TaskFilter)}
          >
            <option value="all">Todas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
          </select>
        </label>

        <label className="filter-field">
          <span>Orden</span>
          <select
            className="field__input"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as TaskSort)}
          >
            <option value="updated-desc">Actualizadas recientemente</option>
            <option value="updated-asc">Actualizadas anteriormente</option>
            <option value="title-asc">Título A-Z</option>
            <option value="title-desc">Título Z-A</option>
          </select>
        </label>

        <button
          className="button button--ghost"
          type="button"
          onClick={onClear}
          disabled={!hasActiveCriteria}
        >
          Limpiar criterios
        </button>
      </div>

      <p className="filter-results" role="status">
        {isLoading ? 'Actualizando resultados...' : `${resultCount} resultado(s)`}
      </p>
    </section>
  )
}

export default TaskFilters

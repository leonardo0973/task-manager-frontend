import type { TaskFilter, TaskSort } from '../models/task-view.types'

interface TaskFiltersProps {
  query: string
  filter: TaskFilter
  sortBy: TaskSort
  resultCount: number
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
  onQueryChange,
  onFilterChange,
  onSortChange,
  onClear,
}: TaskFiltersProps) {
  const hasActiveCriteria =
    query.trim() !== '' || filter !== 'all' || sortBy !== 'updated-desc'

  const resultLabel =
    resultCount === 1 ? '1 resultado visible.' : `${resultCount} resultados visibles.`

  return (
    <section className="task-filters-panel" aria-labelledby="task-filters-title">
      <p className="section-heading__eyebrow">Consulta</p>
      <h3 id="task-filters-title" className="section-heading__title">
        Buscar y organizar
      </h3>

      <div className="filters-grid">
        <label className="filter-field">
          <span>Buscar por título</span>
          <input
            className="field__input"
            type="search"
            value={query}
            placeholder="Ejemplo: documentación"
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
          <span>Ordenar por</span>
          <select
            className="field__input"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as TaskSort)}
          >
            <option value="updated-desc">Actualización reciente</option>
            <option value="created-desc">Creación reciente</option>
            <option value="title-asc">Título A a Z</option>
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
        {resultLabel}
      </p>
    </section>
  )
}

export default TaskFilters

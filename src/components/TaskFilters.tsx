import type { TaskFilterOption } from '../models/task-filter.types'

interface TaskFiltersProps {
  filters: TaskFilterOption[]
  activeFilter: TaskFilterOption
}

const filterLabels: Record<TaskFilterOption, string> = {
  todas: 'Todas',
  pendientes: 'Pendientes',
  completadas: 'Completadas',
}

function TaskFilters({ filters, activeFilter }: TaskFiltersProps) {
  return (
    <nav className="task-filters" aria-label="Filtros de tareas">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`chip ${filter === activeFilter ? 'chip--active' : ''}`}
          aria-pressed={filter === activeFilter}
          disabled
        >
          {filterLabels[filter]}
        </button>
      ))}
    </nav>
  )
}

export default TaskFilters

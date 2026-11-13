import TaskActions from '../components/TaskActions'
import TaskFilters from '../components/TaskFilters'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import TaskPagination from '../components/TaskPagination'
import TaskSummary from '../components/TaskSummary'
import type { Task } from '../models/task.interface'
import type { TaskFilter, TaskSort } from '../models/task-view.types'

interface TasksPageProps {
  tasks: Task[]
  visibleTasks: Task[]
  paginatedTasks: Task[]
  currentPage: number
  totalPages: number
  completedCount: number
  query: string
  filter: TaskFilter
  sortBy: TaskSort
  emptyMessage: string
  onAddTask: (title: string) => void
  onQueryChange: (value: string) => void
  onFilterChange: (value: TaskFilter) => void
  onSortChange: (value: TaskSort) => void
  onClearCriteria: () => void
  onPageChange: (page: number) => void
  onClearCompleted: () => void
  onToggleStatus: (id: string) => void
  onEditTask: (id: string, title: string) => void
  onDeleteTask: (id: string) => boolean
}

function TasksPage({
  tasks,
  visibleTasks,
  paginatedTasks,
  currentPage,
  totalPages,
  completedCount,
  query,
  filter,
  sortBy,
  emptyMessage,
  onAddTask,
  onQueryChange,
  onFilterChange,
  onSortChange,
  onClearCriteria,
  onPageChange,
  onClearCompleted,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
}: TasksPageProps) {
  return (
    <div className="page-stack">
      <section className="page-introduction" aria-labelledby="tasks-page-title">
        <p className="section-heading__eyebrow">Gestión</p>
        <h2 id="tasks-page-title" className="page-title">
          Mis tareas
        </h2>
        <p className="page-text">
          Registra, consulta y actualiza las actividades almacenadas en el navegador.
        </p>
      </section>

      <div className="app-layout">
        <TaskForm title="Nueva tarea" onAddTask={onAddTask} />

        <section className="card tasks-panel" aria-label="Colección de tareas">
          <TaskSummary tasks={tasks} />

          <TaskFilters
            query={query}
            filter={filter}
            sortBy={sortBy}
            resultCount={visibleTasks.length}
            onQueryChange={onQueryChange}
            onFilterChange={onFilterChange}
            onSortChange={onSortChange}
            onClear={onClearCriteria}
          />

          <TaskActions completedCount={completedCount} onClearCompleted={onClearCompleted} />

          <TaskList
            tasks={paginatedTasks}
            totalCount={visibleTasks.length}
            emptyMessage={emptyMessage}
            onToggleStatus={onToggleStatus}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />

          <TaskPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </section>
      </div>
    </div>
  )
}

export default TasksPage

import type { Task } from '../models/task.interface'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  totalCount: number
  emptyMessage: string
  onToggleStatus: (id: string) => void
  onEditTask: (id: string, title: string) => void
  onDeleteTask: (id: string) => boolean
}

function TaskList({
  tasks,
  totalCount,
  emptyMessage,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
}: TaskListProps) {
  const resultLabel = totalCount === 1 ? '1 tarea' : `${totalCount} tareas`

  return (
    <section className="task-list-section" aria-labelledby="task-list-title">
      <div className="section-heading">
        <div>
          <p className="section-heading__eyebrow">Actividades</p>
          <h3 id="task-list-title" className="section-heading__title">
            Tareas registradas
          </h3>
        </div>
        <span className="result-count">{resultLabel}</span>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state" role="status">
          <h3>Sin resultados</h3>
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="task-list" role="list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default TaskList

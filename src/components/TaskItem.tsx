import type { Task } from '../models/task.interface'
import TaskStatusBadge from './TaskStatusBadge'

interface TaskItemProps {
  task: Task
}

function formatTaskDate(value: string): string {
  const date = new Date(value)

  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
  }).format(date)
}

function TaskItem({ task }: TaskItemProps) {
  const { title, status, updatedAt } = task

  return (
    <article className={`task-item task-item--${status}`} role="listitem">
      <div className="task-item__content">
        <h3 className="task-item__title">{title}</h3>

        <div className="task-item__meta">
          <TaskStatusBadge status={status} />

          <p className="task-item__date">
            Actualizada:{' '}
            <time dateTime={updatedAt}>{formatTaskDate(updatedAt)}</time>
          </p>
        </div>
      </div>

      <div
        className="task-item__actions"
        role="group"
        aria-label={`Acciones para ${title}`}
      >
        <button className="button button--ghost" type="button" disabled>
          Cambiar estado
        </button>
        <button className="button button--ghost" type="button" disabled>
          Editar
        </button>
        <button className="button button--danger" type="button" disabled>
          Eliminar
        </button>
      </div>
    </article>
  )
}

export default TaskItem

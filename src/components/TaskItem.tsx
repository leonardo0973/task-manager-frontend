import type { Task } from '../types'

interface TaskItemProps {
  task: Task
}

const priorityLabels: Record<Task['priority'], string> = {
  alta: 'Prioridad alta',
  media: 'Prioridad media',
  baja: 'Prioridad baja',
}

function TaskItem({ task }: TaskItemProps) {
  const { title, description, priority, dueDate, completed } = task

  return (
    <li className={`task-item ${completed ? 'task-item--completed' : ''}`}>
      <input
        className="task-item__check"
        type="checkbox"
        checked={completed}
        aria-label={`Marcar "${title}" como completada`}
        readOnly
        disabled
      />
      <div className="task-item__body">
        <h3 className="task-item__title">{title}</h3>
        <p className="task-item__description">{description}</p>
        <div className="task-item__meta">
          <span className={`badge badge--${priority}`}>{priorityLabels[priority]}</span>
          <span className="task-item__date">Fecha límite: {dueDate}</span>
          <span className={`status ${completed ? 'status--done' : 'status--pending'}`}>
            {completed ? 'Completada' : 'Pendiente'}
          </span>
        </div>
      </div>
      <div className="task-item__actions">
        <button className="button button--ghost" type="button" disabled>
          Editar
        </button>
        <button className="button button--danger" type="button" disabled>
          Eliminar
        </button>
      </div>
    </li>
  )
}

export default TaskItem

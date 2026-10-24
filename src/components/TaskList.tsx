import type { Task } from '../models/task.interface'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onToggleStatus: (id: string) => void
  onEditTask: (id: string, title: string) => void
  onDeleteTask: (id: string) => void
}

function TaskList({ tasks, onToggleStatus, onEditTask, onDeleteTask }: TaskListProps) {
  const resultLabel = tasks.length === 1 ? '1 tarea' : `${tasks.length} tareas`

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
          <h3>No hay tareas registradas</h3>
          <p>Utiliza el formulario para registrar una nueva actividad.</p>
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

import type { Task } from '../models/task.interface'

interface TaskSummaryProps {
  tasks: Task[]
}

function TaskSummary({ tasks }: TaskSummaryProps) {
  const completed = tasks.filter(({ status }) => status === 'completed').length
  const pending = tasks.length - completed

  return (
    <section className="task-summary" aria-label="Resumen de tareas">
      <article className="stat">
        <span className="stat__value">{tasks.length}</span>
        <span className="stat__label">Total</span>
      </article>
      <article className="stat stat--pending">
        <span className="stat__value">{pending}</span>
        <span className="stat__label">Pendientes</span>
      </article>
      <article className="stat stat--done">
        <span className="stat__value">{completed}</span>
        <span className="stat__label">Completadas</span>
      </article>
    </section>
  )
}

export default TaskSummary

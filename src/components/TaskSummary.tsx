import type { Task } from '../models/task.interface'

interface TaskSummaryProps {
  tasks: Task[]
  total: number
}

// La API no entrega totales por estado: pendientes y completadas
// corresponden solo a la página actual.
function TaskSummary({ tasks, total }: TaskSummaryProps) {
  const pendingOnPage = tasks.filter((task) => task.status === 'pending').length
  const completedOnPage = tasks.length - pendingOnPage

  return (
    <section className="task-summary" aria-label="Resumen de tareas">
      <article className="stat">
        <span className="stat__value">{total}</span>
        <span className="stat__label">Resultado(s) en la consulta</span>
      </article>
      <article className="stat stat--pending">
        <span className="stat__value">{pendingOnPage}</span>
        <span className="stat__label">Pendientes en esta página</span>
      </article>
      <article className="stat stat--done">
        <span className="stat__value">{completedOnPage}</span>
        <span className="stat__label">Completadas en esta página</span>
      </article>
    </section>
  )
}

export default TaskSummary

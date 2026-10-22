interface TaskSummaryProps {
  total: number
  completed: number
  pending: number
}

function TaskSummary({ total, completed, pending }: TaskSummaryProps) {
  return (
    <section className="task-summary" aria-label="Resumen de tareas">
      <article className="stat">
        <span className="stat__value">{total}</span>
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

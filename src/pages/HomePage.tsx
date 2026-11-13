import { Link } from 'react-router'
import TaskSummary from '../components/TaskSummary'
import type { Task } from '../models/task.interface'

interface HomePageProps {
  tasks: Task[]
}

function HomePage({ tasks }: HomePageProps) {
  return (
    <div className="page-stack">
      <section className="card welcome-panel" aria-labelledby="home-title">
        <p className="section-heading__eyebrow">Inicio</p>
        <h2 id="home-title" className="page-title">
          Organiza y consulta tus actividades
        </h2>
        <p className="page-text">
          Registra tareas, actualiza su estado y utiliza las herramientas de
          consulta para concentrarte en el trabajo importante.
        </p>

        <div className="welcome-panel__actions">
          <Link className="button-link" to="/tasks">
            Administrar tareas
          </Link>
        </div>
      </section>

      <section className="card" aria-label="Resumen general">
        <TaskSummary tasks={tasks} />
      </section>
    </div>
  )
}

export default HomePage

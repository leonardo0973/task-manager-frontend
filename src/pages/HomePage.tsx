import { Link } from 'react-router'

function HomePage() {
  return (
    <section className="card welcome-panel" aria-labelledby="home-title">
      <p className="section-heading__eyebrow">Inicio</p>
      <h2 id="home-title" className="page-title">
        Administrador de tareas conectado
      </h2>
      <p className="page-text">
        Las tareas se consultan y actualizan mediante la API REST de Express y MongoDB Atlas.
      </p>

      <div className="welcome-panel__actions">
        <Link className="button-link" to="/tasks">
          Administrar tareas
        </Link>
      </div>
    </section>
  )
}

export default HomePage

import AppFooter from './components/AppFooter'
import AppHeader from './components/AppHeader'
import TaskFilters from './components/TaskFilters'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskSummary from './components/TaskSummary'
import { tasks } from './data/tasks'
import type { TaskFilterOption } from './models/task-filter.types'
import './styles/app.css'

const filters: TaskFilterOption[] = ['todas', 'pendientes', 'completadas']

function App() {
  return (
    <div className="app">
      <AppHeader
        title="Administrador de tareas"
        subtitle="Organiza tus pendientes del semestre en un solo lugar."
      />

      <main className="app-layout">
        <TaskForm title="Nueva tarea" />

        <section className="card tasks-panel" aria-labelledby="tasks-title">
          <div className="tasks-panel__header">
            <h2 id="tasks-title" className="card__title">Mis tareas</h2>
            <TaskFilters filters={filters} activeFilter="todas" />
          </div>

          <TaskSummary tasks={tasks} />

          <TaskList tasks={tasks} />
        </section>
      </main>

      <AppFooter courseName="Diseño Frontend con Frameworks" />
    </div>
  )
}

export default App

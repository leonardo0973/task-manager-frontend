import AppFooter from './components/AppFooter'
import AppHeader from './components/AppHeader'
import TaskFilters from './components/TaskFilters'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskSummary from './components/TaskSummary'
import type { Task, TaskFilter } from './types'
import './styles/app.css'

const demoTasks: Task[] = [
  {
    id: 1,
    title: 'Configurar el proyecto con Vite',
    description: 'Generar la plantilla de React con TypeScript e instalar dependencias con PNPM.',
    priority: 'alta',
    dueDate: '20/10/2026',
    completed: true,
  },
  {
    id: 2,
    title: 'Crear los componentes de la interfaz',
    description: 'Separar encabezado, formulario, filtros, resumen y lista en componentes reutilizables.',
    priority: 'media',
    dueDate: '24/10/2026',
    completed: false,
  },
  {
    id: 3,
    title: 'Documentar el repositorio',
    description: 'Actualizar README.md y responder las preguntas de cierre de la actividad.',
    priority: 'baja',
    dueDate: '27/10/2026',
    completed: false,
  },
]

const filters: TaskFilter[] = ['todas', 'pendientes', 'completadas']

function App() {
  const completedTasks = demoTasks.filter((task) => task.completed).length
  const pendingTasks = demoTasks.length - completedTasks

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
          <TaskSummary
            total={demoTasks.length}
            completed={completedTasks}
            pending={pendingTasks}
          />
          <TaskList tasks={demoTasks} />
        </section>
      </main>

      <AppFooter courseName="Diseño Frontend con Frameworks" />
    </div>
  )
}

export default App

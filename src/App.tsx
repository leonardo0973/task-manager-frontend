import { useState } from 'react'
import AppFooter from './components/AppFooter'
import AppHeader from './components/AppHeader'
import TaskActions from './components/TaskActions'
import TaskFilters from './components/TaskFilters'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskSummary from './components/TaskSummary'
import { tasks as initialTasks } from './data/tasks'
import type { TaskFilterOption } from './models/task-filter.types'
import type { Task } from './models/task.interface'
import './styles/app.css'

const filters: TaskFilterOption[] = ['todas', 'pendientes', 'completadas']

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => [...initialTasks])

  const completedCount = tasks.filter((task) => task.status === 'completed').length

  function handleAddTask(title: string) {
    const now = new Date().toISOString()

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    }

    setTasks((currentTasks) => [newTask, ...currentTasks])
  }

  function handleToggleStatus(id: string) {
    const now = new Date().toISOString()

    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== id) {
          return task
        }

        return {
          ...task,
          status: task.status === 'pending' ? 'completed' : 'pending',
          updatedAt: now,
        }
      }),
    )
  }

  function handleEditTask(id: string, title: string) {
    const now = new Date().toISOString()

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, title, updatedAt: now } : task,
      ),
    )
  }

  function handleDeleteTask(id: string) {
    const selectedTask = tasks.find((task) => task.id === id)

    if (!selectedTask) {
      return
    }

    const shouldDelete = window.confirm(`¿Eliminar la tarea "${selectedTask.title}"?`)

    if (!shouldDelete) {
      return
    }

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  function handleClearCompleted() {
    if (completedCount === 0) {
      return
    }

    const shouldClear = window.confirm(
      `¿Eliminar ${completedCount === 1 ? 'la tarea completada' : `las ${completedCount} tareas completadas`}?`,
    )

    if (!shouldClear) {
      return
    }

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.status !== 'completed'),
    )
  }

  return (
    <div className="app">
      <AppHeader
        title="Administrador de tareas"
        subtitle="Organiza tus pendientes del semestre en un solo lugar."
      />

      <main className="app-layout">
        <TaskForm title="Nueva tarea" onAddTask={handleAddTask} />

        <section className="card tasks-panel" aria-labelledby="tasks-title">
          <div className="tasks-panel__header">
            <h2 id="tasks-title" className="card__title">Mis tareas</h2>
            <TaskFilters filters={filters} activeFilter="todas" />
          </div>

          <TaskSummary tasks={tasks} />

          <TaskActions
            completedCount={completedCount}
            onClearCompleted={handleClearCompleted}
          />

          <TaskList
            tasks={tasks}
            onToggleStatus={handleToggleStatus}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </section>
      </main>

      <AppFooter courseName="Diseño Frontend con Frameworks" />
    </div>
  )
}

export default App

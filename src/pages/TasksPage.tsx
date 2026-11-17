import { useState } from 'react'
import { useSearchParams } from 'react-router'
import AsyncStatus from '../components/AsyncStatus'
import TaskFilters, { TASK_SEARCH_MAX_LENGTH } from '../components/TaskFilters'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import TaskPagination from '../components/TaskPagination'
import TaskSummary from '../components/TaskSummary'
import { useAuth } from '../hooks/useAuth'
import { useTaskList } from '../hooks/useTaskList'
import type { SortOrder, TaskListQuery, TaskSortField } from '../models/api.types'
import type { Task } from '../models/task.interface'
import type { TaskFilter, TaskSort } from '../models/task-view.types'
import { getHttpErrorMessage } from '../services/http.service'
import {
  createTask as createTaskRequest,
  deleteTask as deleteTaskRequest,
  updateTask as updateTaskRequest,
} from '../services/task.api.service'

const PAGE_SIZE = 5

const DEFAULT_FILTER: TaskFilter = 'all'
const DEFAULT_SORT: TaskSort = 'updated-desc'
const TASK_FILTERS: TaskFilter[] = ['all', 'pending', 'completed']
const TASK_SORTS: TaskSort[] = ['updated-desc', 'updated-asc', 'title-asc', 'title-desc']

interface QueryChanges {
  q?: string
  status?: TaskFilter
  sort?: TaskSort
  page?: number
}

function mapSort(sort: TaskSort): { sortBy: TaskSortField; order: SortOrder } {
  switch (sort) {
    case 'updated-asc':
      return { sortBy: 'updatedAt', order: 'asc' }
    case 'title-asc':
      return { sortBy: 'title', order: 'asc' }
    case 'title-desc':
      return { sortBy: 'title', order: 'desc' }
    default:
      return { sortBy: 'updatedAt', order: 'desc' }
  }
}

// Desafío A10: los criterios se leen de la URL y se validan antes de usarse
function readFilter(value: string | null): TaskFilter {
  return TASK_FILTERS.find((filter) => filter === value) ?? DEFAULT_FILTER
}

function readSort(value: string | null): TaskSort {
  return TASK_SORTS.find((sort) => sort === value) ?? DEFAULT_SORT
}

function readPage(value: string | null): number {
  if (!value || !/^\d+$/.test(value)) {
    return 1
  }

  const page = Number(value)
  return page >= 1 ? page : 1
}

function TasksPage() {
  const { accessToken, user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isMutating, setIsMutating] = useState(false)
  const [operationMessage, setOperationMessage] = useState('')
  const [operationFailed, setOperationFailed] = useState(false)

  const query = (searchParams.get('q') ?? '').slice(0, TASK_SEARCH_MAX_LENGTH)
  const filter = readFilter(searchParams.get('status'))
  const sort = readSort(searchParams.get('sort'))
  const page = readPage(searchParams.get('page'))

  const mappedSort = mapSort(sort)
  // Regla visual: solo admin ve Eliminar. La API exige el rol de todos modos.
  const canDelete = user?.role === 'admin'

  const taskListQuery: TaskListQuery = {
    page,
    limit: PAGE_SIZE,
    search: query.trim() || undefined,
    status: filter === 'all' ? undefined : filter,
    sortBy: mappedSort.sortBy,
    order: mappedSort.order,
  }

  const { tasks, meta, status, errorMessage, reload } = useTaskList(taskListQuery, accessToken)

  // Escribe los criterios en la URL omitiendo los valores predeterminados
  function updateQuery(changes: QueryChanges, replace = false): void {
    const next = { q: query, status: filter, sort, page, ...changes }
    const params = new URLSearchParams()

    if (next.q) params.set('q', next.q)
    if (next.status !== DEFAULT_FILTER) params.set('status', next.status)
    if (next.sort !== DEFAULT_SORT) params.set('sort', next.sort)
    if (next.page > 1) params.set('page', String(next.page))

    setSearchParams(params, { replace })
  }

  function setPage(nextPage: number): void {
    updateQuery({ page: nextPage })
  }

  function requireToken(): string | null {
    if (accessToken) {
      return accessToken
    }

    setOperationFailed(true)
    setOperationMessage('La sesión no está disponible.')
    return null
  }

  async function runMutation(
    operation: () => Promise<unknown>,
    successMessage: string,
  ): Promise<boolean> {
    setIsMutating(true)
    setOperationMessage('')
    setOperationFailed(false)

    try {
      await operation()
      setOperationMessage(successMessage)
      return true
    } catch (error) {
      setOperationFailed(true)
      setOperationMessage(getHttpErrorMessage(error))
      return false
    } finally {
      setIsMutating(false)
    }
  }

  function refreshAfterMutation(): void {
    if (page !== 1) {
      setPage(1)
      return
    }

    reload()
  }

  async function handleAddTask(title: string): Promise<boolean> {
    const token = requireToken()
    if (!token) return false

    const succeeded = await runMutation(
      () => createTaskRequest({ title }, token),
      'La tarea fue creada.',
    )

    if (succeeded) {
      refreshAfterMutation()
    }

    return succeeded
  }

  async function handleToggleStatus(task: Task): Promise<boolean> {
    const token = requireToken()
    if (!token) return false

    const nextStatus = task.status === 'pending' ? 'completed' : 'pending'

    const succeeded = await runMutation(
      () => updateTaskRequest(task.id, { status: nextStatus }, token),
      'El estado fue actualizado.',
    )

    if (succeeded) {
      reload()
    }

    return succeeded
  }

  async function handleEditTask(task: Task, title: string): Promise<boolean> {
    const token = requireToken()
    if (!token) return false

    const succeeded = await runMutation(
      () => updateTaskRequest(task.id, { title }, token),
      'El título fue actualizado.',
    )

    if (succeeded) {
      reload()
    }

    return succeeded
  }

  async function handleDeleteTask(task: Task): Promise<boolean> {
    const token = requireToken()
    if (!token) return false

    if (!canDelete) {
      setOperationFailed(true)
      setOperationMessage('Solo el rol admin puede eliminar tareas.')
      return false
    }

    const shouldDelete = window.confirm(`¿Eliminar la tarea "${task.title}"?`)

    // Al cancelar no se envía ninguna solicitud DELETE
    if (!shouldDelete) {
      return false
    }

    const succeeded = await runMutation(
      () => deleteTaskRequest(task.id, token),
      'La tarea fue eliminada.',
    )

    if (succeeded) {
      // Si era el último registro de una página posterior, se regresa a la anterior
      if (tasks.length === 1 && page > 1) {
        setPage(page - 1)
      } else {
        reload()
      }
    }

    return succeeded
  }

  function handleQueryChange(value: string): void {
    // replace: escribir no llena el historial con una entrada por letra
    updateQuery({ q: value, page: 1 }, true)
  }

  function handleFilterChange(value: TaskFilter): void {
    updateQuery({ status: value, page: 1 })
  }

  function handleSortChange(value: TaskSort): void {
    updateQuery({ sort: value, page: 1 })
  }

  function handleClear(): void {
    setSearchParams(new URLSearchParams())
    setOperationMessage('')
  }

  return (
    <div className="page-stack">
      <section className="page-introduction" aria-labelledby="tasks-page-title">
        <p className="section-heading__eyebrow">Gestión autenticada</p>
        <h2 id="tasks-page-title" className="page-title">
          Tareas
        </h2>
        <p className="page-text">
          Sesión de {user?.name}. Los cambios se guardan mediante la API REST.
        </p>
        {!canDelete && (
          <p className="permission-note">
            Tu rol puede consultar, crear y actualizar. La eliminación requiere admin.
          </p>
        )}
      </section>

      <div className="app-layout">
        <TaskForm title="Nueva tarea" isSubmitting={isMutating} onAddTask={handleAddTask} />

        <section className="card tasks-panel" aria-label="Colección de tareas">
          {operationMessage && (
            <p
              className={
                operationFailed
                  ? 'operation-message operation-message--error'
                  : 'operation-message'
              }
              role={operationFailed ? 'alert' : 'status'}
            >
              {operationMessage}
            </p>
          )}

          <TaskFilters
            query={query}
            filter={filter}
            sortBy={sort}
            resultCount={meta.total}
            isLoading={status === 'loading'}
            onQueryChange={handleQueryChange}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            onClear={handleClear}
          />

          <AsyncStatus status={status} errorMessage={errorMessage} onRetry={reload} />

          {status !== 'error' && (
            <>
              <TaskSummary tasks={tasks} total={meta.total} />

              <TaskList
                tasks={tasks}
                canDelete={canDelete}
                onToggleStatus={handleToggleStatus}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />

              <TaskPagination
                meta={meta}
                disabled={status === 'loading' || isMutating}
                onPageChange={setPage}
              />
            </>
          )}
        </section>
      </div>
    </div>
  )
}

export default TasksPage

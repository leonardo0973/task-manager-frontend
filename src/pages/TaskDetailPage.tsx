import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import TaskStatusBadge from '../components/TaskStatusBadge'
import { useAuth } from '../hooks/useAuth'
import type { Task } from '../models/task.interface'
import { getHttpErrorMessage, isAbortError, isHttpError } from '../services/http.service'
import { deleteTask, getTaskById } from '../services/task.api.service'
import { formatTaskDate } from '../utils/date'
import NotFoundPage from './NotFoundPage'

type DetailStatus = 'loading' | 'success' | 'not-found' | 'error'

function TaskDetailPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const navigate = useNavigate()
  const { accessToken, user } = useAuth()
  const canDelete = user?.role === 'admin'
  const [task, setTask] = useState<Task | null>(null)
  const [status, setStatus] = useState<DetailStatus>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // El detalle consulta GET /api/tasks/:id; no depende de la lista cargada,
  // por eso funciona al recargar directamente la ruta
  useEffect(() => {
    if (!taskId || !accessToken) {
      return
    }

    const id = taskId
    const token = accessToken
    const controller = new AbortController()

    async function loadTask(): Promise<void> {
      setStatus('loading')
      setErrorMessage('')

      try {
        const response = await getTaskById(id, token, controller.signal)
        setTask(response.data)
        setStatus('success')
      } catch (error) {
        if (isAbortError(error)) {
          return
        }

        // 404: no existe. 400 INVALID_ID: el identificador ni siquiera tiene formato válido
        if (
          isHttpError(error) &&
          (error.status === 404 || (error.status === 400 && error.code === 'INVALID_ID'))
        ) {
          setStatus('not-found')
          return
        }

        setStatus('error')
        setErrorMessage(getHttpErrorMessage(error))
      }
    }

    void loadTask()

    return () => controller.abort()
  }, [taskId, accessToken, reloadKey])

  async function handleDelete(): Promise<void> {
    if (!task || !accessToken || !canDelete) {
      return
    }

    const shouldDelete = window.confirm(`¿Eliminar la tarea "${task.title}"?`)

    if (!shouldDelete) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteTask(task.id, accessToken)
      navigate('/tasks', { replace: true })
    } catch (error) {
      setStatus('error')
      setErrorMessage(getHttpErrorMessage(error))
      setIsDeleting(false)
    }
  }

  if (!taskId) {
    return <NotFoundPage title="Tarea no encontrada" message="La tarea no existe o fue eliminada." />
  }

  if (status === 'loading') {
    return (
      <p className="request-status" role="status">
        Consultando tarea...
      </p>
    )
  }

  if (status === 'not-found') {
    return (
      <NotFoundPage title="Tarea no encontrada" message="La tarea no existe o fue eliminada." />
    )
  }

  if (status === 'error' || !task) {
    return (
      <section className="card request-status--error" role="alert">
        <h2 className="page-title">No fue posible consultar la tarea</h2>
        <p className="page-text">{errorMessage}</p>
        <div className="task-detail__actions task-detail__actions--spaced">
          <button
            className="button button--primary"
            type="button"
            onClick={() => setReloadKey((current) => current + 1)}
          >
            Reintentar
          </button>
          <Link className="button-link button-link--secondary" to="/tasks">
            Volver a tareas
          </Link>
        </div>
      </section>
    )
  }

  return (
    <article className="card task-detail" aria-labelledby="task-detail-title">
      <p className="section-heading__eyebrow">Detalle protegido</p>
      <h2 id="task-detail-title" className="page-title">
        {task.title}
      </h2>

      <dl className="task-detail__grid">
        <div>
          <dt>Identificador</dt>
          <dd>{task.id}</dd>
        </div>
        <div>
          <dt>Estado</dt>
          <dd>
            <TaskStatusBadge status={task.status} />
          </dd>
        </div>
        <div>
          <dt>Fecha de creación</dt>
          <dd>
            <time dateTime={task.createdAt}>{formatTaskDate(task.createdAt)}</time>
          </dd>
        </div>
        <div>
          <dt>Última actualización</dt>
          <dd>
            <time dateTime={task.updatedAt}>{formatTaskDate(task.updatedAt)}</time>
          </dd>
        </div>
      </dl>

      {!canDelete && <p className="permission-note">La eliminación requiere el rol admin.</p>}

      <div className="task-detail__actions">
        <Link className="button-link button-link--secondary" to="/tasks">
          Volver a tareas
        </Link>
        {canDelete && (
          <button
            className="button button--danger"
            type="button"
            disabled={isDeleting}
            onClick={() => void handleDelete()}
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar tarea'}
          </button>
        )}
      </div>
    </article>
  )
}

export default TaskDetailPage

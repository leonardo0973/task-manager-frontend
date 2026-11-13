import { useState } from 'react'
import type { FormEvent } from 'react'
import { TASK_TITLE_MAX_LENGTH, validateTaskTitle } from '../utils/task-validation'

interface TaskFormProps {
  title: string
  isSubmitting: boolean
  onAddTask: (title: string) => Promise<boolean>
}

function TaskForm({ title: formTitle, isSubmitting, onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  function handleTitleChange(value: string): void {
    setTitle(value)

    if (error) {
      setError(validateTaskTitle(value) ?? '')
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    const validationMessage = validateTaskTitle(title)

    // Un título inválido no llega a la API (no se hace POST)
    if (validationMessage) {
      setError(validationMessage)
      return
    }

    const wasCreated = await onAddTask(title.trim())

    // El campo se limpia solo si el POST fue satisfactorio
    if (wasCreated) {
      setTitle('')
      setError('')
    }
  }

  return (
    <section className="card task-form" aria-labelledby="task-form-title">
      <p className="section-heading__eyebrow">Registro</p>
      <h2 id="task-form-title" className="card__title">{formTitle}</h2>

      <form
        className="task-form__fields"
        onSubmit={(event) => void handleSubmit(event)}
        noValidate
      >
        <label className="field" htmlFor="task-title">
          <span className="field__label">Título de la tarea</span>
          <input
            id="task-title"
            name="title"
            className="field__input"
            type="text"
            placeholder="Ejemplo: revisar documentación"
            maxLength={TASK_TITLE_MAX_LENGTH}
            value={title}
            disabled={isSubmitting}
            onChange={(event) => handleTitleChange(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'task-title-help task-title-error' : 'task-title-help'}
          />
        </label>

        {error && (
          <p id="task-title-error" className="field-error" role="alert">
            {error}
          </p>
        )}

        <button className="button button--primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Agregar tarea'}
        </button>

        <p id="task-title-help" className="hint">
          {title.length}/{TASK_TITLE_MAX_LENGTH} caracteres
        </p>
      </form>
    </section>
  )
}

export default TaskForm

import { useState } from 'react'
import type { FormEvent } from 'react'

interface TaskFormProps {
  title: string
  onAddTask: (title: string) => void
}

function TaskForm({ title: formTitle, onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const normalizedTitle = title.trim()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!normalizedTitle) {
      return
    }

    onAddTask(normalizedTitle)
    setTitle('')
  }

  return (
    <section className="card task-form" aria-labelledby="task-form-title">
      <p className="section-heading__eyebrow">Registro</p>
      <h2 id="task-form-title" className="card__title">{formTitle}</h2>

      <form className="task-form__fields" onSubmit={handleSubmit}>
        <label className="field" htmlFor="task-title">
          <span className="field__label">Título de la tarea</span>
          <input
            id="task-title"
            name="title"
            className="field__input"
            type="text"
            placeholder="Ejemplo: revisar documentación"
            maxLength={120}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>

        <button
          className="button button--primary"
          type="submit"
          disabled={!normalizedTitle}
        >
          Agregar tarea
        </button>

        <p className="hint">{title.length}/120 caracteres</p>
      </form>
    </section>
  )
}

export default TaskForm

interface TaskFormProps {
  title: string
}

function TaskForm({ title }: TaskFormProps) {
  return (
    <section className="card task-form" aria-labelledby="task-form-title">
      <p className="section-heading__eyebrow">Registro</p>
      <h2 id="task-form-title" className="card__title">{title}</h2>
      <form className="task-form__fields">
        <label className="field" htmlFor="task-title">
          <span className="field__label">Título de la tarea</span>
          <input
            id="task-title"
            className="field__input"
            type="text"
            placeholder="Ejemplo: revisar documentación"
            maxLength={120}
            disabled
          />
        </label>
        <button className="button button--primary" type="button" disabled>
          Agregar tarea
        </button>
        <p className="hint">El registro de tareas se incorporará en la actividad 7.</p>
      </form>
    </section>
  )
}

export default TaskForm

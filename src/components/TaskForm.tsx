interface TaskFormProps {
  title: string
}

function TaskForm({ title }: TaskFormProps) {
  return (
    <section className="card task-form" aria-labelledby="task-form-title">
      <h2 id="task-form-title" className="card__title">{title}</h2>
      <form className="task-form__fields">
        <label className="field">
          <span className="field__label">Título</span>
          <input className="field__input" type="text" placeholder="Ej. Estudiar componentes" disabled />
        </label>
        <label className="field">
          <span className="field__label">Descripción</span>
          <textarea className="field__input" rows={3} placeholder="Detalles de la tarea" disabled />
        </label>
        <div className="task-form__row">
          <label className="field">
            <span className="field__label">Prioridad</span>
            <select className="field__input" defaultValue="media" disabled>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </label>
          <label className="field">
            <span className="field__label">Fecha límite</span>
            <input className="field__input" type="date" disabled />
          </label>
        </div>
        <button className="button button--primary" type="button" disabled>
          Agregar tarea
        </button>
        <p className="hint">La función para agregar tareas se incorporará en una actividad posterior.</p>
      </form>
    </section>
  )
}

export default TaskForm

interface TaskActionsProps {
  completedCount: number
  onClearCompleted: () => void
}

function TaskActions({ completedCount, onClearCompleted }: TaskActionsProps) {
  const label =
    completedCount === 1
      ? '1 tarea completada'
      : `${completedCount} tareas completadas`

  return (
    <div className="task-actions" role="group" aria-label="Acciones generales">
      <span className="task-actions__info">{label}</span>
      <button
        className="button button--danger"
        type="button"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Eliminar completadas
      </button>
    </div>
  )
}

export default TaskActions

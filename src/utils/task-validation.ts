export const TASK_TITLE_MIN_LENGTH = 3
export const TASK_TITLE_MAX_LENGTH = 120

export function validateTaskTitle(value: string): string | null {
  const title = value.trim()

  if (!title) {
    return 'Escribe el título de la tarea.'
  }

  if (title.length < TASK_TITLE_MIN_LENGTH) {
    return `El título debe tener al menos ${TASK_TITLE_MIN_LENGTH} caracteres.`
  }

  if (title.length > TASK_TITLE_MAX_LENGTH) {
    return `El título no puede superar ${TASK_TITLE_MAX_LENGTH} caracteres.`
  }

  return null
}

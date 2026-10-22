export type TaskPriority = 'alta' | 'media' | 'baja'

export interface Task {
  id: number
  title: string
  description: string
  priority: TaskPriority
  dueDate: string
  completed: boolean
}

export type TaskFilter = 'todas' | 'pendientes' | 'completadas'

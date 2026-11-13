import type { Task } from '../models/task.interface'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onToggleStatus: (task: Task) => Promise<boolean>
  onEditTask: (task: Task, title: string) => Promise<boolean>
  onDeleteTask: (task: Task) => Promise<boolean>
}

// Los mensajes de carga, vacío y error los presenta AsyncStatus
function TaskList({ tasks, onToggleStatus, onEditTask, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return null
  }

  return (
    <div className="task-list" role="list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  )
}

export default TaskList

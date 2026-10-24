# Administrador de tareas Frontend

Aplicación desarrollada con React, TypeScript, Vite y PNPM.
Proyecto integrador de la materia *Diseño Frontend con Frameworks* (EC2).

## Funciones actuales

- Operaciones CRUD de tareas (registrar, consultar, completar/reabrir, editar y eliminar con confirmación).
- Eliminación de todas las tareas completadas en una sola operación.
- Validación al registrar y editar (mínimo 3 y máximo 120 caracteres) con mensajes accesibles.
- Búsqueda por título (sin distinguir mayúsculas ni espacios externos).
- Filtro por estado: Todas, Pendientes y Completadas.
- Ordenamiento por actualización reciente, creación reciente y título A a Z.
- Paginación local de cinco resultados por página.
- Resumen calculado con todas las tareas.
- Persistencia mediante `localStorage` (clave `task-manager.tasks`).
- Interfaz adaptable.

## Ejecución

```bash
pnpm install
pnpm dev
```

## Validación técnica

```bash
pnpm lint
pnpm build
```

## Estructura principal

```
src/
├── components/   # Componentes visuales (TaskForm, TaskFilters, TaskList, TaskItem, ...)
├── data/         # Tareas iniciales de respaldo
├── models/       # Task, TaskStatus, TaskFilter, TaskSort y TaskViewOptions
├── services/     # Consulta (task-query) y almacenamiento local (task-storage)
├── styles/       # Estilos globales y de la aplicación
├── utils/        # Validación del título
├── App.tsx       # Estado principal, operaciones CRUD y vista derivada
└── main.tsx      # Punto de entrada
docs/             # Preguntas de cierre de cada actividad
```

## Flujo de datos

| Etapa          | Entrada                               | Resultado                                      |
|----------------|---------------------------------------|------------------------------------------------|
| Carga inicial  | `localStorage` o datos de respaldo    | `tasks` en `App`                               |
| Vista derivada | `tasks`, `query`, `filter` y `sortBy` | `getVisibleTasks` produce la lista de `TaskList` |
| Sincronización | Cambio en `tasks`                     | `useEffect` guarda la colección                |

## Modelo Task

```ts
export type TaskStatus = 'pending' | 'completed'

export interface Task {
  id: string
  title: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
}
```

## Alcance

Esta versión utiliza almacenamiento local del navegador.
La conexión con la API REST se realizará en el EC3.

## Autor

Leonardo — Ingeniería en Sistemas, Universidad Estatal de Sonora.

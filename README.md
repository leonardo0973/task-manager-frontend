# Administrador de tareas - Frontend

Aplicación desarrollada con React, TypeScript, Vite y PNPM para administrar tareas.
Proyecto integrador de la materia *Diseño Frontend con Frameworks*.

## Alcance actual (EC2 F1 A6)

La aplicación permite visualizar una colección local de tareas mediante componentes React.

Actualmente incluye:

- Modelo de tarea con TypeScript (`Task` y `TaskStatus`).
- Cinco tareas locales en `src/data/tasks.ts`.
- Renderizado mediante `map`.
- Uso de claves estables (`key={task.id}`).
- Estados pendiente y completada (componente `TaskStatusBadge`).
- Resumen calculado a partir de la colección.
- Mensaje para una colección vacía.
- Diseño adaptable.

Los formularios, eventos y operaciones CRUD se implementarán en actividades posteriores.

## Tecnologías

- React
- TypeScript
- Vite
- PNPM
- Oxlint
- CSS
- Git y GitHub

## Instalación

```bash
pnpm install
```

## Ejecución

```bash
pnpm dev
```

## Validación

```bash
pnpm lint
pnpm build
```

## Estructura principal

- `components`: componentes visuales.
- `data`: colección local de tareas.
- `models`: tipos e interfaces.
- `styles`: estilos globales.
- `docs`: preguntas y documentación.

## Modelo Task

Cada tarea contiene `id`, `title`, `status`, `createdAt` y `updatedAt`.

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

Las fechas se guardan como cadenas ISO porque así las entregará la API REST.

## Autor

Leonardo — Ingeniería en Sistemas, Universidad Estatal de Sonora.

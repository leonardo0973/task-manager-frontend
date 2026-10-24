# Administrador de tareas - Frontend

Aplicación desarrollada con React, TypeScript, Vite y PNPM para administrar tareas.
Proyecto integrador de la materia *Diseño Frontend con Frameworks*.

## Alcance actual (EC2 F2 A7)

La aplicación administra una colección local de tareas mediante estado de React. Actualmente permite:

- Registrar tareas.
- Consultar la colección.
- Completar y reabrir tareas.
- Editar títulos.
- Cancelar una edición.
- Eliminar con confirmación.
- Eliminar todas las tareas completadas en una sola operación.
- Calcular el resumen automáticamente.
- Mostrar una colección vacía.

Los cambios permanecen en memoria y se reinician al recargar.

## Operaciones CRUD

- Create: registro mediante el formulario (`spread`).
- Read: renderizado de la colección (`map`).
- Update: cambio de estado y edición (`map` y `spread`).
- Delete: eliminación confirmada (`filter`).

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

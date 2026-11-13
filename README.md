# Administrador de tareas Frontend

Aplicación desarrollada con React, TypeScript, Vite, React Router y PNPM.
Proyecto integrador de la materia *Diseño Frontend con Frameworks* (EC3).

## Funciones actuales

- Navegación SPA con React Router 7.18.4 (modo declarativo).
- Página de inicio con el resumen de tareas.
- Administración de tareas en `/tasks`.
- Detalle de cada tarea mediante una ruta dinámica.
- Página 404 para direcciones y tareas inexistentes.
- Operaciones CRUD (registrar, completar/reabrir, editar y eliminar con confirmación).
- Eliminación de todas las tareas completadas en una sola operación.
- Validación de títulos (mínimo 3 y máximo 120 caracteres).
- Búsqueda, filtros y ordenamiento.
- Búsqueda conservada en la URL (`/tasks?q=texto`).
- Paginación local de cinco resultados por página.
- Persistencia mediante `localStorage` (clave `task-manager.tasks`).
- Interfaz adaptable.

## Rutas

| Ruta             | Página           | Responsabilidad                         |
|------------------|------------------|-----------------------------------------|
| `/`              | `HomePage`       | Presentar la aplicación y su resumen    |
| `/tasks`         | `TasksPage`      | Administrar la colección completa       |
| `/tasks/:taskId` | `TaskDetailPage` | Mostrar una tarea identificada por su ID |
| `*`              | `NotFoundPage`   | Responder ante una ruta inexistente     |

Todas las páginas se muestran dentro de `AppLayout` (encabezado, navegación, contenido y pie) mediante `Outlet`.

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
├── components/   # Componentes visuales (AppNavigation, TaskForm, TaskList, TaskItem, ...)
├── data/         # Tareas iniciales de respaldo
├── layouts/      # AppLayout con Outlet
├── models/       # Task, TaskStatus, TaskFilter y TaskSort
├── pages/        # HomePage, TasksPage, TaskDetailPage y NotFoundPage
├── services/     # Consulta y almacenamiento local
├── styles/       # Estilos globales y de la aplicación
├── utils/        # Validación del título y formato de fechas
├── App.tsx       # Estado principal, operaciones CRUD y declaración de rutas
└── main.tsx      # Punto de entrada con BrowserRouter
docs/             # Preguntas de cierre de cada actividad
```

## Alcance

Esta versión utiliza almacenamiento local.
La API REST se integrará en la Actividad 10.

## Autor

Leonardo — Universidad Estatal de Sonora.

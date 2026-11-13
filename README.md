# Administrador de tareas Frontend

Aplicación desarrollada con React, TypeScript, Vite, React Router y PNPM.
Proyecto integrador de la materia *Diseño Frontend con Frameworks* (EC3).

## Funciones actuales

- Navegación SPA con React Router 7.18.4 (modo declarativo).
- Página de inicio, administración de tareas, detalle por ruta dinámica y página 404.
- Tareas persistidas en MongoDB Atlas mediante la API REST (`task-api-express`).
- Operaciones CRUD remotas: crear, editar, completar/reabrir y eliminar con confirmación.
- Validación de títulos (mínimo 3 y máximo 120 caracteres) antes de llamar a la API.
- Búsqueda, filtro, ordenamiento y paginación ejecutados por el servidor.
- Consulta conservada en la URL (`/tasks?q=api&status=pending&sort=title-asc&page=2`).
- Estados de carga, vacío, error y reintento.
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

## Integración con la API REST

La aplicación consume la API de tareas mediante Fetch API.

### Requisitos

- Backend disponible en http://localhost:3000 (rama `feature/consultas-paginadas` de `task-api-express`, sin autenticación).
- Frontend ejecutado mediante Vite.
- MongoDB Atlas conectado desde el Backend.

### Configuración local

1. Copiar `.env.example` como `.env.local`.
2. Confirmar `VITE_API_URL=/api`.
3. Iniciar el Backend con `pnpm dev`.
4. Iniciar el Frontend con `pnpm dev`.

Durante el desarrollo, el proxy de Vite (`vite.config.ts`) reenvía `/api` a `http://localhost:3000`.
`VITE_API_URL` solo contiene la ruta pública de la API; las credenciales de Atlas pertenecen exclusivamente al `.env` del Backend.

### Funciones remotas

| Método | Ruta              | Uso                                   |
|--------|-------------------|---------------------------------------|
| GET    | `/api/tasks`      | Listado paginado con `data` y `meta`  |
| GET    | `/api/tasks/:id`  | Detalle de una tarea (200 o 404)      |
| POST   | `/api/tasks`      | Crear con `title` (201)               |
| PATCH  | `/api/tasks/:id`  | Actualizar `title` o `status` (200)   |
| DELETE | `/api/tasks/:id`  | Eliminar (204)                        |

- Listado paginado.
- Búsqueda, filtro y ordenamiento.
- Creación, edición y cambio de estado.
- Eliminación con confirmación.
- Consulta de detalle por identificador.
- Estados de carga, vacío, error y reintento.

## Validación técnica / Compilación

```bash
pnpm lint
pnpm build
```

## Estructura principal

```
src/
├── components/   # Componentes visuales (AppNavigation, AsyncStatus, TaskForm, TaskList, ...)
├── config/       # Lectura y validación de VITE_API_URL
├── hooks/        # useTaskList: consulta remota con AbortController y reintento
├── layouts/      # AppLayout con Outlet
├── models/       # Task, contratos HTTP, estados de solicitud y tipos de consulta
├── pages/        # HomePage, TasksPage, TaskDetailPage y NotFoundPage
├── services/     # http.service (cliente Fetch) y task.api.service (rutas de tareas)
├── styles/       # Estilos globales y de la aplicación
├── utils/        # Validación del título y formato de fechas
├── App.tsx       # Declaración de rutas
├── main.tsx      # Punto de entrada con BrowserRouter
└── vite-env.d.ts # Tipos de las variables de entorno
docs/             # Preguntas de cierre de cada actividad
```

## Alcance

Esta versión ya no utiliza `localStorage`: la API REST es la fuente de verdad.
La autenticación, la sesión y las rutas protegidas se integrarán en la Actividad 11.

## Autor

Leonardo — Universidad Estatal de Sonora.

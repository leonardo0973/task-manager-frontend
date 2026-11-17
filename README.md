# Administrador de tareas Frontend

SPA desarrollada con React, TypeScript, Vite, React Router, Fetch API y PNPM.
Proyecto integrador de la materia *Diseño Frontend con Frameworks* (EC3).

## Funciones actuales

- Registro e inicio de sesión contra la API (JWT Bearer).
- Restauración de identidad con `GET /api/auth/me` al recargar.
- Rutas públicas, exclusivas para visitantes y protegidas.
- Cierre de sesión local y manejo automático de sesiones inválidas (401).
- Eliminación disponible solo para el rol `admin` (la API exige el rol; 403 para `user`).
- Página de perfil protegida (`/profile`).
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

| Ruta             | Página           | Acceso                     |
|------------------|------------------|----------------------------|
| `/`              | `HomePage`       | Pública                    |
| `/login`         | `LoginPage`      | Solo visitantes            |
| `/register`      | `RegisterPage`   | Solo visitantes            |
| `/tasks`         | `TasksPage`      | Protegida                  |
| `/tasks/:taskId` | `TaskDetailPage` | Protegida                  |
| `/profile`       | `ProfilePage`    | Protegida (desafío A11)    |
| `*`              | `NotFoundPage`   | Pública                    |

Todas las páginas se muestran dentro de `AppLayout` mediante `Outlet`. `ProtectedRoute` redirige a `/login` recordando la ruta solicitada; `PublicOnlyRoute` evita volver a login con una sesión activa.

## Variables

```env
VITE_API_URL=/api
```

## Ejecución

```bash
pnpm install
pnpm dev
```

## Integración con la API REST

La aplicación consume la API de tareas mediante Fetch API.

### Requisitos

- Backend disponible en http://localhost:3000 con registro, login, `/api/auth/me` que devuelve `data.user`, JWT, roles y tareas protegidas (rama `ec3-a11-me-usuario` de `task-api-express`).
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
├── context/      # auth-context: contrato de la sesión compartida
├── hooks/        # useAuth y useTaskList
├── layouts/      # AppLayout con Outlet
├── models/       # Task, usuario y sesión, contratos HTTP y tipos de consulta
├── pages/        # Home, Login, Register, Tasks, TaskDetail, Profile y NotFound
├── providers/    # AuthProvider: login, registro, restauración, 401 y cierre
├── routes/       # ProtectedRoute y PublicOnlyRoute
├── services/     # http (Bearer y 401), auth.api, session (token) y task.api
├── styles/       # Estilos globales y de la aplicación
├── utils/        # Validación del título y formato de fechas
├── App.tsx       # Declaración de rutas
├── main.tsx      # Punto de entrada con BrowserRouter
└── vite-env.d.ts # Tipos de las variables de entorno
docs/             # Preguntas de cierre de cada actividad
```

## Seguridad didáctica

El access token se conserva en `sessionStorage` (clave `task-manager.access-token`) para practicar la restauración dentro de la pestaña. No se almacenan el usuario, el correo ni la contraseña, y el token no se imprime ni se decodifica en el navegador: la identidad se confirma con `/api/auth/me`. Un `sessionStorage` sigue siendo legible por JavaScript, por lo que un XSS podría extraer el token. Cerrar sesión elimina el token local pero no revoca el JWT en el servidor. Ocultar Eliminar a `user` mejora la experiencia; la API mantiene la autenticación y la autorización reales.

## Alcance

Las tareas aún no pertenecen a un usuario: las identidades autenticadas consultan la misma colección.
La Actividad 12 agregará pruebas automatizadas, configuración de producción y despliegue.

## Autor

Leonardo — Universidad Estatal de Sonora.

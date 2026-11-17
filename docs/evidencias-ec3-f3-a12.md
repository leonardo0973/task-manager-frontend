# Evidencias EC3 F3 A12

## Identificación

- Repositorio: https://github.com/leonardo0973/task-manager-frontend
- Commit: (hash del commit desplegado en Render)
- Etiqueta: v1.0.0
- URL Frontend: https://FRONTEND.onrender.com
- URL Backend: https://BACKEND.onrender.com
- Fecha: 2026-11-16

## Calidad

- Instalación: `pnpm install --frozen-lockfile` terminó sin cambios en el lockfile.
- verify: `pnpm verify` aprobado (oxlint sin advertencias, pruebas y build).
- Pruebas: 4 archivos, 10 pruebas aprobadas (9 base: sesión 2, guardas 4, cliente HTTP 3; más 1 del desafío del formulario de acceso).
- Build y preview: `dist` generado; con `VITE_API_URL=https://REEMPLAZA-API.onrender.com/api` la URL queda dentro del bundle; `pnpm preview` entrega `index.html` con 200 en `/`, `/login`, `/register`, `/tasks` y `/tasks/:id`.

## Integración local tipo producción

- Build servido en otro origen (`http://localhost:4173`) con `VITE_API_URL` absoluta y el Backend con `CORS_ORIGIN=http://localhost:4173`: registro 201, login 200 y `GET /api/tasks` 200; la recarga directa de `/tasks` funciona.
- Mismo build en un origen no autorizado (`http://localhost:4174`): el navegador bloquea la lectura por CORS y la interfaz muestra "No fue posible conectar con la API".

## Producción

- health:
- health/database:
- Ruta profunda:
- Prueba de humo:

## Aceptación

| Caso | Resultado | Evidencia |
|---|---|---|
| Registro y login | | |
| Restauración | | |
| CRUD user | | |
| 403 user | | |
| 204 admin | | |
| Filtros y página | | |
| Logout | | |

## Seguridad

- [x] Sin tokens.
- [x] Sin contraseñas.
- [x] Sin MONGODB_URI.
- [x] Sin JWT_SECRET.

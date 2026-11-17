# Historial de cambios

## [1.0.0] - 2026-11-16

### Agregado

- Navegación y rutas con React Router 7.18.4 (inicio, tareas, detalle, perfil y 404).
- Consumo completo de la API REST con Fetch (listado, detalle, creación, edición y eliminación).
- Búsqueda, filtro, ordenamiento y paginación del servidor conservados en la URL.
- Autenticación, sesión y permisos: registro, login, restauración con /auth/me, logout y rutas protegidas.
- Pruebas con Vitest y Testing Library (sesión, guardas, cliente HTTP y formulario de acceso).
- Configuración y despliegue en Render (`render.yaml`, rewrite SPA y encabezados).
- Prueba de humo (`pnpm smoke:production`).

### Verificado

- CRUD, filtros, paginación y detalle.
- Estados de carga, vacío y error con reintento.
- Respuestas 401, 403 y 204.
- Rutas profundas.
- Integración HTTPS y Atlas.

### Limitaciones

- Token en sessionStorage.
- Sin refresh tokens.
- Colección compartida de tareas.

# Lista de liberación Frontend 1.0.0

Marcar solamente los criterios que tengan evidencia.

## Calidad

- [x] Instalación congelada aprobada (`pnpm install --frozen-lockfile`).
- [x] pnpm verify aprobado (lint, pruebas y build).
- [x] Nueve pruebas aprobadas (más una prueba del desafío: 10 en total).
- [x] build y preview aprobados (rutas profundas entregan index.html en preview).

## Producción

- [ ] VITE_API_URL usa HTTPS y /api.
- [ ] CORS_ORIGIN coincide con Frontend.
- [x] render.yaml está sincronizado.
- [ ] Rewrite SPA funciona en Render.
- [ ] Salud y Atlas responden 200.
- [ ] Prueba de humo aprobada.

## Aceptación

- [ ] Registro login restauración y logout (en producción).
- [ ] CRUD como user (en producción).
- [ ] 403 de user.
- [ ] 204 de admin.
- [ ] Filtros paginación detalle y 404.
- [ ] 401 elimina sesión inválida.

## Seguridad y versión

- [x] No existen secretos en Git.
- [x] Las evidencias ocultan credenciales.
- [x] README y CHANGELOG actualizados.
- [ ] v1.0.0 apunta al commit desplegado.

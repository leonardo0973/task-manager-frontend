# Pruebas de API REST - EC3 F2 A10

## Entorno

- Rama: `feature/api-rest-crud-remoto`
- Dirección pública usada por el Frontend: `/api`
- Backend: `task-api-express`, rama `feature/consultas-paginadas` (API de Backend EC2 F3 A8, sin autenticación), en `http://localhost:3000`
- Resultado de `pnpm build`: terminó sin errores
- Resultado de `pnpm lint`: terminó sin advertencias

## Casos ejecutados

| Caso | Método y ruta | Esperado | Obtenido | Resultado |
|---|---|---:|---:|---|
| Listar | GET /api/tasks?page=1&limit=5&sortBy=updatedAt&order=desc | 200 | 200 | Correcto |
| Crear | POST /api/tasks | 201 | 201 | Correcto |
| Validación | Enviar título vacío | Sin POST | Sin POST | Correcto |
| Actualizar título | PATCH /api/tasks/:id `{ title }` | 200 | 200 | Correcto |
| Completar / reabrir | PATCH /api/tasks/:id `{ status }` | 200 | 200 | Correcto |
| Eliminación cancelada | Cancelar confirmación | Sin DELETE | Sin DELETE | Correcto |
| Eliminar | DELETE /api/tasks/:id | 204 | 204 | Correcto |
| Buscar | GET /api/tasks?...&search=api | 200 | 200 | Correcto |
| Filtrar | GET /api/tasks?...&status=completed | 200 | 200 | Correcto |
| Ordenar | GET /api/tasks?...&sortBy=title&order=asc | 200 | 200 | Correcto |
| Paginación | GET /api/tasks?page=2&limit=5 | 200 | 200 | Correcto |
| Sin resultados | GET /api/tasks?...&search=zzzz | 200 con data vacío | 200 con data vacío | Correcto |
| Detalle | GET /api/tasks/:id | 200 | 200 | Correcto |
| Inexistente | GET /api/tasks/:id (id válido inexistente) | 404 | 404 | Correcto |
| Id con formato inválido | GET /api/tasks/no-existe | 400 | 400 | Correcto (se muestra "Tarea no encontrada") |
| API detenida | GET /api/tasks | Error de red | Error y botón Reintentar | Correcto |
| Recuperación | Reintentar con la API activa | 200 | 200 | Correcto |

## Observaciones

- Al cambiar búsqueda, filtro u orden, la consulta vuelve a `page=1`.
- Al escribir rápido en el buscador, algunas solicitudes aparecen como canceladas en Network; es el comportamiento esperado de `AbortController`.
- Al eliminar el único registro de la última página, la interfaz regresa a la página anterior.
- El detalle funciona al recargar directamente `/tasks/:id`, porque consulta la tarea por su identificador.
- Con la API detenida, el proxy de Vite responde 500 sin cuerpo JSON; la interfaz lo muestra como "No fue posible conectar con la API" y ofrece Reintentar.
- La rama actual del Backend (`ec3-a10-proteccion`) exige token JWT en `/api/tasks`; para esta actividad se usa la rama `feature/consultas-paginadas`, porque la autenticación se integra en la Actividad 11.

## Evidencias

- Captura de la lista:
- Captura de Network:
- Captura del error y reintento:

No incluir URI, usuario ni contraseña de MongoDB Atlas.

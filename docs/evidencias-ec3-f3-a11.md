# Evidencias EC3 F3 A11

## Entorno

- Rama: `ec3-a11-autenticacion`
- React: 19
- React Router: 7.18.4
- URL local del Frontend: http://localhost:5173
- URL local del Backend: http://localhost:3000 (rama `ec3-a11-me-usuario` de `task-api-express`)

## Casos

| Caso | HTTP | Resultado | Evidencia |
|---|---:|---|---|
| Registro válido | 201 | Correcto: regresa a `/login` con el correo y el mensaje "La cuenta fue creada" | Network: `POST /api/auth/register` |
| Contraseñas distintas | — | Correcto: mensaje local y ninguna solicitud | Network sin solicitudes |
| Correo duplicado | 409 | Correcto: "Ya existe una cuenta con ese correo electrónico." | Network: `POST /api/auth/register` |
| Login inválido | 401 | Correcto: mensaje de la API, permanece en login y no se guarda token | Network: `POST /api/auth/login` |
| Login válido | 200 | Correcto: sesión y regreso a la ruta solicitada | Network: `POST /api/auth/login` |
| /auth/me | 200 | Correcto: al recargar aparece "Validando la sesión" y se restaura usuario y rol | Network: `GET /api/auth/me` |
| /tasks sin token | 401 | Correcto: la API rechaza; el Frontend redirige a `/login` antes de consultar | Postman / Network |
| CRUD con user | 2xx | Correcto: GET 200, POST 201, PATCH 200 con `Authorization: Bearer` | Network (sin mostrar el valor) |
| DELETE con user | 403 | Correcto: `FORBIDDEN` y la sesión permanece | Solicitud manual / Postman |
| DELETE con admin | 204 | Correcto: tras nuevo login como admin aparece Eliminar y responde 204 | Network: `DELETE /api/tasks/:id` |
| Token alterado | 401 | Correcto: se borra el token, aparece login con "Tu sesión expiró o ya no es válida" | Network: `GET /api/auth/me` |
| API detenida con sesión | — | Correcto: "No fue posible validar la sesión" con Reintentar y Cerrar sesión local | Captura de la interfaz |

## Rutas y sesión

- Redirección a login: abrir `/tasks?status=pending` sin sesión lleva a `/login`.
- Recuperación de la ruta intentada: después del login regresa a `/tasks?status=pending` (incluye la consulta).
- Restauración después de recargar: `/tasks` y `/tasks/:taskId` se conservan; `/me` responde 200.
- Cierre y botón Atrás: después de "Cerrar sesión" la clave desaparece de `sessionStorage`; Atrás permanece en `/login` y no se envían solicitudes autenticadas.
- Perfil (desafío): `/profile` muestra nombre, correo, rol y fechas sin nuevas solicitudes a `/me`.

## Calidad

- pnpm lint: sin advertencias.
- pnpm build: sin errores.
- Consola del navegador: sin excepciones; los 401/403/404 provocados son respuestas de negocio.

## Protección de datos

Confirmo que las evidencias no muestran contraseñas, tokens completos, JWT_SECRET ni MONGODB_URI.

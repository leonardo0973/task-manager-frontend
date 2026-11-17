# Preguntas de cierre EC3 F3 A12

## 1. ¿Qué diferencia existe entre prueba automatizada, humo y aceptación?

La prueba automatizada (Vitest) ejecuta escenarios controlados y repetibles en un DOM simulado: sesión, guardas y cliente HTTP. La prueba de humo es una revisión rápida después del despliegue que solo confirma que el sitio, una ruta profunda y la salud del Backend responden. La aceptación es el recorrido manual completo con la API real y Atlas: registro, login, CRUD, roles y errores.

## 2. ¿Por qué Fetch simulado no demuestra que Atlas funciona?

Porque en las pruebas sustituyo `fetch` con `vi.fn` y yo decido qué respuesta devuelve. Así compruebo que mi cliente HTTP agrega Bearer, acepta el 204 y avisa del 401, pero ninguna solicitud llega a Express ni a MongoDB. Que Atlas funcione se comprueba con `/health/database` y la aceptación manual.

## 3. ¿Qué comprueba una guarda y qué seguridad continúa en el Backend?

`ProtectedRoute` comprueba si hay una sesión validada para decidir si muestra la página, espera la validación o redirige a `/login`. Solo controla la vista. La seguridad real sigue en Express: validar la firma del JWT, responder 401 sin token y exigir `admin` para `DELETE`.

## 4. ¿Por qué VITE_API_URL es pública y JWT_SECRET no?

`VITE_API_URL` se copia dentro del JavaScript que descarga el navegador, así que cualquiera puede verla; solo es una dirección. `JWT_SECRET` firma los tokens: si se filtrara, cualquiera podría fabricar tokens válidos, incluso de `admin`. Por eso solo vive en las variables privadas del Backend.

## 5. ¿Por qué cambiar VITE_API_URL exige otro build?

Porque Vite sustituye `import.meta.env.VITE_API_URL` por su valor en el momento del build y lo deja escrito en los archivos de `dist`. El sitio estático no lee variables al ejecutarse. Si cambia la URL del Backend, hay que volver a construir y desplegar.

## 6. ¿Qué función cumple la reescritura hacia index.html?

En una SPA solo existe un archivo HTML. Si alguien abre o recarga `/tasks`, el servidor buscaría un archivo con ese nombre y respondería 404. La regla `/*` hacia `/index.html` hace que Render entregue siempre `index.html` con 200, y luego React Router decide qué página mostrar.

## 7. ¿Qué diferencia existe entre build, deploy y release?

El build transforma React y TypeScript en archivos estáticos de `dist`. El deploy publica esa construcción en Render para que sea accesible. El release es la versión aprobada e identificada, en mi caso la etiqueta `v1.0.0` sobre el commit desplegado, con su CHANGELOG y evidencias.

## 8. ¿Por qué CORS_ORIGIN debe ser exacto?

Porque el navegador compara el origen del sitio con el permiso que envía la API. Si no coincide exactamente (esquema, dominio y puerto, sin ruta ni diagonal final), bloquea la lectura de la respuesta. Usar `*` abriría la API a cualquier sitio. Lo comprobé localmente: desde el origen autorizado todo funcionó y desde otro puerto el navegador bloqueó la solicitud.

## 9. ¿Qué diferencia existe entre 401 y 403?

401 significa que no hay una identidad aceptable (sin token, alterado o expirado) y la aplicación borra la sesión y pide login. 403 significa que la identidad es válida pero no tiene permiso, como un `user` intentando eliminar; la sesión se conserva y solo se muestra el mensaje.

## 10. ¿Por qué ocultar Eliminar no sustituye la autorización?

Porque cualquiera puede enviar un `DELETE` manualmente con Postman o desde la consola sin usar mi interfaz. Ocultar el botón solo evita mostrar una acción que fallaría; es el Backend con `requireRole('admin')` el que la rechaza con 403.

## 11. ¿Cómo demuestras que v1.0.0 corresponde al deploy?

Comparando el mismo hash en tres lugares: el commit que Render indica en el despliegue, el commit en GitHub y el resultado de `git show v1.0.0`. La etiqueta se crea después de aprobar el despliegue y la prueba de humo, sobre ese mismo commit.

## 12. ¿Qué mejorarías para un sistema sensible?

Cambiaría el token de `sessionStorage` por una cookie HttpOnly o un Backend for Frontend para que JavaScript no pueda leerlo, agregaría refresh tokens con rotación y revocación en el servidor, y haría que cada tarea pertenezca a un usuario. También añadiría pruebas E2E automatizadas, una Content Security Policy más estricta y un pipeline de CI que ejecute `pnpm verify` antes de cada despliegue.

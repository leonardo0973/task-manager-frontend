# Preguntas de cierre - EC3 F2 A10

## 1. ¿Qué diferencia existe entre una falla de red y una respuesta HTTP 404?

En una falla de red la solicitud no obtiene respuesta: la API está detenida, no hay conexión o el servidor no es alcanzable, y la promesa de `fetch` se rechaza. Un 404 sí es una respuesta: el servidor recibió la solicitud y contestó que el recurso no existe. En mi aplicación la primera se muestra como "No fue posible conectar con la API" con el botón Reintentar, y el 404 del detalle muestra "Tarea no encontrada".

## 2. ¿Por qué debe comprobarse response.ok después de fetch?

Porque `fetch` solo rechaza la promesa ante problemas de red. Un 404, un 422 o un 500 llegan como respuestas válidas, y si no reviso `response.ok` el código trataría el cuerpo de error como si fueran datos. Por eso `httpRequest` revisa `response.ok` y convierte los estados no satisfactorios en un `HttpError` con código, mensaje y `requestId`.

## 3. ¿Qué responsabilidad tiene http.service.ts?

Es el cliente HTTP genérico. Agrega la dirección base y los encabezados, convierte el cuerpo a JSON, maneja las respuestas 204 sin cuerpo, revisa `response.ok` y normaliza cualquier falla en `HttpError`. No sabe nada de tareas ni de componentes.

## 4. ¿Qué responsabilidad tiene task.api.service.ts?

Concentra las rutas y métodos de las tareas: `listTasks` (GET con parámetros de consulta), `getTaskById`, `createTask` (POST), `updateTask` (PATCH) y `deleteTask` (DELETE). Construye la consulta con `URLSearchParams`, así los componentes no arman direcciones ni repiten `JSON.stringify`.

## 5. ¿Por qué VITE_API_URL no debe contener credenciales?

Porque las variables `VITE_` se copian dentro del código que se descarga en el navegador; cualquier persona puede verlas en las herramientas de desarrollo. Por eso solo contiene la ruta pública `/api`. La cadena de conexión y la contraseña de Atlas se quedan en el `.env` del Backend.

## 6. ¿Qué problema resuelve el proxy de Vite durante el desarrollo?

El Frontend corre en el puerto 5173 y la API en el 3000, que para el navegador son orígenes distintos, y eso provocaría problemas de CORS. Con el proxy, el navegador pide `/api/tasks` al mismo servidor de Vite y Vite reenvía la solicitud a `http://localhost:3000`. Así no tuve que modificar el Backend en esta actividad.

## 7. ¿Por qué el proxy no sustituye la configuración de producción?

Porque el proxy solo existe mientras corre `pnpm dev`. `pnpm build` genera archivos estáticos sin servidor de Vite, así que en producción hará falta otra solución, como configurar CORS en la API o un proxy en el servidor web. Eso corresponde a la Actividad 12.

## 8. ¿Qué función cumple AbortController?

Permite cancelar una solicitud que ya no sirve. En `useTaskList`, cada vez que cambian la búsqueda, el filtro, el orden o la página, la limpieza del efecto aborta la consulta anterior. Así una respuesta antigua no puede llegar después y reemplazar los resultados más recientes. Lo comprobé escribiendo rápido en el buscador: en Network aparecen solicitudes canceladas y la lista final coincide con el último texto.

## 9. ¿Por qué la ruta de detalle consulta la tarea por id?

Porque la lista solo tiene cargada la página actual. Si el detalle buscara dentro de esa lista, al recargar directamente `/tasks/:id` o al abrir una tarea de otra página no la encontraría. Con `GET /api/tasks/:id` el detalle es independiente y funciona aunque se recargue el navegador.

## 10. ¿Por qué el formulario se limpia únicamente después de un POST satisfactorio?

Porque si la API falla, por ejemplo si está detenida, el usuario perdería lo que escribió. `onAddTask` devuelve una promesa con `true` o `false`, y el formulario solo limpia el campo cuando `wasCreated` es `true`. Si falla, el título se conserva y aparece el mensaje de error.

## 11. ¿Qué ventaja ofrece separar la consulta remota de los componentes visuales?

Cada parte tiene una sola responsabilidad: el hook `useTaskList` maneja la solicitud, la cancelación, los estados y el reintento; los servicios manejan HTTP; y los componentes como `TaskList`, `TaskFilters` o `AsyncStatus` solo muestran datos y avisan eventos. El código es más fácil de leer y probar, y en la Actividad 11 podré agregar el token en el cliente HTTP sin tocar los componentes.

## 12. ¿Qué cambio fue más difícil y cómo comprobaste que funcionaba?

Lo más difícil fue que la rama actual de mi Backend ya pedía token JWT, así que todas las solicitudes respondían 401. Como la autenticación del Frontend es tema de la Actividad 11, probé contra la rama `feature/consultas-paginadas`, que tiene la misma API de tareas sin autenticación. También tuve que decidir qué hacer con un identificador con formato inválido: la API responde 400 `INVALID_ID`, y lo traté igual que un 404 para mostrar "Tarea no encontrada". Lo comprobé en la pestaña Network revisando cada caso: GET 200, POST 201, PATCH 200, DELETE 204, 404 en un id inexistente y el error con Reintentar al detener la API. Como desafío guardé la consulta completa en la URL con `useSearchParams`, validando los valores y omitiendo los predeterminados; así la consulta se conserva al recargar y funcionan Atrás y Adelante.

# Preguntas de cierre EC2 F3 A8

## 1. ¿Por qué las reglas de validación se colocaron en una utilidad?

Para tener una sola fuente de reglas. `validateTaskTitle` se usa al registrar (`TaskForm`) y al editar (`TaskItem`); si mañana cambia el mínimo de caracteres, solo modifico `src/utils/task-validation.ts` y los dos formularios se comportan igual. Si la regla estuviera copiada en cada componente, sería fácil que quedaran diferentes.

## 2. ¿Qué significa el retorno string | null de validateTaskTitle?

Que la función devuelve un mensaje de error (`string`) cuando el título no es válido, o `null` cuando sí lo es. TypeScript me obliga a revisar si hay mensaje antes de continuar: si existe, lo muestro y detengo la operación; si es `null`, guardo la tarea.

## 3. ¿Qué función cumplen aria-invalid, aria-describedby y role alert?

`aria-invalid` indica a los lectores de pantalla que el valor del campo es incorrecto (y también lo uso en CSS para pintar el borde en rojo). `aria-describedby` vincula el campo con el texto de ayuda y con el mensaje de error mediante sus `id`, para que se lean junto con el campo. `role="alert"` hace que el mensaje se anuncie en cuanto aparece, sin que el usuario tenga que buscarlo.

## 4. ¿Por qué query, filter y sortBy son estados controlados?

Porque sus valores deben recordarse entre renderizados y la interfaz tiene que reaccionar cuando cambian. El `input` de búsqueda y los dos `select` reciben su `value` desde el estado de `App` y avisan los cambios mediante funciones (`onQueryChange`, `onFilterChange`, `onSortChange`). Así `App` puede usarlos para calcular la vista y también reiniciarlos con "Limpiar criterios".

## 5. ¿Por qué visibleTasks no debe almacenarse como estado independiente?

Porque es un dato derivado: se puede calcular en cada renderizado a partir de `tasks`, `query`, `filter` y `sortBy`. Si lo guardara como otro estado tendría dos colecciones que mantener sincronizadas, y al crear o editar una tarea podría olvidar actualizar una de ellas y mostrar información incorrecta.

## 6. ¿Cómo se normaliza una búsqueda?

Se eliminan los espacios externos con `trim()` y se convierte a minúsculas con `toLocaleLowerCase('es-MX')`. El título de cada tarea también se pasa a minúsculas antes de compararlo con `includes`. Por eso "  DOCUMENTAR  " encuentra "Documentar el avance del proyecto".

## 7. ¿Por qué se crea una copia antes de utilizar sort?

Porque `sort` ordena el arreglo en el mismo lugar, es decir, lo modifica. Si ordenara directamente el estado estaría mutándolo. Con `[...filteredTasks].sort(...)` ordeno una copia y el arreglo original queda intacto.

## 8. ¿Qué responsabilidad tiene task-query.service.ts?

Transformar datos: recibe la colección y los criterios (`TaskViewOptions`) y devuelve las tareas que se deben mostrar, ya buscadas, filtradas y ordenadas. No conoce componentes, no usa Hooks y no modifica el estado; es una función pura que se puede probar por separado.

## 9. ¿Por qué el resultado de JSON.parse se trata como unknown?

Porque `localStorage` puede contener cualquier texto: un dato antiguo, uno modificado a mano desde DevTools o uno corrupto. `JSON.parse` no garantiza que el resultado tenga forma de `Task[]`. Tratarlo como `unknown` obliga a validarlo antes de usarlo, en lugar de confiar ciegamente en él.

## 10. ¿Qué comprueba la función isTask?

Que el valor sea un objeto y que tenga `id` y `title` de tipo texto, un `status` que sea exactamente `'pending'` o `'completed'`, y `createdAt` y `updatedAt` como cadenas que representen fechas válidas (`Date.parse` devuelve un número finito). Es un *type guard*: si devuelve `true`, TypeScript trata el valor como `Task`.

## 11. ¿Qué ventaja ofrece la inicialización diferida de useState?

Al pasar una función (`useState(() => loadTasks(initialTasks))`), React la ejecuta solo una vez, al crear el estado. Si pasara directamente `loadTasks(initialTasks)`, se leería y analizaría `localStorage` en cada renderizado aunque el resultado ya no se use.

## 12. ¿Por qué localStorage se sincroniza mediante useEffect?

Porque `localStorage` es un sistema externo a React. `useEffect` se ejecuta después del renderizado y, con la dependencia `[tasks]`, solo cuando la colección cambia. Así cualquier operación CRUD (crear, editar, completar, eliminar) se guarda automáticamente sin tener que llamar a `saveTasks` dentro de cada manejador.

## 13. ¿Por qué TaskSummary recibe tasks y TaskList recibe visibleTasks?

El resumen debe mostrar el estado real de todas las tareas, sin importar qué esté buscando el usuario. La lista, en cambio, debe mostrar solo los resultados de la consulta. Si le pasara `visibleTasks` al resumen, los totales cambiarían al escribir en el buscador, lo cual sería confuso.

## 14. ¿Qué información se pierde y cuál permanece al recargar?

Permanecen las tareas: las nuevas, los títulos editados, los cambios de estado y las eliminaciones, porque se guardan en la clave `task-manager.tasks`. Se pierden los criterios de consulta (búsqueda, filtro y orden), la página actual de la paginación y cualquier edición o registro que no se haya guardado, porque son estado en memoria.

## 15. ¿Qué dificultad encontraste y cómo la resolviste?

La más importante fue el desafío de paginación: al buscar o filtrar, si estaba en la página 2 y quedaban pocos resultados, la lista aparecía vacía. Lo resolví regresando a la página 1 dentro de los manejadores de búsqueda, filtro y limpieza, y calculando una página segura (`Math.min(currentPage, totalPages)`) para cuando se eliminan tareas. También tuve que reacomodar la cuadrícula de filtros, porque en el panel de tareas no cabían las tres columnas propuestas en la guía; la búsqueda ocupa ahora una fila completa y en pantallas menores a 760 px todo pasa a una sola columna. Por último, probé datos inválidos en `localStorage` (`dato-invalido` y un objeto incompleto) y confirmé que la aplicación inicia con las tareas de respaldo.

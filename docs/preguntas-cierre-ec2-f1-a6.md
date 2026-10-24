# Preguntas de cierre - EC2 F1 A6

## 1. ¿Qué función cumple la interfaz Task?

Define el contrato que debe cumplir cualquier tarea de la aplicación: `id`, `title`, `status`, `createdAt` y `updatedAt`. Si a un objeto le falta una propiedad o tiene un tipo incorrecto, TypeScript marca el error mientras programo, antes de ejecutar la aplicación. Además, el modelo coincide con el que usará la API REST, así que después podré cambiar los datos locales por las respuestas del backend sin rehacer los componentes.

## 2. ¿Qué diferencia existe entre Task y TaskStatus?

`Task` es una interfaz que describe un objeto completo con varias propiedades. `TaskStatus` es un tipo unión que solo admite dos valores de texto: `'pending'` o `'completed'`. `TaskStatus` se usa como el tipo de una propiedad dentro de `Task` para que el estado no pueda escribirse con variantes como `'Pendiente'` o `'done'`.

## 3. ¿Qué significa declarar un arreglo como Task[]?

Significa que el arreglo solo puede contener objetos que cumplan con la interfaz `Task`. Lo comprobé eliminando temporalmente el `id` de una tarea en `tasks.ts`: TypeScript mostró el error de inmediato, y al restaurarlo desapareció.

## 4. ¿Qué hace el método map?

Recorre un arreglo y devuelve un arreglo nuevo con el resultado de aplicar una función a cada elemento. No modifica el arreglo original.

## 5. ¿Qué resultado produce map dentro de TaskList?

Transforma cada objeto `Task` en un componente `<TaskItem />`. El resultado es un arreglo de elementos JSX que React dibuja como la lista de tarjetas.

## 6. ¿Para qué utiliza React la propiedad key?

React usa `key` para identificar qué elemento visual corresponde a cada objeto de la colección. Así, cuando la lista cambia (se agrega, elimina o reordena una tarea), puede actualizar solo los elementos necesarios en lugar de volver a construir todos.

## 7. ¿Por qué se utiliza task.id y no el índice?

Porque `task.id` es estable: siempre pertenece a la misma tarea aunque cambie su posición. El índice cambia cuando se agregan, eliminan u ordenan elementos, lo que puede provocar que React asocie el estado de una tarjeta con la tarea equivocada. `Math.random()` tampoco sirve porque genera una clave distinta en cada renderizado.

## 8. ¿Cómo se envía una tarea de TaskList a TaskItem?

Mediante una propiedad: `<TaskItem key={task.id} task={task} />`. `TaskItem` recibe el objeto completo en `task` (tipado como `Task`) y lo desestructura para obtener `title`, `status` y `updatedAt`. La `key` no llega como prop porque es de uso interno de React.

## 9. ¿Cómo se comunican App, TaskSummary y TaskList?

`App` importa la colección desde `data/tasks.ts` y envía el mismo arreglo a `TaskSummary` y a `TaskList` mediante la prop `tasks`. Los datos fluyen en una sola dirección, de padre a hijos: `tasks.ts -> App -> TaskList -> TaskItem` y `App -> TaskSummary`. Los hijos no se comunican entre sí directamente.

## 10. ¿Qué es el renderizado condicional?

Es mostrar una estructura u otra según una condición. En `TaskList`, si `tasks.length === 0` se muestra el mensaje "No hay tareas registradas"; si hay tareas, se muestra la lista generada con `map`.

## 11. ¿Por qué el resumen se calcula a partir de la colección?

Porque así siempre coincide con los datos reales. El total se obtiene con `tasks.length` y las completadas con `filter`; las pendientes son la diferencia. Si escribiera los números a mano, tendría que actualizarlos cada vez que cambiara la lista y podrían quedar desincronizados. Lo comprobé cambiando temporalmente una tarea a `completed`: el resumen pasó a 5 / 2 / 3 sin tocar `TaskSummary`.

## 12. ¿Qué dificultad encontraste durante la refactorización y cómo la resolviste?

El modelo de la actividad 5 (`types.ts`) tenía `id` numérico, prioridad, descripción y fecha límite, y un booleano `completed`. Al cambiar al nuevo modelo con `status` y fechas ISO, varios componentes dejaron de compilar. Lo resolví moviendo el modelo a `src/models/task.interface.ts`, eliminando `types.ts` y actualizando uno por uno los componentes que lo importaban, apoyándome en los errores de TypeScript y en `pnpm build` para encontrar las referencias pendientes. También tuve que ajustar los estilos, porque la tarjeta ya no tiene casilla de verificación.

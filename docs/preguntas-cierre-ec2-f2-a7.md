# Preguntas de cierre - EC2 F2 A7

## 1. ¿Qué diferencia existe entre una variable local y el estado de React?

Una variable local se vuelve a crear en cada renderizado, así que pierde su valor, y cambiarla no avisa a React que debe actualizar la interfaz. El estado, en cambio, React lo conserva entre renderizados y, cuando se actualiza con su función `set`, vuelve a renderizar el componente para mostrar el nuevo valor.

## 2. ¿Qué valores devuelve useState?

Un arreglo de dos elementos: el valor actual del estado y una función para solicitar el siguiente valor. Por ejemplo, `const [tasks, setTasks] = useState<Task[]>(...)`.

## 3. ¿Por qué useState se declara en el nivel superior del componente?

Porque React identifica cada Hook por el orden en que se llama. Si lo pusiera dentro de un `if`, un ciclo o una función interna, el orden podría cambiar entre renderizados y React asociaría el estado equivocado. Por eso Oxlint tiene activa la regla `react/rules-of-hooks`.

## 4. ¿Qué significa que un campo sea controlado?

Que su valor lo decide el estado de React y no el DOM. El `input` recibe `value={title}` y en `onChange` se llama a `setTitle(event.target.value)`. Así el estado y lo que se ve en el campo siempre coinciden, y puedo limpiarlo simplemente con `setTitle('')`.

## 5. ¿Por qué handleSubmit utiliza preventDefault?

Porque el comportamiento normal de un formulario HTML al enviarse es recargar la página. Si se recargara, se perdería el estado de la aplicación. `event.preventDefault()` cancela ese comportamiento y deja que React maneje el registro.

## 6. ¿Cómo comunica TaskForm una nueva tarea a App?

`App` le pasa la función `handleAddTask` mediante la prop `onAddTask`. Cuando el usuario envía el formulario, `TaskForm` llama `onAddTask(normalizedTitle)`; solo informa el título. `App` es quien construye el objeto `Task` completo y actualiza el estado.

## 7. ¿Por qué App funciona como fuente de verdad?

Porque la colección `tasks` se guarda una sola vez, en `App`. `TaskSummary` y `TaskList` reciben el mismo arreglo, así que no hay copias que sincronizar: cuando cambia el estado, ambos se actualizan juntos.

## 8. ¿Cómo se implementa Create sin utilizar push?

Creando un arreglo nuevo con el operador spread: `setTasks((currentTasks) => [newTask, ...currentTasks])`. La nueva tarea queda al inicio y el arreglo anterior no se modifica.

## 9. ¿Cómo permite map actualizar una sola tarea?

`map` recorre todas las tareas y devuelve un arreglo nuevo. Para cada una compara su `id`: si no es la seleccionada, la devuelve igual; si es la seleccionada, devuelve una copia con `{ ...task, status, updatedAt }`. Así solo cambia un objeto y el resto conserva su referencia.

## 10. ¿Cómo utiliza filter la operación Delete?

`filter` crea un arreglo nuevo solo con las tareas que cumplen la condición `task.id !== id`. La tarea eliminada es la única que no la cumple, por lo que queda fuera. El desafío "Eliminar completadas" usa la misma idea con `task.status !== 'completed'`.

## 11. ¿Por qué se emplea una función actualizadora en setTasks?

Porque el nuevo estado depende del anterior. Con `setTasks((currentTasks) => ...)` React me entrega la versión más reciente del estado, aunque haya varias actualizaciones pendientes en el mismo evento. Si usara directamente la variable `tasks`, podría estar trabajando con un valor desactualizado.

## 12. ¿Qué información conserva TaskItem como estado local?

Solo lo temporal de la edición: `isEditing` (si la tarjeta está en modo edición) y `draftTitle` (el borrador del título). La tarea en sí sigue en `App`; el borrador solo pasa a la colección cuando se presiona Guardar y se llama a `onEditTask`. Por eso Cancelar puede regresar al título original sin afectar nada.

## 13. ¿Por qué los cambios desaparecen al recargar la página?

Porque el estado de React vive en la memoria de la página. Al recargar, la aplicación se inicia desde cero y `useState` vuelve a tomar las cinco tareas de `data/tasks.ts`. Todavía no se guarda nada en `localStorage` ni en la API.

## 14. ¿Qué dificultad encontraste y cómo la resolviste?

Al principio me costó entender por qué `TaskItem` necesitaba su propio estado si las tareas ya estaban en `App`. Al probar la edición vi que, si escribía directamente en la tarea, no podría cancelar. La solución fue separar el borrador (`draftTitle`) dentro de `TaskItem` y enviar el título a `App` solo al guardar. También verifiqué con el resumen que cada operación (crear, completar, editar, eliminar y eliminar completadas) cambiara los totales correctamente.

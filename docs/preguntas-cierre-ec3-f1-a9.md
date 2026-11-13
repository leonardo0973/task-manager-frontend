# Preguntas de cierre - EC3 F1 A9

## 1. ¿Qué es una aplicación de página única?

Es una aplicación que carga un solo documento HTML y después cambia las vistas con JavaScript. Al pasar de Inicio a Tareas el navegador no pide otra página al servidor: React Router cambia la dirección y React dibuja la vista que corresponde. Por eso la navegación es más rápida y el estado de la aplicación no se pierde.

## 2. ¿Qué responsabilidad tiene BrowserRouter?

Proporciona el contexto de navegación y conecta la aplicación con el historial del navegador (la barra de direcciones y los botones Atrás y Adelante). Sin él no funcionan `Routes`, `Link`, `NavLink`, `useParams` ni `useNavigate`. Se coloca una sola vez, en `main.tsx`, alrededor de `App`.

## 3. ¿Cuál es la diferencia entre Routes y Route?

`Routes` es el contenedor que revisa la dirección actual y elige qué rama de rutas coincide. `Route` es cada regla individual: relaciona un `path` con el `element` que se debe mostrar. Por ejemplo, `<Route path="tasks" element={<TasksPage />} />`.

## 4. ¿Qué es una ruta índice?

Es la página predeterminada de una ruta padre; se declara con `index` en lugar de `path`. En mi proyecto la ruta índice dentro de `AppLayout` es `HomePage`, así que se muestra cuando la dirección es `/`.

## 5. ¿Qué beneficio ofrece un layout?

Concentra en un solo componente lo que comparten todas las páginas: encabezado, menú de navegación y pie de página. Así no repito esa estructura en cada página y, si cambio el menú, el cambio se ve en toda la aplicación.

## 6. ¿Qué función cumple Outlet?

Marca el lugar dentro del layout donde React Router dibuja la página hija que coincide con la dirección. `AppLayout` no sabe qué página está activa; solo coloca `<Outlet />` dentro de `<main>`.

## 7. ¿Qué diferencia existe entre Link y NavLink?

Los dos navegan sin recargar la página. `NavLink` además sabe si su ruta está activa y me permite cambiar su clase con `isActive`; por eso lo uso en el menú para resaltar la sección actual. `Link` lo uso en botones como "Administrar tareas" o "Ver detalle", donde no necesito ese estado.

## 8. ¿Por qué no se utilizan enlaces a para navegar internamente?

Porque un `<a href>` hace que el navegador pida otra vez el documento completo: la aplicación se recarga, React se vuelve a montar y se pierde el estado en memoria, como los filtros. `Link` y `NavLink` cambian la dirección mediante el historial sin recargar.

## 9. ¿Qué representa :taskId?

Es un segmento variable de la ruta `tasks/:taskId`. Lo que venga después de `/tasks/` se guarda con el nombre `taskId`. Así una sola ruta sirve para el detalle de cualquier tarea, sin crear una ruta por cada una.

## 10. ¿Cómo se recupera un parámetro dinámico?

Con el hook `useParams` dentro de la página: `const { taskId } = useParams<{ taskId: string }>()`. El nombre debe coincidir con el de la ruta; después busco la tarea con `tasks.find((task) => task.id === taskId)`.

## 11. ¿Cuándo debe utilizarse useNavigate?

Cuando la navegación debe ocurrir como resultado de una acción y no de un clic en un enlace. En el detalle, después de confirmar la eliminación, la dirección ya no representa una tarea válida, así que uso `navigate('/tasks', { replace: true })`. `replace` sustituye la entrada del historial para que Atrás no regrese al detalle eliminado.

## 12. ¿Qué función cumple la ruta *?

Es la ruta de captura general: coincide con cualquier dirección que no tenga una ruta propia y muestra `NotFoundPage` con el mensaje "Página no encontrada" y un enlace para regresar al inicio.

## 13. ¿Por qué el estado continúa administrado por App?

Porque varias páginas usan la misma colección: Inicio muestra el resumen, Tareas la administra y el Detalle busca una tarea. Si cada página tuviera su propio estado habría varias copias desincronizadas. `App` sigue siendo la única fuente de verdad y entrega datos y funciones a las páginas mediante propiedades.

## 14. ¿Por qué localStorage permanece en esta actividad?

Porque esta actividad solo reorganiza la navegación; la API REST se conecta en la Actividad 10. Mantener `localStorage` permite comprobar que el cambio a rutas no rompió el CRUD ni la persistencia: puedo recargar en `/tasks` o en un detalle y las tareas siguen ahí.

## 15. ¿Qué dificultad encontraste y cómo la resolviste?

La principal fue la eliminación desde el detalle. Antes `onDeleteTask` no devolvía nada, así que el detalle no sabía si el usuario había cancelado la confirmación. Cambié la función de `App` para que devuelva `true` solo cuando la tarea se elimina y actualicé los tipos de `TaskList` y `TaskItem`. Con eso el detalle navega a `/tasks` únicamente cuando se confirma. También tuve que adaptar el código de la guía a los estilos que ya tenía mi proyecto (`app.css` en lugar de `index.css`). En el desafío guardé la búsqueda en la URL con `useSearchParams`, usando `replace` para no llenar el historial mientras se escribe.

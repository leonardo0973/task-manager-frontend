# Preguntas de cierre — EC2 F1 A5

> Borrador: revisa y ajusta cada respuesta con tus propias palabras antes de entregar.

## 1. ¿Qué ventaja tiene dividir la interfaz en componentes?

Cada parte de la pantalla queda en su propio archivo con una sola responsabilidad. Así es más fácil
encontrar errores, modificar una sección sin afectar a las demás y reutilizar piezas como `TaskItem`.

## 2. ¿Para qué sirven las propiedades tipadas con TypeScript?

Definen qué datos espera recibir cada componente y de qué tipo son. Si en `App.tsx` se envía un dato
incorrecto o falta una propiedad, TypeScript lo marca antes de ejecutar la aplicación, durante `pnpm build`.

## 3. ¿Cómo se reutiliza `TaskItem`?

`TaskList` recorre el arreglo de tareas con `map` y crea un `TaskItem` por cada una, enviándole la tarea
mediante la propiedad `task`. El mismo componente muestra una tarea completada o pendiente según sus datos.

## 4. ¿Qué es la composición en React?

Es construir la interfaz combinando componentes pequeños dentro de otros. `App.tsx` compone el encabezado,
el formulario, los filtros, el resumen, la lista y el pie de página para formar la aplicación completa.

## 5. ¿Por qué las funciones se dejaron deshabilitadas?

Porque esta actividad solo cubre la estructura visual. Agregar, editar, completar y eliminar tareas
requieren estado y eventos, que se implementarán en actividades posteriores.

## 6. ¿Qué resultado dieron `pnpm lint` y `pnpm build`?

Ambos comandos terminaron sin errores: Oxlint no encontró advertencias y TypeScript junto con Vite
generaron la carpeta `dist` correctamente. La consola del navegador tampoco mostró errores.

## 7. ¿Qué cambió con el desafío de `AppFooter`?

El pie de página dejó de estar escrito directamente en `App.tsx` y pasó a un componente que recibe
el nombre del curso mediante la propiedad tipada `courseName`, lo que permite reutilizarlo con otro texto.

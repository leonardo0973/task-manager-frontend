# Preguntas de cierre EC3 F3 A11

## 1. ¿Qué diferencia existe entre autenticación y autorización?

La autenticación responde quién hace la solicitud: el login comprueba el correo y la contraseña y la API entrega un token. La autorización responde qué puede hacer esa identidad: el Backend revisa el rol y solo permite `DELETE /api/tasks/:id` a `admin`. Por eso un `user` puede estar autenticado y aun así recibir 403 al eliminar.

## 2. ¿Qué información guarda sessionStorage y qué información no debe guardar?

Solo guarda el access token en la clave `task-manager.access-token`. No guardo el objeto del usuario, el correo, la contraseña ni el `passwordHash`. La identidad la recupero cada vez con `/api/auth/me`, y todo el acceso está centralizado en `session.service.ts`.

## 3. ¿Por qué se consulta /api/auth/me al recargar?

Porque tener un token guardado no demuestra que siga siendo válido: puede haber expirado o estar alterado. Al recargar, `AuthProvider` empieza en `checking`, envía el token a `/me` y solo cambia a `authenticated` si la API responde 200 con el usuario. Así también obtengo el nombre y el rol actuales sin guardarlos en el navegador.

## 4. ¿Por qué el Frontend no debe confiar en decodificar un JWT sin verificarlo?

Porque el contenido de un JWT se puede leer y modificar sin conocer la clave; solo el Backend tiene el `JWT_SECRET` para verificar la firma. Si el Frontend confiara en el rol decodificado, alguien podría editar el token y verse como `admin`. Por eso la identidad viene siempre de la respuesta de la API.

## 5. ¿Qué responsabilidad tiene AuthProvider?

Administra la sesión de toda la aplicación: guarda el estado (`status`, `user`, `accessToken`, `sessionMessage`), hace login y registro, restaura la sesión con `/me`, registra el manejador global de 401 y cierra la sesión local. Entrega todo eso a los componentes mediante el contexto.

## 6. ¿Qué beneficio ofrece useAuth?

Permite leer la sesión desde cualquier componente sin pasar `user` y `accessToken` por muchas props intermedias (prop drilling). Además valida que se use dentro de `AuthProvider` y lanza un error claro si no es así.

## 7. ¿Qué representa el estado checking?

Que existe un token guardado y la aplicación está esperando la respuesta de `/me`. Mientras tanto `ProtectedRoute` muestra "Validando la sesión..." en lugar de redirigir a login o mostrar las tareas, lo que evita un parpadeo o una redirección equivocada al recargar.

## 8. ¿Qué diferencia existe entre 401 y 403?

401 significa que la solicitud no tiene una identidad aceptable (falta el token, está alterado o expiró); en ese caso borro la sesión y pido login. 403 significa que la identidad sí es válida pero no tiene permiso; la sesión se conserva y solo se muestra el mensaje. Lo comprobé: un `DELETE` con token de `user` devolvió 403 y seguí con la sesión abierta.

## 9. ¿Por qué ProtectedRoute no sustituye la seguridad del Backend?

Porque solo decide qué se dibuja en el navegador, y el código del Frontend se puede modificar o saltar. Cualquier persona podría llamar a la API con Postman sin pasar por React. La seguridad real está en Express, que valida la firma del JWT y responde 401 en `/api/tasks` sin token.

## 10. ¿Por qué ocultar Eliminar a user no constituye autorización?

Porque ocultar el botón solo mejora la experiencia: evita mostrar una acción que fallaría. Una solicitud `DELETE` construida a mano todavía llega a la API, y es el Backend con `requireRole('admin')` quien la rechaza con 403. `canDelete` es una regla visual, no una barrera de seguridad.

## 11. ¿Por qué un cambio de rol exige iniciar sesión de nuevo?

Porque el rol viaja dentro del JWT al momento de emitirlo, y el Backend autoriza con ese rol. Si cambio a un usuario a `admin` con el script, su token viejo sigue diciendo `user` y `DELETE` responde 403. Al iniciar sesión otra vez se emite un token nuevo con el rol `admin`.

## 12. ¿Qué ocurre realmente al seleccionar Cerrar sesión?

Se elimina el token de `sessionStorage`, se limpian el usuario y el token del estado de React, el estado pasa a `anonymous` y la aplicación vuelve a `/login`. Pero no se revoca el JWT en el servidor: si alguien hubiera copiado el token, seguiría funcionando hasta que expire.

## 13. ¿Qué riesgo conserva sessionStorage ante XSS?

Que cualquier JavaScript del mismo origen puede leerlo. Si existiera una vulnerabilidad XSS, un script malicioso podría robar el token y usarlo hasta su expiración. Para producción sería mejor una cookie HttpOnly o un Backend for Frontend, pero eso requiere cambios en el Backend.

## 14. ¿Por qué las tareas todavía no pertenecen a un usuario específico?

Porque el modelo `Task` del Backend no tiene un campo `userId`. La autorización actual es por rol, no por propiedad: todas las identidades autenticadas ven la misma colección. Por eso en la interfaz no digo "mis tareas privadas".

## 15. ¿Qué dificultad encontraste al integrar la sesión y cómo la resolviste?

La primera fue que mi Backend devolvía en `/api/auth/me` solo `identity` con `userId` y `role` (era mi desafío de la A10), y la guía necesita el usuario completo. Agregué en el Backend, en una rama nueva, la consulta del usuario por el id del JWT para responder `data.user`; también dejé `confirmPassword` como opcional, porque el Frontend compara la confirmación en el navegador. La segunda fue que después del login la app regresaba a `/tasks` sin la búsqueda que había en la URL: `PublicOnlyRoute` redirigía a `/tasks` al ver la sesión activa antes de que terminara la navegación de `LoginPage`. Lo resolví haciendo que `PublicOnlyRoute` también use la ruta guardada en `state.from`. Lo comprobé abriendo `/tasks?status=pending` sin sesión y verificando que, después del login, volvía exactamente a esa dirección.

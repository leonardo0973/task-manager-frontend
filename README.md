# Administrador de tareas — task-manager-frontend

Primera versión visual de un **Administrador de tareas** construido con React, TypeScript, Vite y PNPM.
Actividad **EC2 F1 A5** de la materia *Diseño Frontend con Frameworks*.

## Alcance

Esta versión es una **interfaz estática**: muestra la estructura de la aplicación mediante componentes
reutilizables y propiedades tipadas.

- Se muestran el formulario, los filtros, el resumen y **tres tareas de demostración** (una completada y dos pendientes).
- Los controles que todavía no tienen comportamiento (agregar, editar, completar, eliminar y filtrar) están **deshabilitados**.
- No se implementa estado, eventos, CRUD ni persistencia; se incorporarán en actividades posteriores.
- La interfaz se adapta a móvil, tableta y computadora sin desplazamiento horizontal.

## Tecnologías

- [React 19](https://react.dev/) con componentes funcionales y TSX
- [TypeScript](https://www.typescriptlang.org/) para tipar las propiedades
- [Vite](https://vite.dev/) como herramienta de desarrollo y compilación
- [PNPM](https://pnpm.io/) como gestor de paquetes
- [Oxlint](https://oxc.rs/) para el análisis estático (`pnpm lint`)
- CSS con variables y media queries

## Estructura

```
src/
├── components/
│   ├── AppFooter.tsx     # Pie de página; recibe el nombre del curso (courseName)
│   ├── AppHeader.tsx     # Encabezado con título y subtítulo
│   ├── TaskFilters.tsx   # Botones de filtro (Todas, Pendientes, Completadas)
│   ├── TaskForm.tsx      # Formulario para nueva tarea (deshabilitado)
│   ├── TaskItem.tsx      # Representa una sola tarea; se reutiliza para cada tarea
│   ├── TaskList.tsx      # Recorre el arreglo de tareas y renderiza TaskItem
│   └── TaskSummary.tsx   # Totales: total, pendientes y completadas
├── styles/
│   ├── app.css           # Estilos de la aplicación y diseño responsivo
│   └── global.css        # Variables, reinicio y estilos base
├── types.ts              # Tipos Task, TaskPriority y TaskFilter
├── App.tsx               # Composición de todos los componentes
└── main.tsx              # Punto de entrada
```

## Componentes y propiedades

| Componente   | Responsabilidad                              | Propiedades tipadas                          |
|--------------|----------------------------------------------|----------------------------------------------|
| AppHeader    | Mostrar el título de la aplicación           | `title: string`, `subtitle: string`          |
| TaskForm     | Mostrar el formulario de captura             | `title: string`                              |
| TaskFilters  | Mostrar los filtros disponibles              | `filters: TaskFilter[]`, `activeFilter: TaskFilter` |
| TaskSummary  | Mostrar el conteo de tareas                  | `total`, `completed`, `pending`: `number`    |
| TaskList     | Listar las tareas                            | `tasks: Task[]`                              |
| TaskItem     | Representar una tarea individual             | `task: Task`                                 |
| AppFooter    | Mostrar el pie de página con el curso        | `courseName: string`                         |

## Requisitos

- Node.js 20.19 o superior
- PNPM (`npm install -g pnpm`)

## Comandos

```bash
pnpm install     # Instalar dependencias
pnpm dev         # Ejecutar en modo desarrollo (http://localhost:5173)
pnpm lint        # Analizar el código con Oxlint
pnpm build       # Verificar tipos con TypeScript y compilar para producción
pnpm preview     # Previsualizar la compilación
```

## Autor

Leonardo — Ingeniería en Sistemas, Universidad Estatal de Sonora.

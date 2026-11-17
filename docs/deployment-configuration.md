# Configuración de despliegue EC3 F3 A12

## Frontend

- Repositorio: https://github.com/leonardo0973/task-manager-frontend
- Rama: main
- Servicio: task-manager-frontend-leonardo (Render, sitio estático definido en `render.yaml`)
- URL: https://FRONTEND.onrender.com  ← reemplazar con la URL real de Render
- Build: `corepack enable && pnpm install --frozen-lockfile && pnpm verify`
- Publicación: `dist`
- VITE_API_URL: https://BACKEND.onrender.com/api  ← URL HTTPS del Backend terminada en /api
- Rewrite: `/*` hacia `/index.html`
- Encabezados: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`

## Backend relacionado

- Repositorio: https://github.com/leonardo0973/task-api-express
- Rama: `ec3-a11-me-usuario`
- Servicio: Render Web Service (Node)
  - Build: `pnpm install --frozen-lockfile && pnpm build`
  - Start: `pnpm start`
- URL: https://BACKEND.onrender.com  ← reemplazar
- CORS_ORIGIN: https://FRONTEND.onrender.com (origen exacto, sin ruta ni diagonal final)
- Salud: /health
- Salud de Atlas: /health/database
- Variables privadas (solo en el panel de Render del Backend): MONGODB_URI, MONGODB_DB_NAME, JWT_SECRET, JWT_EXPIRES_IN, CORS_ORIGIN.
- MongoDB Atlas debe permitir la conexión desde Render (Network Access).

## Ambientes

| Elemento | Desarrollo | Pruebas (Vitest) | Producción |
|---|---|---|---|
| VITE_API_URL | `/api` (`.env.local`) | `/api` (`.env.test`) | `https://BACKEND.onrender.com/api` (variable de Render) |
| Origen del Frontend | http://localhost:5173 | jsdom | https://FRONTEND.onrender.com |
| CORS_ORIGIN del Backend | http://localhost:5173 | no aplica | https://FRONTEND.onrender.com |
| Proxy de Vite | Sí | No | No existe |

`VITE_API_URL` es pública: queda dentro del JavaScript descargado por el navegador. Cambiarla exige un nuevo build (redeploy).

No copies MONGODB_URI, JWT_SECRET, tokens o contraseñas en este repositorio.

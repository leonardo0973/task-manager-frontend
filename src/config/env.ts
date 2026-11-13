const rawApiUrl = import.meta.env.VITE_API_URL?.trim()

if (!rawApiUrl) {
  throw new Error('Falta la variable VITE_API_URL.')
}

// Se retiran las diagonales finales para construir rutas como `${API_URL}/tasks`
export const API_URL = rawApiUrl.replace(/\/+$/, '')

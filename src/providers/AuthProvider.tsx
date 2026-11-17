import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext, type AuthContextValue } from '../context/auth-context'
import type {
  AuthStatus,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
} from '../models/auth.types'
import { getAuthenticatedUser, loginUser, registerUser } from '../services/auth.api.service'
import {
  getHttpErrorMessage,
  isAbortError,
  isHttpError,
  setUnauthorizedHandler,
} from '../services/http.service'
import { readAccessToken, removeAccessToken, storeAccessToken } from '../services/session.service'

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  // El token guardado se lee una sola vez; si existe, la sesión empieza en checking
  const [initialToken] = useState<string | null>(() => readAccessToken())
  const [accessToken, setAccessToken] = useState<string | null>(initialToken)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [status, setStatus] = useState<AuthStatus>(initialToken ? 'checking' : 'anonymous')
  const [sessionMessage, setSessionMessage] = useState('')

  const endSession = useCallback((message: string): void => {
    removeAccessToken()
    setAccessToken(null)
    setUser(null)
    setStatus('anonymous')
    setSessionMessage(message)
  }, [])

  // Un 401 de cualquier solicitud autenticada termina la sesión local
  useEffect(() => {
    return setUnauthorizedHandler(() => {
      endSession('Tu sesión expiró o ya no es válida. Inicia sesión nuevamente.')
    })
  }, [endSession])

  // Guardar un token no demuestra que siga siendo válido: /auth/me lo confirma
  const validateSession = useCallback(
    async (token: string, signal?: AbortSignal): Promise<void> => {
      try {
        const response = await getAuthenticatedUser(token, signal)
        setUser(response.data.user)
        setAccessToken(token)
        setStatus('authenticated')
      } catch (error) {
        if (isAbortError(error)) {
          return
        }

        // El 401 ya lo resolvió el manejador global (endSession)
        if (isHttpError(error) && error.status === 401) {
          return
        }

        // Falla distinta de 401 (por ejemplo, API detenida): se conserva el token
        // para poder reintentar
        setUser(null)
        setStatus('error')
        setSessionMessage(getHttpErrorMessage(error))
      }
    },
    [],
  )

  // Restauración al recargar: el estado inicial ya es checking si había token
  useEffect(() => {
    if (!initialToken) {
      return
    }

    const controller = new AbortController()

    async function restoreSession(token: string): Promise<void> {
      await validateSession(token, controller.signal)
    }

    void restoreSession(initialToken)

    return () => controller.abort()
  }, [initialToken, validateSession])

  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthUser> => {
    const response = await loginUser(credentials)
    const nextToken = response.data.accessToken

    // Solo se guarda el accessToken; nunca la contraseña
    storeAccessToken(nextToken)
    setAccessToken(nextToken)
    setUser(response.data.user)
    setStatus('authenticated')
    setSessionMessage('')

    return response.data.user
  }, [])

  // El registro no inicia sesión: su respuesta no contiene accessToken
  const register = useCallback(async (credentials: RegisterCredentials): Promise<AuthUser> => {
    const response = await registerUser(credentials)
    return response.data.user
  }, [])

  // Cierre local: elimina el token del navegador; no revoca el JWT en el servidor
  const logout = useCallback((): void => {
    endSession('Cerraste sesión correctamente.')
  }, [endSession])

  const retrySession = useCallback(async (): Promise<void> => {
    if (!accessToken) {
      endSession('Inicia sesión para continuar.')
      return
    }

    setStatus('checking')
    setSessionMessage('')
    await validateSession(accessToken)
  }, [accessToken, endSession, validateSession])

  const clearSessionMessage = useCallback((): void => setSessionMessage(''), [])

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      accessToken,
      sessionMessage,
      login,
      register,
      logout,
      retrySession,
      clearSessionMessage,
    }),
    [
      status,
      user,
      accessToken,
      sessionMessage,
      login,
      register,
      logout,
      retrySession,
      clearSessionMessage,
    ],
  )

  // React 19 permite usar el contexto directamente como proveedor
  return <AuthContext value={value}>{children}</AuthContext>
}

export default AuthProvider

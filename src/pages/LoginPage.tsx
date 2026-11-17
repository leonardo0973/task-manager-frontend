import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { getHttpErrorMessage } from '../services/http.service'

interface LoginLocationState {
  from?: {
    pathname: string
    search?: string
  }
  registeredEmail?: string
  registrationMessage?: string
}

function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { login, sessionMessage, clearSessionMessage } = useAuth()
  const state = location.state as LoginLocationState | null
  const [email, setEmail] = useState(state?.registeredEmail ?? '')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      await login({ email: email.trim(), password })

      clearSessionMessage()

      // Continúa hacia la ruta protegida que se intentó abrir
      const destination = state?.from
        ? `${state.from.pathname}${state.from.search ?? ''}`
        : '/tasks'

      navigate(destination, { replace: true })
    } catch (error) {
      setErrorMessage(getHttpErrorMessage(error))
      setIsSubmitting(false)
    }
  }

  const infoMessage = state?.registrationMessage || sessionMessage

  return (
    <section className="card auth-panel" aria-labelledby="login-title">
      <p className="section-heading__eyebrow">Acceso</p>
      <h2 id="login-title" className="page-title">
        Iniciar sesión
      </h2>
      <p className="page-text">Utiliza una cuenta registrada en la API.</p>

      {infoMessage && (
        <p className="operation-message auth-message" role="status">
          {infoMessage}
        </p>
      )}

      {errorMessage && (
        <p className="operation-message operation-message--error auth-message" role="alert">
          {errorMessage}
        </p>
      )}

      <form className="auth-form" onSubmit={(event) => void handleSubmit(event)} noValidate>
        <div className="form-field">
          <label htmlFor="login-email">Correo electrónico</label>
          <input
            id="login-email"
            name="email"
            type="email"
            className="field__input"
            value={email}
            autoComplete="username"
            required
            disabled={isSubmitting}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="login-password">Contraseña</label>
          <input
            id="login-password"
            name="password"
            type="password"
            className="field__input"
            value={password}
            autoComplete="current-password"
            required
            disabled={isSubmitting}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button className="button button--primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Comprobando...' : 'Iniciar sesión'}
        </button>
      </form>

      <p className="auth-alternative">
        ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
      </p>
    </section>
  )
}

export default LoginPage

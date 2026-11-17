import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import type { AuthContextValue } from '../context/auth-context'
import { useAuth } from '../hooks/useAuth'
import type { AuthUser } from '../models/auth.types'
import LoginPage from '../pages/LoginPage'

// Desafío A12: se sustituye useAuth de manera controlada
vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}))

const user: AuthUser = {
  id: 'user-01',
  name: 'Ana Torres',
  email: 'ana@example.com',
  role: 'user',
  createdAt: '2026-10-14T00:00:00.000Z',
  updatedAt: '2026-10-14T00:00:00.000Z',
}

describe('LoginPage', () => {
  it('envía el correo y la contraseña escritos a login', async () => {
    const login = vi.fn(async () => user)
    const authValue: AuthContextValue = {
      status: 'anonymous',
      user: null,
      accessToken: null,
      sessionMessage: '',
      login,
      register: vi.fn(async () => user),
      logout: vi.fn(),
      retrySession: vi.fn(async () => undefined),
      clearSessionMessage: vi.fn(),
    }
    vi.mocked(useAuth).mockReturnValue(authValue)

    const interaction = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>,
    )

    // Se interactúa por etiquetas y roles, no por clases CSS
    await interaction.type(screen.getByLabelText('Correo electrónico'), '  ana@example.com ')
    await interaction.type(screen.getByLabelText('Contraseña'), 'Frase de prueba para clase')
    await interaction.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    expect(login).toHaveBeenCalledOnce()
    expect(login).toHaveBeenCalledWith({
      email: 'ana@example.com',
      password: 'Frase de prueba para clase',
    })
  })
})

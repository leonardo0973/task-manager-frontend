import { useAuth } from '../hooks/useAuth'
import { formatTaskDate } from '../utils/date'

// Desafío A11: perfil protegido. Usa el usuario que ya tiene AuthProvider;
// no hace solicitudes, no lee sessionStorage ni decodifica el JWT.
function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <article className="card task-detail" aria-labelledby="profile-title">
      <p className="section-heading__eyebrow">Perfil</p>
      <h2 id="profile-title" className="page-title">
        {user.name}
      </h2>

      <dl className="task-detail__grid">
        <div>
          <dt>Nombre</dt>
          <dd>{user.name}</dd>
        </div>
        <div>
          <dt>Correo electrónico</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>Rol</dt>
          <dd>
            <span className={`role-badge role-badge--${user.role}`}>{user.role}</span>
          </dd>
        </div>
        <div>
          <dt>Cuenta creada</dt>
          <dd>
            <time dateTime={user.createdAt}>{formatTaskDate(user.createdAt)}</time>
          </dd>
        </div>
        <div>
          <dt>Última actualización</dt>
          <dd>
            <time dateTime={user.updatedAt}>{formatTaskDate(user.updatedAt)}</time>
          </dd>
        </div>
      </dl>
    </article>
  )
}

export default ProfilePage

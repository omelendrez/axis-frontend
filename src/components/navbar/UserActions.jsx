import { Link } from 'react-router-dom'

import { Divider, ToggleTheme } from '@/components'

import links from './links.json'

const UserRoles = ({ user }) => (
  <div className="user-role">
    {user?.roles?.map((r) => (
      <DivElement key={r.name} label={r.name} />
    ))}
  </div>
)

const LiElement = ({ route, path, label, icon, onClick }) => (
  <li className={route === `${path}` ? 'active' : undefined}>
    <Link to={path} onClick={onClick} className="link-option">
      <span className="material-icons">{icon}</span>
      <div>{label}</div>
    </Link>
  </li>
)

const DivElement = ({ label }) => (
  <div className="div-option">
    <span className="material-icons">local_police</span>
    <div>{label}</div>
  </div>
)

export const UserActions = ({
  isUserAuthenticated,
  onLogout,
  onClick,
  open,
  route,
  user,
  onHeaderClick
}) => {
  const userAuthorizedRoutes = isUserAuthenticated
    ? links.userRoutes.authorized
    : links.userRoutes.notAuthorized

  return (
    <li>
      <details open={open} role="list" dir="rtl">
        <summary
          aria-haspopup="listbox"
          role="link"
          onClick={onHeaderClick}
        ></summary>
        <ul dir="ltr">
          <UserRoles user={user} />
          <Divider style={{ margin: '0.3rem 0' }} />
          <li>
            <ToggleTheme />
          </li>
          <Divider style={{ margin: '0.3rem 0' }} />

          {userAuthorizedRoutes.map((r) => (
            <LiElement
              route={route}
              path={r.path}
              icon={r.icon}
              key={r.label}
              label={r.label}
              onClick={r.label === 'Logout' ? onLogout : onClick}
            />
          ))}
        </ul>
      </details>
    </li>
  )
}

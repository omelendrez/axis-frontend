import { Link } from 'react-router-dom'

import { Divider, ToggleTheme } from '@/components'

import links from './links.json'

const LiElement = ({ route, path, label, icon, onClick }) => (
  <li className={route === `${path}` ? 'active' : undefined}>
    <Link to={path} onClick={onClick} className="link-option">
      <span className="material-icons">{icon}</span>
      <div>{label}</div>
    </Link>
  </li>
)

export const Hamburger = ({
  isUserAuthenticated,
  onLogout,
  onClick,
  detailsRef,
  user,
  route
}) => {
  const appDefaultRoutes = isUserAuthenticated
    ? links.appRoutes.authorized
    : links.appRoutes.notAuthorized

  const userAuthorizedRoutes = isUserAuthenticated
    ? links.userRoutes.authorized
    : links.userRoutes.notAuthorized
  return (
    <li>
      <details ref={detailsRef} role="list" dir="ltr">
        <summary aria-haspopup="listbox" role="link"></summary>
        <ul>
          {user?.roles?.length > 0 &&
            appDefaultRoutes
              .filter((r) => !r.role || r.role === user.role)
              .map((r) => (
                <LiElement
                  route={route}
                  path={r.path}
                  icon={r.icon}
                  key={r.label}
                  label={r.label}
                  onClick={onClick}
                />
              ))}
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
          <Divider style={{ margin: '0.3rem 0' }} />
          <li>
            <ToggleTheme />
          </li>
        </ul>
      </details>
    </li>
  )
}

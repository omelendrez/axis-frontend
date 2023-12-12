import { Link } from 'react-router-dom'

import links from './links.json'

import options from '../features/home/options.json'
import { Divider } from '../shared'
import { hasRequiredRole } from '@/helpers'

const LiElement = ({ route, path, label, icon, onClick, color, separator }) => (
  <>
    <li className={route === `${path}` ? 'active' : undefined}>
      <Link to={path} onClick={onClick} className="link-option">
        <span className={`material-icons ${color ? `color-${color}` : null}`}>
          {icon}
        </span>
        <div className={color ? `color-${color}` : null}>{label}</div>
      </Link>
    </li>
    {separator ? <Divider style={{ margin: '0.3rem 0' }} /> : null}
  </>
)

export const Hamburger = ({
  isUserAuthenticated,
  onClick,
  open,
  user,
  route,
  onHeaderClick
}) => {
  const appDefaultRoutes = isUserAuthenticated
    ? options
        .filter((option) => hasRequiredRole(option.roles, user.roles))
        .map((o) => ({
          path: o.path,
          label: o.title,
          icon: o.icon,
          separator: o.separator,
          color: o.color
        }))
    : links.appRoutes.notAuthorized

  return (
    <li>
      <details open={open} role="list" dir="ltr">
        <summary
          aria-haspopup="listbox"
          role="link"
          onClick={onHeaderClick}
        ></summary>
        <ul>
          {user?.roles?.length > 0 &&
            appDefaultRoutes
              .filter((r) => !r.role || r.role === user.role)
              .map((r) => (
                <LiElement
                  key={r.label}
                  route={route}
                  path={r.path}
                  icon={r.icon}
                  label={r.label}
                  onClick={onClick}
                  color={r.color}
                  separator={r.separator}
                />
              ))}
        </ul>
      </details>
    </li>
  )
}

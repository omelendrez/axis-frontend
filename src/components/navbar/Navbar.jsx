import { Link, useLocation } from 'react-router-dom'
import { useContext, useEffect, useRef } from 'react'
import { SP } from '@/services'
import { UserContext, ThemeContext, NetworkContext } from '@/context'
import { Divider, BackButton } from '@/components'
import useNotification from '@/hooks/useNotification'
import links from './links.json'

import './navbar.css'

const LiElement = ({ route, path, label, icon, onClick }) => (
  <li className={route === `${path}` ? 'active' : undefined}>
    <Link to={path} onClick={onClick} className="link-option">
      <span className="material-icons">{icon}</span>
      <div>{label}</div>
    </Link>
  </li>
)

export const Navbar = () => {
  const { theme, toggle } = useContext(ThemeContext)
  const { user, setUser } = useContext(UserContext)
  const { network } = useContext(NetworkContext)

  const isUserAuthenticated = Boolean(user?.id)

  const logout = () => {
    const session = new SP()
    session.clear()
    setUser(null)
    window.close()
  }

  const { set } = useNotification()

  const detailsRef = useRef(null)

  const handleClick = () => {
    detailsRef.current.removeAttribute('open')
  }

  const handleLogout = (e) => {
    e.preventDefault()
    detailsRef.current.removeAttribute('open')
    logout()
  }

  const appDefaultRoutes = isUserAuthenticated
    ? links.appRoutes.authorized
    : links.appRoutes.notAuthorized

  const userAuthorizedRoutes = isUserAuthenticated
    ? links.userRoutes.authorized
    : links.userRoutes.notAuthorized

  const location = useLocation()
  const route = location.pathname

  useEffect(() => {
    if (network !== null) {
      const notification = {
        type: network === 'offline' ? 'error' : 'success',
        message:
          network === 'offline'
            ? 'You are offline right now'
            : 'Your are online'
      }
      set(notification)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network])

  const showHamburger =
    location.pathname === '/' || location.pathname === '/dashboard'

  return (
    <nav className="container-fluid navbar">
      <ul>
        {showHamburger ? (
          <li>
            <details ref={detailsRef} role="list" dir="ltr">
              <summary aria-haspopup="listbox" role="link"></summary>
              <ul>
                {appDefaultRoutes
                  .filter((r) => !r.role || r.role === user.role)
                  .map((r) => (
                    <LiElement
                      route={route}
                      path={r.path}
                      icon={r.icon}
                      key={r.label}
                      label={r.label}
                      onClick={handleClick}
                    />
                  ))}
                <Divider />
                {userAuthorizedRoutes.map((r) => (
                  <LiElement
                    route={route}
                    path={r.path}
                    icon={r.icon}
                    key={r.label}
                    label={r.label}
                    onClick={r.label === 'Logout' ? handleLogout : handleClick}
                  />
                ))}
              </ul>
            </details>
          </li>
        ) : (
          <BackButton />
        )}
      </ul>
      <ul>
        <li>{user?.full_name || 'Not logged in'}</li>
      </ul>
      <ul>
        <li>
          <label htmlFor="theme">
            <span className="material-icons">
              {theme === 'dark' ? 'sunny' : 'bedtime'}
              <input
                type="checkbox"
                id="theme"
                role="switch"
                onChange={toggle}
              ></input>
            </span>
          </label>
        </li>
      </ul>
    </nav>
  )
}

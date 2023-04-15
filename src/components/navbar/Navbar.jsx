import { Link, useLocation } from "react-router-dom"
import { useContext, useRef } from "react"
import { SP } from '../../services'
import { UserContext } from "../../context"
import { Divider } from "../shared"
import { HomeIcon, DashboardIcon, KeyIcon, LogoutIcon } from '../../assets'
import './navbar.css'

const LiElement = ({ route, path, label, icon, onClick }) => (

  <li className={route === `${path}` ? 'active' : ''}>
    <Link to={path} onClick={onClick} className="link-option">
      <img src={icon} alt={label} />
      <div>{label}</div>
    </Link>
  </li>
)

export const Navbar = () => {
  const detailsRef = useRef(null)
  const { user, setUser } = useContext(UserContext)

  const handleClick = () => {
    detailsRef.current.removeAttribute('open')
  }

  const handleLogout = (e) => {
    e.preventDefault()
    const session = new SP()
    session.clear()
    setUser(null)
  }

  const routes = [
    {
      label: user.full_name,
      icon: UserIcon
    },
    {
      path: '/',
      label: 'Home',
      icon: HomeIcon
    },
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: DashboardIcon
    },
    {
      path: '/change-password',
      label: 'Change Password',
      icon: KeyIcon
    },
    {
      label: 'Logout',
      icon: LogoutIcon,
      onClick: handleLogout
    }
  ]

  const location = useLocation()
  const route = location.pathname

  return (
    <nav className="container-fluid">
      <ul>
        <li>
          <details ref={detailsRef} role="list" dir="ltr">
            <summary aria-haspopup="listbox" role="link"></summary>

            <ul>
              {routes.map((r) =>
                <LiElement
                  route={route}
                  path={r.path}
                  icon={r.icon}
                  key={r.label}
                  label={r.label}
                  onClick={r.label === 'Logout' ? handleLogout : handleClick}
                />
              )}
              <Divider />
            </ul>

          </details>
        </li>
      </ul>
      <ul>
        <li><strong>{routes.find((r) => r.path === route)?.label}</strong></li>
      </ul>
    </nav>
  )
}

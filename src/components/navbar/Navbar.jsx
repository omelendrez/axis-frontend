import { useLocation } from 'react-router-dom'
import { useContext, useEffect, useRef } from 'react'
import { SP } from '@/services'
import { UserContext, NetworkContext } from '@/context'
import { BackButton, Hamburger, ToggleTheme } from './'
import useNotification from '@/hooks/useNotification'
import './navbar.css'

export const Navbar = () => {
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

  const location = useLocation()

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
          <Hamburger
            isUserAuthenticated={isUserAuthenticated}
            onClick={handleClick}
            onLogout={handleLogout}
          />
        ) : (
          <BackButton />
        )}
      </ul>
      <ul>
        <li>{user?.full_name || 'Not logged in'}</li>
      </ul>
      <ul>
        <li>
          <ToggleTheme />
        </li>
      </ul>
    </nav>
  )
}

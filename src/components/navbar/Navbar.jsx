import { useLocation } from 'react-router-dom'
import { useContext, useEffect, useRef } from 'react'
import { SP } from '@/services'
import { UserContext, NetworkContext } from '@/context'
import { BackButton, Hamburger } from './'
import useNotification from '@/hooks/useNotification'
import usePage from '@/hooks/usePage'
import './navbar.css'

export const Navbar = () => {
  const { user, setUser } = useContext(UserContext)

  const { network } = useContext(NetworkContext)

  const { page } = usePage()

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

  const showHamburger = location.pathname === '/'

  const isLoginPage = location.pathname === '/login'

  return (
    <nav className="container-fluid navbar">
      <ul>
        {showHamburger ? (
          <Hamburger
            isUserAuthenticated={isUserAuthenticated}
            onClick={handleClick}
            onLogout={handleLogout}
            detailsRef={detailsRef}
          />
        ) : (
          !isLoginPage && <BackButton />
        )}
      </ul>
      <ul>
        <li className="page-title">{page?.title}</li>
      </ul>
      <ul></ul>
    </nav>
  )
}

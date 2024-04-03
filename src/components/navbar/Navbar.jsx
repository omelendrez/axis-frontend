import { useContext, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { Hamburger, UserActions } from './'

import { UserContext } from '@/context'

import usePage from '@/hooks/usePage'

import { SP } from '@/services'

import './navbar.css'

export const Navbar = () => {
  const { pathname } = useLocation()

  const { user, setUser } = useContext(UserContext)

  const { page } = usePage()

  const isUserAuthenticated = Boolean(user?.id)

  const logout = () => {
    setIsUserActions(false)
    setIsUserOptions(false)
    const session = new SP()
    session.clear()
    setUser(null)
    window.close()
  }

  const [isUserActions, setIsUserActions] = useState(false)
  const [isUserOptions, setIsUserOptions] = useState(false)

  const handleOptionsClick = () => {
    setIsUserOptions(false)
  }

  const handleActionsClick = (e) => {
    e.preventDefault()
    setIsUserActions(false)
  }

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
  }

  const handleHeaderActionsClick = (e) => {
    e.preventDefault()
    setIsUserActions((a) => !a)
  }

  const handleHeaderOptionsClick = (e) => {
    e.preventDefault()
    setIsUserOptions((o) => !o)
  }

  if (pathname.includes('/verify')) {
    return
  }

  return (
    <nav className="container-fluid navbar">
      <ul>
        <Hamburger
          isUserAuthenticated={isUserAuthenticated}
          onClick={handleOptionsClick}
          onLogout={handleLogout}
          user={user}
          open={isUserOptions}
          onHeaderClick={handleHeaderOptionsClick}
        />
      </ul>
      <ul>
        <li className="page-title">{page?.title}</li>
      </ul>
      <ul>
        <li className="user-info">{user?.name}</li>
        <UserActions
          isUserAuthenticated={isUserAuthenticated}
          onClick={handleActionsClick}
          onLogout={handleLogout}
          user={user}
          open={isUserActions}
          onHeaderClick={handleHeaderActionsClick}
        />
      </ul>
    </nav>
  )
}

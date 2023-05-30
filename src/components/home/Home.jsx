import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context'
import { MenuOption } from './MenuOption'
import options from './options.json'
import { hasRequiredRole } from '../../helpers/auth'
import './home.css'

export const Home = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  console.log(user)

  const handleNavigate = (link) => navigate(link)

  return (
    <main className="home">
      {user &&
        options
          .map((o) => ({ ...o, roles: o?.roles || [] }))
          .filter((option) => hasRequiredRole(option.roles, user.roles))
          .map((o, i) => (
            <MenuOption
              key={i}
              description={o.description}
              onNavigate={handleNavigate}
              path={o.path}
              divider={o.divider}
              title={o.title}
            />
          ))}
    </main>
  )
}

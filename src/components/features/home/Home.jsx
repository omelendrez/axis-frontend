import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '@/context'
import { MenuOption } from './MenuOption'
import options from './options.json'
import { hasRequiredRole } from '@/helpers'
import './home.css'

export const Home = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const handleNavigate = (link) => navigate(link)

  return (
    <main className="card-list home-list container-fluid">
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
              separator={o.separator}
              title={o.title}
              icon={o.icon}
            />
          ))}
    </main>
  )
}

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context'
import options from './options.json'
import { hasRequiredRole } from '../../helpers/auth'
import './home.css'
import { Divider } from '../shared/divider/Divider'

const MenuOption = ({ title, description, path, onNavigate, divider }) =>
  !divider ? (
    <article className="home-item" onClick={() => onNavigate(path)}>
      <hgroup>
        <h3>{title}</h3>
        <h4>{description}</h4>
      </hgroup>
    </article>
  ) : (
    <Divider />
  )

export const Home = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const handleNavigate = (link) => navigate(link)

  return (
    <main className="home">
      {user &&
        options
          .map((r) => ({ ...r, roles: r?.roles || [] }))
          .filter((r) => hasRequiredRole(r.roles, user))
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

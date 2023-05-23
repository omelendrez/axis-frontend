import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context'
import options from './options.json'
import './home.css'

const MenuOption = ({ title, description, path, onNavigate }) => (
  <article className="home-item" onClick={() => onNavigate(path)}>
    <hgroup>
      <h3>{title}</h3>
      <h4>{description}</h4>
    </hgroup>
  </article>
)

export const Home = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const handleNavigate = (link) => navigate(link)

  return (
    <main className="home">
      {user &&
        options
          .filter((r) => r.roles.length === 0 || r.roles.includes(user.role))
          .map((o) => (
            <MenuOption
              key={o.path}
              title={o.title}
              description={o.description}
              path={o.path}
              onNavigate={handleNavigate}
            />
          ))}
    </main>
  )
}

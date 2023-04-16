import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../../context"
import './dashboard.css'

const menuOptions = [
  {
    title: 'Users',
    description: 'Manage Axis users',
    path: '/users',
    role: 1
  },
  {
    title: 'Roles',
    description: 'Manage user roles',
    path: '/roles',
    role: 1
  }
]

const MenuOption = ({ title, description, path }) =>
  <article>
    <hgroup>
      <h2>{title}</h2>
      <Link to={path} role="button">Go</Link>
      <h3>{description}</h3>
    </hgroup>
  </article>


export const Dashboard = () => {
  const { user } = useContext(UserContext)

  return (
    <main className="container dashboard grid">
      {menuOptions
        .filter((r) => !r.role || r.role === user.role)
        .map((o) =>
          <MenuOption
            title={o.title}
            description={o.description}
            path={o.path}
          />
        )}
    </main>
  )
}

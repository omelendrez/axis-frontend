import { Link } from 'react-router-dom'

import './dashboard.css'

const menuOptions = [
  {
    title: 'Users',
    description: 'Manage Axis users',
    path: '/users'
  },
  {
    title: 'Roles',
    description: 'Manage user roles',
    path: '/roles'
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


export const Dashboard = () => (
  <main className="container dashboard grid">
    {menuOptions.map((o) =>
      <MenuOption
        title={o.title}
        description={o.description}
        path={o.path}
      />
    )}
  </main>
)

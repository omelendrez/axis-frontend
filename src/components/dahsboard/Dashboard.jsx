import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context'
import './dashboard.css'

const menuOptions = [
  {
    title: 'Users',
    description: 'Manage Axis users',
    path: '/users',
    roles: [1]
  },
  {
    title: 'Roles',
    description: 'Manage user roles',
    path: '/roles',
    roles: [1]
  },
  {
    title: 'States',
    description: 'Manage states master table',
    path: '/states',
    roles: [1]
  },
  {
    title: 'Nationalities',
    description: 'Manage nationalities master table',
    path: '/nationalities',
    roles: [1]
  },
  {
    title: 'Companies',
    description: 'Manage companies master table',
    path: '/companies',
    roles: [1]
  },
  {
    title: 'Learners',
    description: 'Manage learners',
    path: '/learners',
    roles: [1]
  },
  {
    title: 'Courses',
    description: 'Manage courses',
    path: '/courses',
    roles: [1]
  },
  {
    title: 'Course Items',
    description: 'Manage courses items',
    path: '/course-items',
    roles: [1]
  }
]

const MenuOption = ({ title, description, path, onNavigate }) => (
  <article className="dashboard-item" onClick={() => onNavigate(path)}>
    <hgroup>
      <h3>{title}</h3>
      <h4>{description}</h4>
    </hgroup>
  </article>
)

export const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const handleNavigate = (link) => navigate(link)

  return (
    <main className="dashboard">
      {menuOptions
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

import { Link } from 'react-router-dom'
import { Dashboard as DashboardComponent } from '../components'

const Dashboard = () => {
  return (
    <main className="container-fluid">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Dashboard</li>
        </ul>
      </nav>
      <DashboardComponent />
    </main>
  )
}

export default Dashboard

import { Link } from 'react-router-dom'
import { Home as HomeComponent } from '../components'

const Home = () => {
  return (
    <main className="container-fluid">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
      <HomeComponent />
    </main>
  )
}

export default Home

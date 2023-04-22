import { Link } from 'react-router-dom'
import { ChangePassword as ChangePasswordComponent } from '../components'

const ChangePassword = () => {
  return (
    <main className="container-fluid">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>Roles</li>
        </ul>
      </nav>
      <article className="form-container">
        <ChangePasswordComponent />
      </article>
    </main>
  )
}

export default ChangePassword

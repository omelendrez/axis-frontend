import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Role as RoleComponent } from '../components'
import { getRole } from '../services'

const Role = () => {
  const params = useParams()
  const [role, setRole] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getRole(id).then((res) => setRole(res.data))
    }
  }, [params])

  return (
    <main className="container">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/Roles">Roles</Link>
          </li>
          <li>Role</li>
        </ul>
      </nav>
      <article className="form-container">
        <RoleComponent role={role} />
      </article>
    </main>
  )
}

export default Role

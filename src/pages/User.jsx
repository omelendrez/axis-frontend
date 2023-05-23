import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { User as UserComponent } from '../components'
import { getUser } from '../services'
import { handleError } from '../reducers/error'

const User = () => {
  const params = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getUser(id)
        .then((res) => setUser(res.data))
        .catch((e) => handleError(e))
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
            <Link to="/users">Users</Link>
          </li>
          <li>User</li>
        </ul>
      </nav>
      <article className="form-container">
        <UserComponent user={user} />
      </article>
    </main>
  )
}

export default User

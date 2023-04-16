import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { User as UserComponent } from "../components/users"
import { getUser } from '../services'

export const User = () => {
  const location = useLocation()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { state } = location
    getUser(state.id)
      .then((res) => {
        setUser(res.data)
      })
  }, [location])

  return (
    <main className="container-fluid">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li>User</li>
        </ul>
      </nav>
      <UserComponent user={user} />
    </main>
  )
}

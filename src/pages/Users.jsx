import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Users as UsersComponent } from "../components/users"
import { getUsers } from "../services"

export const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res.data)
      })
  }, [])

  return (
    <main className="container-fluid">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>Users</li>
        </ul>
      </nav>
      <UsersComponent
        users={users}
      />
    </main>
  )
}

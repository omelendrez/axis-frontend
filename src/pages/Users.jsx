import { useEffect, useState } from "react"
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
      <hgroup>
        <h2>Users</h2>
        <h3>Users management</h3>
      </hgroup>
      <UsersComponent
        users={users}
      />
    </main>
  )
}

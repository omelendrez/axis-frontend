import { useEffect, useState } from "react"
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
      <hgroup>
        <h2>User</h2>
        <h3>User management</h3>
      </hgroup>
      <UserComponent user={user} />
    </main>
  )
}

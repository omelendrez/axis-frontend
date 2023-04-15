import { useState } from "react"
import { Navbar } from "./components"
import { AppRoutes } from "./routes"
import { UserContext } from "./context"
import { KEYS, SP } from "./services/session"
function App() {
  const session = new SP()
  const currentUser = session.get(KEYS.user) || null
  const [user, setUser] = useState(currentUser)
  const contextValues = {
    user,
    setUser
  }

  return (
    <UserContext.Provider value={contextValues}>
      {user?.id && <Navbar />}
      <AppRoutes />
    </UserContext.Provider>
  )
}

export default App

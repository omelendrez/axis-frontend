import { useState } from "react"
import { ErrorBoundary } from 'react-error-boundary'
import { Navbar } from "./components"
import { AppRoutes } from "./routes"
import { UserContext } from "./context"
import { KEYS, SP } from "./services/session"
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const errorHandler = (error, info) => {
  console.info(info.componentStack)
  console.error(error)
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const session = new SP()
  const currentUser = session.get(KEYS.user) || null
  const [user, setUser] = useState(currentUser)
  const contextValues = {
    user,
    setUser
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={errorHandler}
    >
      <UserContext.Provider value={contextValues}>
        {user?.id && <Navbar />}
        <AppRoutes />
      </UserContext.Provider>
    </ErrorBoundary>
  )
}

export default App

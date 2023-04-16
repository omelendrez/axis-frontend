import { useEffect, useState } from "react"
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer, toast } from 'react-toastify'
import useNoficication from "./hooks/useNotification"
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

  const { data } = useNoficication()

  useEffect(() => {
    if (data.type && data.message) {
      const delay = data.message.split(' ').length * 500
      toast[data.type](data.message, { autoClose: delay })
    }
  }, [data])

  const session = new SP()
  const currentUser = session.get(KEYS.user) || null
  const [user, setUser] = useState(currentUser)
  const contextValues = {
    user,
    setUser
  }

  return (
    <>
      <ToastContainer />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={errorHandler}
      >
        <UserContext.Provider value={contextValues}>
          {user?.id && <Navbar />}
          <AppRoutes />
        </UserContext.Provider>
      </ErrorBoundary>
    </>
  )
}

export default App

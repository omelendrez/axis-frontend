import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer, toast } from 'react-toastify'
import useNoficication from './hooks/useNotification'
import { Navbar } from './components'
import { AppRoutes } from './routes'
import { UserContext } from './context'
import { KEYS, SP } from './services/session'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const errorHandler = (error, info) => {
  console.info(info.componentStack)
  console.error(error)
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <article role="alert" className="error-fallback">
      <h3>Something went wrong:</h3>
      <pre>{error.message}</pre>
      <footer>
        <Link to="/" role="button">
          Back to Home
        </Link>
        <a
          href="/#"
          role="button"
          onClick={(e) => {
            e.preventDefault()
            resetErrorBoundary()
          }}
        >
          Continue
        </a>
      </footer>
    </article>
  )
}

function App() {
  const { data, clear } = useNoficication()

  useEffect(() => {
    if (data.type && data.message) {
      const delay = data.message.split(' ').length * 500
      toast[data.type](data.message, { autoClose: delay })
      setTimeout(() => {
        clear()
      }, delay)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <ToastContainer theme={window.localStorage.getItem('theme') || 'light'} />
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
        <UserContext.Provider value={contextValues}>
          <Navbar me={user} />
          <AppRoutes />
        </UserContext.Provider>
      </ErrorBoundary>
    </>
  )
}

export default App

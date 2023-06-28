import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer, toast } from 'react-toastify'
import { io } from 'socket.io-client'

import useNoficication from '@/hooks/useNotification'

import { Navbar } from '@/components'
import { AppRoutes } from '@/routes'
import { UserContext } from '@/context'
import { TrainingContext } from '@/context'
import { KEYS, SP } from '@/services'

// Styles
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
  const navigate = useNavigate()

  useEffect(() => {
    if (data.type && data.message) {
      const delay = data.message.split(' ').length * 500
      // const delay = data.type === 'error' && ? 10000 : 5000
      toast[data.type](data.message, { autoClose: delay })
      if (data.message === 'Token expired') {
        navigate('/login')
      }
      setTimeout(() => {
        clear()
      }, delay)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    const server = import.meta.env.VITE_API_URL.replace('/api/', '')
    const socket = io(server)

    socket.on('training-status-changed', (id) => {
      navigator.vibrate([100, 200, 200, 200, 500])
      setId(id)
    })

    socket.on('connect_error', (a) => {
      console.error('Socket connection error')
      setTimeout(() => socket.connect(), 20000)
    })

    socket.on('disconnect', () => console.log('server disconnected'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const session = new SP()
  const currentUser = session.get(KEYS.user) || null
  const [user, setUser] = useState(currentUser)

  const [id, setId] = useState(null)

  const userContextValues = {
    user,
    setUser
  }

  const trainingContextValues = {
    id,
    setId
  }

  return (
    <>
      <ToastContainer theme={window.localStorage.getItem('theme') || 'light'} />
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
        <UserContext.Provider value={userContextValues}>
          <Navbar me={user} />
          <TrainingContext.Provider value={trainingContextValues}>
            <AppRoutes />
          </TrainingContext.Provider>
        </UserContext.Provider>
      </ErrorBoundary>
    </>
  )
}

export default App

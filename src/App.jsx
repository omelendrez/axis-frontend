import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer, toast } from 'react-toastify'
import { io } from 'socket.io-client'

import useNotification from '@/hooks/useNotification'

import { Navbar } from '@/components'
import { AppRoutes } from '@/routes'
import {
  UserContext,
  TrainingContext,
  NetworkContext,
  PageContext,
  PendingTasksContext
} from '@/context'

import { KEYS, SP } from '@/services'

import { USER_ROLE } from './helpers'

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
  const { data, clear } = useNotification()
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

    socket.on('training-status-changed', (changes) => {
      navigator.vibrate([100, 200, 200, 200, 500])
      setChanges(changes)
    })

    socket.on('connect_error', () => {
      console.error('Socket connection error')
      setTimeout(() => socket.connect(), 20000)
    })

    window.addEventListener('online', (e) => {
      const { type } = e
      setNetwork(type)
      session.save(KEYS.network, type)
    })
    window.addEventListener('offline', (e) => {
      const { type } = e
      setNetwork(type)
      session.save(KEYS.network, type)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const session = new SP()
  const currentUser = session.get(KEYS.user) || null

  // TODO: Remove fake roles
  const [user, setUser] = useState({
    ...currentUser,
    roles: [{ id: USER_ROLE.SYS_ADMIN }]
  })
  const [changes, setChanges] = useState(null)
  const [network, setNetwork] = useState(navigator.onLine)
  const [pendingTasksParams, setPendingTaksParams] = useState({
    date: null,
    selectedStatuses: []
  })

  const [page, setPage] = useState(null)

  const userContextValues = {
    user,
    setUser
  }

  const trainingContextValues = {
    changes,
    setChanges
  }

  const networkContextValues = {
    network,
    setNetwork
  }

  const pageContextValues = {
    page,
    setPage
  }

  const pendingTasksContextValues = {
    pendingTasksParams,
    setPendingTaksParams
  }

  return (
    <>
      <ToastContainer theme={window.localStorage.getItem('theme') || 'light'} />
      <UserContext.Provider value={userContextValues}>
        <NetworkContext.Provider value={networkContextValues}>
          <PageContext.Provider value={pageContextValues}>
            <PendingTasksContext.Provider value={pendingTasksContextValues}>
              <Navbar />
              <TrainingContext.Provider value={trainingContextValues}>
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onError={errorHandler}
                >
                  <AppRoutes />
                </ErrorBoundary>
              </TrainingContext.Provider>
            </PendingTasksContext.Provider>
          </PageContext.Provider>
        </NetworkContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App

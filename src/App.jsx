import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer, toast } from 'react-toastify'
// import { io } from 'socket.io-client'

import useNotification from '@/hooks/useNotification'
// import useIdle from './hooks/useIdle'

import { Navbar, VerticalAlignTop } from '@/components'

import { AppRoutes } from '@/routes'

// import { TrainingContext } from '@/context'
import { NetworkContext } from '@/context'

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
  // const { isIdle } = useIdle()

  const { data, clear } = useNotification()
  const navigate = useNavigate()

  const [showVerticalAlign, setShowVerticalAlign] = useState(0)

  const { setNetwork } = useContext(NetworkContext)

  // const { setChanges } = useContext(TrainingContext)

  // const [locked, setLocked] = useState(false)

  const handleScroll = () => setShowVerticalAlign(window.scrollY > 200)

  useEffect(() => {
    setShowVerticalAlign(window.scrollY > 200)

    window.addEventListener('scroll', handleScroll)

    return () => window?.removeEventListener('scroll', handleScroll)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if (isIdle && user?.id) {
  //     const message = 'Inactivity has been detected. You will be logged out'
  //     setLocked(true)
  //     toast(message, {
  //       autoClose: 5000,
  //       pauseOnFocusLoss: false,
  //       position: toast.POSITION.BOTTOM_CENTER,
  //       onClose: logout
  //     })
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isIdle])

  useEffect(() => {
    if (data.type && data.message) {
      const delay = data.message.split(' ').length * 500
      // const delay = data.type === 'error' && ? 10000 : 5000
      toast[data.type](data.message, {
        autoClose: delay,
        pauseOnFocusLoss: false,
        onClose: data.onClose || null
      })
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
    // const server = import.meta.env.VITE_API_URL.replace('/api/', '')
    // const socket = io(server)

    // socket.on('training-status-changed', (changes) => {
    //   navigator.vibrate([100, 200, 200, 200, 500])
    //   setChanges(changes)
    // })

    // socket.on('connect_error', () => {
    //   console.error('Socket connection error')
    //   setTimeout(() => socket.connect(), 20000)
    // })

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

  return (
    // <main className={`app-container ${locked ? 'locked' : ''}`}>
    <>
      <ToastContainer theme={window.localStorage.getItem('theme') || 'light'} />
      <Navbar />
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
        <AppRoutes />
        <VerticalAlignTop show={showVerticalAlign} />
      </ErrorBoundary>

      {/* </main> */}
    </>
  )
}

export default App

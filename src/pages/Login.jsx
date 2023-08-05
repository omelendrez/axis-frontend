import { useEffect } from 'react'
import { Login as LoginComponent } from '@/components'
import usePage from '@/hooks/usePage'

const Login = () => {
  const { set: setPage } = usePage()

  useEffect(() => {
    setPage('Login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="container-fluid">
      <article className="form-container login-form-container">
        <LoginComponent />
      </article>
    </main>
  )
}

export default Login

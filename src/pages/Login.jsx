import { Login as LoginComponent } from '@/components'
import usePage from '@/hooks/usePage'
import { useEffect } from 'react'

const Login = () => {
  const { set: setPage } = usePage()

  useEffect(() => {
    setPage('Login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <article className="login-form-container">
      <LoginComponent />
    </article>
  )
}

export default Login

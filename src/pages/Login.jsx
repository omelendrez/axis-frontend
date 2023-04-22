import { Login as LoginComponent } from '../components'

const Login = () => {
  return (
    <main className="container login-component">
      <article className="grid">
        <div>
          <hgroup>
            <h1>Login</h1>
            <hd2>Enter your credentials</hd2>
          </hgroup>
          <LoginComponent />
        </div>
      </article>
    </main>
  )
}

export default Login

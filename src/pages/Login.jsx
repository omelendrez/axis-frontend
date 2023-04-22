import { Login as LoginComponent } from '../components'

const Login = () => {
  return (
    <main className="container-fluid">
      <article>
        <div>
          <hgroup>
            <h1>Login</h1>
            <h2>Enter your credentials</h2>
          </hgroup>
          <article className="form-container">
            <LoginComponent />
          </article>
        </div>
      </article>
    </main>
  )
}

export default Login

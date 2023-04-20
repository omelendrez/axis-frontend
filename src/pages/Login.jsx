import { Login as LoginComponent } from '../components'

const Login = () => {
  return (
    <main className="container-fluid">
      <hgroup>
        <h2>Login</h2>
        <h3>Credentials validation</h3>
      </hgroup>
      <div className="container">
        <LoginComponent />
      </div>
    </main>
  )
}

export default Login

import { ChangePassword as ChangePasswordComponent } from '../components'

const ChangePassword = () => {
  return (
    <main className="container-fluid">
      <hgroup>
        <h2>Change password</h2>
        <h3>Update credentials</h3>
      </hgroup>
      <div className="container">
        <ChangePasswordComponent />
      </div>
    </main>
  )
}

export default ChangePassword

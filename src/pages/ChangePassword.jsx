import { ChangePassword as ChangePasswordComponent } from "../components"

export const ChangePassword = () => {
  return (
    <main className="container-fluid">
      <hgroup>
        <h2>Change password</h2>
        <h3>Update credentials</h3>
      </hgroup>
      <ChangePasswordComponent />
    </main>
  )
}

import { ChangePassword as ChangePasswordComponent } from '@/components'
import usePage from '@/hooks/usePage'
import { useEffect } from 'react'

const ChangePassword = () => {
  const { set: setPage } = usePage()

  useEffect(() => {
    setPage('Change password')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="container-fluid">
      <article className="form-container change-password-form-container">
        <ChangePasswordComponent />
      </article>
    </main>
  )
}

export default ChangePassword

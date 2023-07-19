import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { FormContainer, UserView, UserForm } from '@/components'
import { getUser } from '@/services'
import useApiMessages from '@/hooks/useApiMessages'
import usePage from '@/hooks/usePage'

const User = ({ isViewing, isAdding, isEditing }) => {
  const params = useParams()

  const { apiMessage } = useApiMessages()
  const { set: setPage } = usePage()

  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    setPage('User')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const id = params?.id
    if (id) {
      getUser(id)
        .then((res) => setUser(res.data))
        .catch((e) => apiMessage(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const handleClose = (e) => {
    e.preventDefault()
    navigate('/users')
  }

  return (
    <main className="container-fluid">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>User</li>
        </ul>
      </nav>
      {isViewing && <UserView user={user} />}

      {isAdding && (
        <FormContainer title="Adding User data">
          <UserForm onClose={handleClose} />
        </FormContainer>
      )}
      {isEditing && (
        <FormContainer title="Modifying User data">
          <UserForm user={user} />
        </FormContainer>
      )}
    </main>
  )
}

export default User

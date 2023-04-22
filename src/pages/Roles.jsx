import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Roles as RolesComponent, TableButtonRow, Loading } from '../components'

import useRoles from '../hooks/useRoles'
import useNoficication from '../hooks/useNotification'

const Roles = () => {
  const { roles, load: loadRoles, remove: removeRole } = useRoles()
  const { data, isLoading, isSuccess, isError, error } = roles

  const navigate = useNavigate()
  const { set } = useNoficication()

  useEffect(() => {
    if (!data.length) {
      loadRoles()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isError) {
      const notification = {
        type: 'error',
        message: error.message
      }
      set(notification)
    }
    if (isSuccess) {
      const notification = {
        type: 'success',
        message: 'Operation completed successfully'
      }
      set(notification)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess])

  const handleEdit = (role) => {
    navigate(`/role/${role.id}`)
  }
  const handleDelete = (role) => {
    removeRole(role.id)
  }

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>Roles</li>
        </ul>
      </nav>
      <TableButtonRow url="/role" label="Add role" />

      <RolesComponent
        roles={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  )
}

export default Roles

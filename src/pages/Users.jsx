import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TableButtonRow, Loading, ListView } from '../components'
import useUsers from '../hooks/useUsers'
import useNoficication from '../hooks/useNotification'
import { initialValues } from '../helpers'

const Users = () => {
  const { users, load: loadUsers, remove: removeUser } = useUsers()
  const { data, isLoading, isSuccess, isError, error, isFirstLoad } = users

  const [pagination, setPagination] = useState(initialValues)

  const navigate = useNavigate()
  const { set } = useNoficication()

  useEffect(() => {
    loadUsers(pagination)
  }, [pagination])

  useEffect(() => {
    if (isFirstLoad) {
      loadUsers(pagination)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstLoad])

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

  const handleEdit = (user) => {
    navigate(`/user/${user.id}`)
  }

  const handleDelete = (user) => {
    removeUser(user.id)
  }

  const fields = [
    { name: 'name', label: 'Name', lock: { values: ['omar', 'Axis'] } },
    { name: 'full_name', label: 'Username' },
    { name: 'email', label: 'Email' },
    { name: 'role_name', label: 'Role' }
  ]

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
          <li>Users</li>
        </ul>
      </nav>

      <TableButtonRow url="/user" label="Add user" />

      <ListView
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        loadItems={loadUsers}
      />
    </main>
  )
}

export default Users

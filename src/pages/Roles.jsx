import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loading, ListView, AddButton } from '@/components'

import useRoles from '@/hooks/useRoles'
import useNotification from '@/hooks/useNotification'

import { initialValues } from '@/helpers'

const Roles = () => {
  const { roles, load: loadRoles, remove: removeRole } = useRoles()
  const { data, isLoading, isSuccess, isError, error } = roles

  const [pagination, setPagination] = useState(initialValues)

  const navigate = useNavigate()
  const { set } = useNotification()

  useEffect(() => {
    loadRoles(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    loadRoles(pagination)

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

  const fields = [{ name: 'name', label: 'Name' }]

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Roles</li>
        </ul>
      </nav>
      <AddButton url="/role" />

      <ListView
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </main>
  )
}

export default Roles

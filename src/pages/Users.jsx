import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loading, CardList, AddButton, Tag } from '@/components'

import useUsers from '@/hooks/useUsers'
import useNotification from '@/hooks/useNotification'

import { initialValues } from '@/helpers'

import './user-card.css'
import usePage from '@/hooks/usePage'

const Card = ({ item, onView }) => {
  const roles = JSON.parse(item.roles)
    .map((r) => r.name)
    .join(', ')
  return (
    <article className="card users" onClick={() => onView(item)}>
      <div className="card-body">
        <div>
          <span className="username">{item.name}</span>
        </div>

        {roles.length > 0 ? (
          <div className="roles-container small-font">
            <div className="label">Roles: </div>
            <div className="value">{roles}</div>
          </div>
        ) : (
          <div className="label small-font">No roles assigned</div>
        )}
        {item.id !== 1 ? (
          <div>
            <Tag className={item.status}>{item.status}</Tag>
          </div>
        ) : (
          <div>
            <Tag className="active">Active</Tag>
          </div>
        )}
      </div>
    </article>
  )
}

const Users = () => {
  const { users, load: loadUsers } = useUsers()
  const { data, isLoading, isSuccess, isError, error } = users

  const [pagination, setPagination] = useState(initialValues)

  const navigate = useNavigate()
  const { set } = useNotification()
  const { set: setPage } = usePage()

  useEffect(() => {
    loadUsers(pagination)
    setPage('Users')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

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

  const handleView = (user) => {
    navigate(`/user/${user.id}`)
  }

  // const handleDelete = (user) => {
  //   removeUser(user.id)
  // }

  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'cert_type_name', label: 'Type' }
  ]

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Users</li>
        </ul>
      </nav>

      <AddButton url="/user/add" />
      <CardList
        Card={Card}
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onView={handleView}
        isLoading={isLoading}
        loadItems={loadUsers}
      />
    </main>
  )
}

export default Users

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Modal } from '@/components'

import { User, UserRoles } from './user-view'
import { UserForm } from '..'
import { UserRoles as UserRoleList } from './user-role'

import useApiMessages from '@/hooks/useApiMessages'

import userRoleFields from './user-view/user-role-fields.json'

import {
  deleteUser,
  deleteUserRole,
  getAvailableRoles,
  getUser,
  getUserRoles,
  getUserView
} from '@/services'

import './userView.css'

export const UserView = () => {
  const params = useParams()

  const navigate = useNavigate()

  const { apiMessage } = useApiMessages()

  const [update, setUpdate] = useState(false)

  const [user, setUser] = useState(null)
  const [userEditData, setUserEditData] = useState(null)
  const [isUserEdit, setIsUserEdit] = useState(false)

  const [userItemEditData, setUserItemEditData] = useState(null)
  const [isUserItemEdit, setIsUserItemEdit] = useState(false)

  const [userRoles, setUserRoles] = useState([])
  const [userRoleEditData, setUserRoleEditData] = useState(null)
  const [userRolesAvailable, setUserRolesAvailable] = useState([])
  const [isUserRoleEdit, setIsUserRoleEdit] = useState(false)

  const id = params?.id

  // User
  const handleEditUser = (e) => {
    e?.preventDefault()

    getUser(id)
      .then((res) => {
        setUserEditData(res.data)
        setIsUserEdit(true)
      })
      .catch((e) => apiMessage(e))
  }

  const handleDeleteUser = (e) => {
    e.preventDefault()

    deleteUser(id)
      .then((res) => {
        apiMessage(res)
        navigate('/courses')
      })
      .catch((e) => apiMessage(e))
  }
  // User role
  const handleAddUserRole = (e) => {
    e.preventDefault()

    const fields = userRoleFields.map((f) => f.field)

    const fieldData = {}
    fields.forEach((f) => (fieldData[f] = ''))

    setUserRoleEditData({ ...fieldData, user: id, id: undefined })
    setIsUserRoleEdit(true)
  }

  const handleDeleteUserRole = (userRoleId) => {
    deleteUserRole(userRoleId)
      .then((res) => {
        apiMessage(res)

        setUpdate((u) => !u)
      })
      .catch((e) => apiMessage(e))
  }

  const handleClose = (e) => {
    e?.preventDefault()
    setUpdate((u) => !u)

    if (isUserRoleEdit) {
      setUserRoleEditData(null)
      setIsUserRoleEdit(false)
    }
    if (isUserItemEdit) {
      setUserItemEditData(null)
      setIsUserItemEdit(false)
    }
    if (isUserEdit) {
      setUserEditData(null)
      setIsUserEdit(false)
    }
  }

  useEffect(() => {
    if (id) {
      // User
      getUserView(id)
        .then((res) => {
          setUser(res.data)
        })
        .catch((e) => apiMessage(e))

      // User role
      getUserRoles(id)
        .then((res) => {
          setUserRoles(res.data)
        })
        .catch((e) => apiMessage(e))

      getAvailableRoles(id)
        .then((res) => {
          setUserRolesAvailable(res.data)
        })
        .catch((e) => apiMessage(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, update])

  if (!user) {
    return null
  }

  return (
    <>
      {/* Edit modals  */}

      <Modal open={isUserEdit} title="Edit user" onClose={handleClose}>
        <UserForm user={userEditData} onClose={handleClose} />
      </Modal>

      <Modal open={isUserRoleEdit} title="User roles" onClose={handleClose}>
        <UserRoleList
          id={user.id}
          items={userRolesAvailable}
          key={userItemEditData?.id}
          onClose={handleClose}
        />
      </Modal>

      <main className="user-view">
        {/* Data components */}

        <User user={user} onEdit={handleEditUser} onDelete={handleDeleteUser} />

        <UserRoles
          items={userRoles}
          onAdd={handleAddUserRole}
          onDelete={handleDeleteUserRole}
          key={userRoleEditData?.id}
        />
      </main>
    </>
  )
}

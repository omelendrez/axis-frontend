import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Loading, Modal } from '../shared'

import { User, UserRoles } from './user-view'
import { UserForm } from '..'
import { UserRoles as UserRoleForm } from './user-role'

import useApiMessages from '../../hooks/useApiMessages'

import userRoleFields from './user-view/user-role-fields.json'

import {
  deleteUserRole,
  getUser,
  getUserRoles,
  getAvailableRoles,
  getUserView
} from '../../services'

import './userView.css'

export const UserView = () => {
  const params = useParams()

  const { apiMessage } = useApiMessages()

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

  // User role
  const handleAddUserRole = (e) => {
    e.preventDefault()

    const fields = userRoleFields.map((f) => f.field)

    const fieldData = {}
    fields.forEach((f) => (fieldData[f] = ''))

    setUserRoleEditData({ ...fieldData, user: id, id: undefined })
    setIsUserRoleEdit(true)
  }

  const handleDeleteUserRole = (userRoleId) =>
    deleteUserRole(userRoleId)
      .then((res) => apiMessage(res))
      .catch((e) => apiMessage(e))

  const handleClose = (e) => {
    e?.preventDefault()

    // User
    getUserView(id)
      .then((res) => {
        setUser(res.data)
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
  }, [params, id])

  if (!user) {
    return <Loading />
  }

  return (
    <>
      {/* Edit modals  */}

      <Modal open={isUserEdit} title="Edit user" onClose={handleClose}>
        <UserForm user={userEditData} onClose={handleClose} />
      </Modal>

      <Modal
        open={isUserRoleEdit}
        title="Insert user roles"
        onClose={handleClose}
      >
        <UserRoleForm
          onClose={handleClose}
          items={userRolesAvailable}
          user={user.id}
          key={userItemEditData?.id}
        />
      </Modal>

      <main className="user-view">
        {/* Data components */}

        <User user={user} onEdit={handleEditUser} />

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

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Confirm, Form } from '../shared'
import useUsers from '../../hooks/useUsers.js'
import useRoles from '../../hooks/useRoles'
import { status as statusList } from '../../static-lists'
import schema from './schema.json'
import { loadSchema } from '../../helpers'

export const User = ({ user }) => {
  const { users, add, modify } = useUsers()
  const { isLoading, isSuccess } = users

  const initialValues = loadSchema(schema)

  const { roles, load: loadRoles } = useRoles()
  const { data: roleList } = roles

  const [values, setValues] = useState(initialValues)
  const [confirmMessage, setConfirmMessage] = useState('')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [tempValue, setTempValue] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadRoles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user) {
      Object.entries(user).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [user])

  useEffect(() => {
    if (isSuccess) {
      navigate(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleChange = (e) => {
    const { id, value } = e.target
    if (id === 'status') {
      setTempValue({ id, value, prev: user?.status })
      setConfirmMessage('Are you sure you want to change user status?')
      return setIsConfirmOpen(true)
    }
    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    const { id, value } = tempValue
    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))
    setIsConfirmOpen(false)
  }

  const handleCancel = (e) => {
    e.preventDefault()

    const { id, prev } = tempValue
    const value = prev
    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))

    setTempValue(null)
    setIsConfirmOpen(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const payload = Object.entries(values)
      .filter((id) => id !== 'id')
      .reduce((acc, [id, value]) => ({ ...acc, [id]: value.value }), {})

    if (user?.id) {
      modify(user.id, payload)
    } else {
      add(payload)
    }
  }

  const handleFormCancel = (e) => {
    e.preventDefault()
    navigate('/users')
  }

  const options = {
    statusList,
    roleList
  }

  return (
    <>
      <Confirm
        open={isConfirmOpen}
        onCofirm={handleConfirm}
        onCancel={handleCancel}
        message={confirmMessage}
      />

      <Form
        schema={schema}
        object={user}
        isLoading={isLoading}
        onChange={handleChange}
        values={values}
        options={options}
        onSave={handleSave}
        onClose={handleFormCancel}
      />
    </>
  )
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '../shared'

import useUsers from '../../hooks/useUsers'

import schema from './schema.json'
import { loadSchema } from '../../helpers'
import { status as statusList } from '../../static-lists'

export const UserForm = ({ user }) => {
  const { users, add, modify } = useUsers()
  const { isLoading, isSuccess } = users

  const initialValues = loadSchema(schema)

  const [values, setValues] = useState(initialValues)
  const navigate = useNavigate()

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
    const { id } = e.target
    let data = {}

    const field = schema.find((f) => f.id === id)

    if (field.type === 'switch') {
      const checked = e.target.checked
      data = { value: checked ? 1 : 0, error: '' }
    } else {
      const value = e.target.value
      data = { value, error: '' }
    }
    setValues((values) => ({ ...values, [id]: data }))
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
    navigate(-1)
  }

  const options = {
    statusList
  }

  return (
    <Form
      schema={schema}
      object={user}
      isLoading={isLoading}
      onChange={handleChange}
      values={values}
      onSave={handleSave}
      onClose={handleFormCancel}
      options={options}
    />
  )
}

import { useEffect, useState } from 'react'

import { Form } from '@/components'

import useUsers from '@/hooks/useUsers'
import useNotification from '@/hooks/useNotification'
import schema from './schema.json'
import { loadSchema, getFieldData } from '@/helpers'
import { status as statusList } from '@/static-lists'

export const UserForm = ({ user, onClose }) => {
  const { users, add, modify } = useUsers()
  const { isLoading, isSuccess } = users

  const { set } = useNotification()

  const initialValues = loadSchema(schema)

  const [values, setValues] = useState(initialValues)

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
      const notification = {
        type: 'success',
        message: 'Record updated successfully'
      }
      set(notification)
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleChange = (e) => {
    const { data, id } = getFieldData(schema, e)
    setValues((values) => ({ ...values, [id]: data }))
  }

  const handleSubmit = (e) => {
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
      onSubmit={handleSubmit}
      onClose={onClose}
      options={options}
    />
  )
}

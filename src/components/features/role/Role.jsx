import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '@/components'

import useRoles from '@/hooks/useRoles'

import schema from './schema.json'
import { loadSchema } from '@/helpers'

export const Role = ({ role }) => {
  const { roles, add, modify } = useRoles()
  const { isLoading, isSuccess } = roles

  const initialValues = loadSchema(schema)

  const [values, setValues] = useState(initialValues)

  const navigate = useNavigate()

  useEffect(() => {
    if (role) {
      Object.entries(role).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [role])

  const handleChange = (e) => {
    const { id, value } = e.target
    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))
  }

  useEffect(() => {
    if (isSuccess) {
      navigate(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = Object.entries(values)
      .filter((id) => id !== 'id')
      .reduce((acc, [id, value]) => ({ ...acc, [id]: value.value }), {})

    if (role?.id) {
      modify(role.id, payload)
    } else {
      add(payload)
    }
  }

  const handleFormCancel = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <Form
      schema={schema}
      object={role}
      isLoading={isLoading}
      onChange={handleChange}
      values={values}
      onSubmit={handleSubmit}
      onClose={handleFormCancel}
    />
  )
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '@/components'

import useStates from '@/hooks/useStates'

import schema from './schema.json'
import { loadSchema } from '@/helpers'

export const State = ({ state }) => {
  const { states, add, modify } = useStates()
  const { isLoading, isSuccess } = states

  const initialValues = loadSchema(schema)

  const [values, setValues] = useState(initialValues)
  const navigate = useNavigate()

  useEffect(() => {
    if (state) {
      Object.entries(state).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [state])

  useEffect(() => {
    if (isSuccess) {
      navigate(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleChange = (e) => {
    const { id, value } = e.target
    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    const payload = Object.entries(values)
      .filter((id) => id !== 'id')
      .reduce((acc, [id, value]) => ({ ...acc, [id]: value.value }), {})

    if (state?.id) {
      modify(state.id, payload)
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
      object={state}
      isLoading={isLoading}
      onChange={handleChange}
      values={values}
      onSave={handleSave}
      onClose={handleFormCancel}
    />
  )
}

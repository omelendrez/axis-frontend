import { useEffect, useState } from 'react'

import { Form } from '@/components'

import useNotification from '@/hooks/useNotification'

import schema from './schema.json'
import { loadSchema } from '@/helpers'

export const InstructorForm = ({
  instructor,
  instructors,
  modules,
  min,
  max,
  onClose,
  onSave
}) => {
  const { set } = useNotification()

  const isSuccess = ''
  const isLoading = false

  const initialValues = loadSchema(schema)

  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    if (instructor) {
      Object.entries(instructor).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [instructor])

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
    const { id, value } = e.target
    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = Object.entries(values)
      .filter((id) => id !== 'id')
      .reduce((acc, [id, value]) => ({ ...acc, [id]: value.value }), {})

    onSave(payload)
  }

  const options = {
    instructorList: instructors,
    moduleList: modules
  }

  return (
    <Form
      schema={schema}
      object={instructor}
      isLoading={isLoading}
      onChange={handleChange}
      values={values}
      min={min}
      max={max}
      onSubmit={handleSubmit}
      onClose={onClose}
      options={options}
    />
  )
}

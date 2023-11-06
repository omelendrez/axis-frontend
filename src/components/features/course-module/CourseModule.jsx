import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '@/components'

import useCourseModules from '@/hooks/useCourseModules'

import schema from './schema.json'
import { loadSchema } from '@/helpers'

export const CourseModule = ({ courseModule }) => {
  const { courseModules, add, modify } = useCourseModules()
  const { isLoading, isSuccess } = courseModules

  const initialValues = loadSchema(schema)

  const [values, setValues] = useState(initialValues)
  const navigate = useNavigate()

  useEffect(() => {
    if (courseModule) {
      Object.entries(courseModule).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [courseModule])

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

  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = Object.entries(values)
      .filter((id) => id !== 'id')
      .reduce((acc, [id, value]) => ({ ...acc, [id]: value.value }), {})

    if (courseModule?.id) {
      modify(courseModule.id, payload)
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
      object={courseModule}
      isLoading={isLoading}
      onChange={handleChange}
      values={values}
      onSubmit={handleSubmit}
      onClose={handleFormCancel}
    />
  )
}

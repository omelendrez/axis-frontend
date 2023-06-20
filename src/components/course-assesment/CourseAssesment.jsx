import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '@/components'

import useCourseAssesments from '@/hooks/useCourseAssesments'

import schema from './schema.json'
import { loadSchema } from '@/helpers'

export const CourseAssesment = ({ courseAssesment }) => {
  const { courseAssesments, add, modify } = useCourseAssesments()
  const { isLoading, isSuccess } = courseAssesments

  const initialValues = loadSchema(schema)

  const [values, setValues] = useState(initialValues)
  const navigate = useNavigate()

  useEffect(() => {
    if (courseAssesment) {
      Object.entries(courseAssesment).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [courseAssesment])

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

    if (courseAssesment?.id) {
      modify(courseAssesment.id, payload)
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
      object={courseAssesment}
      isLoading={isLoading}
      onChange={handleChange}
      values={values}
      onSave={handleSave}
      onClose={handleFormCancel}
    />
  )
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '@/components'

import useCourseAssessments from '@/hooks/useCourseAssessments'

import schema from './schema.json'
import { loadSchema } from '@/helpers'

export const CourseAssessment = ({ courseAssessment }) => {
  const { courseAssessments, add, modify } = useCourseAssessments()
  const { isLoading, isSuccess } = courseAssessments

  const initialValues = loadSchema(schema)

  const [values, setValues] = useState(initialValues)
  const navigate = useNavigate()

  useEffect(() => {
    if (courseAssessment) {
      Object.entries(courseAssessment).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [courseAssessment])

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

    if (courseAssessment?.id) {
      modify(courseAssessment.id, payload)
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
      object={courseAssessment}
      isLoading={isLoading}
      onChange={handleChange}
      values={values}
      onSave={handleSave}
      onClose={handleFormCancel}
    />
  )
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '../shared'

import useCourseItems from '../../hooks/useCourseItems'

import schema from './schema.json'
import { loadSchema } from '../../helpers'

export const CourseItem = ({ courseItem }) => {
  const { courseItems, add, modify } = useCourseItems()
  const { isLoading, isSuccess } = courseItems

  const initialValues = loadSchema(schema)

  const [values, setValues] = useState(initialValues)
  const navigate = useNavigate()

  useEffect(() => {
    if (courseItem) {
      Object.entries(courseItem).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [courseItem])

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

    if (courseItem?.id) {
      modify(courseItem.id, payload)
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
      object={courseItem}
      isLoading={isLoading}
      onChange={handleChange}
      values={values}
      onSave={handleSave}
      onClose={handleFormCancel}
    />
  )
}

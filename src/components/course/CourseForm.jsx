import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '../shared'

import useCourses from '../../hooks/useCourses'
import useCertificateTypes from '../../hooks/useCertificateTypes'

import schema from './schema.json'
import { loadSchema } from '../../helpers'

export const CourseForm = ({ course }) => {
  const { courses, add, modify } = useCourses()
  const { isLoading, isSuccess } = courses

  const { certificateTypes, load: loadCertificateTypes } = useCertificateTypes()
  const { data: typesList } = certificateTypes

  const initialValues = loadSchema(schema)

  const [values, setValues] = useState(initialValues)
  const navigate = useNavigate()

  useEffect(() => {
    loadCertificateTypes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (course) {
      Object.entries(course).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [course])

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

    if (course?.id) {
      modify(course.id, payload)
    } else {
      add(payload)
    }
  }

  const handleFormCancel = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  const options = {
    typesList: typesList
  }

  return (
    <Form
      schema={schema}
      object={course}
      isLoading={isLoading}
      onChange={handleChange}
      values={values}
      onSave={handleSave}
      onClose={handleFormCancel}
      options={options}
    />
  )
}

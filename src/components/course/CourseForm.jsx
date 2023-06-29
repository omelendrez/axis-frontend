import { useEffect, useState } from 'react'

import { Form } from '@/components'

import useCourses from '@/hooks/useCourses'
import useCertificateTypes from '@/hooks/useCertificateTypes'
import useNotification from '@/hooks/useNotification'

import { expiryType as expiryList } from '@/static-lists'

import schema from './schema.json'
import { loadSchema } from '@/helpers'

export const CourseForm = ({ course, onClose }) => {
  const { courses, add, modify } = useCourses()
  const { isLoading, isSuccess } = courses

  const { certificateTypes, load: loadCertificateTypes } = useCertificateTypes()
  const { data: typesList } = certificateTypes

  const { set } = useNotification()

  const initialValues = loadSchema(schema)

  const [values, setValues] = useState(initialValues)

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

  const options = {
    typesList,
    expiryList
  }

  return (
    <Form
      schema={schema}
      object={course}
      isLoading={isLoading}
      onChange={handleChange}
      values={values}
      onSave={handleSave}
      onClose={onClose}
      options={options}
    />
  )
}

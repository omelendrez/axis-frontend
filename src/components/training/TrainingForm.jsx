import { useEffect, useState } from 'react'

import { Form } from '../shared'

import useTrainings from '../../hooks/useTrainings'
import useCourses from '../../hooks/useCourses'
import useNoficication from '../../hooks/useNotification'

import schema from './schema.json'
import { loadSchema } from '../../helpers'

export const TrainingForm = ({ training, onClose }) => {
  const { trainings, add, modify } = useTrainings()
  const { isLoading, isSuccess } = trainings

  const { set } = useNoficication()

  const { courses, load: loadCourses } = useCourses()
  const { data: courseList } = courses

  const initialValues = loadSchema(schema)

  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    if (training) {
      Object.entries(training).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [training])

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

  useEffect(() => {
    loadCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

    if (training?.id) {
      modify(training.id, payload)
    } else {
      add(payload)
    }
  }

  const options = {
    courseList: courseList.rows
  }

  return (
    <Form
      schema={schema}
      object={training}
      isLoading={isLoading}
      onChange={handleChange}
      values={values}
      options={options}
      onSave={handleSave}
      onClose={onClose}
    />
  )
}

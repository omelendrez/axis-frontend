import { useEffect, useState } from 'react'

import { Form } from '@/components'

import useTrainings from '@/hooks/useTrainings'
import useCourses from '@/hooks/useCourses'
import useUsers from '@/hooks/useUsers'
import useNotification from '@/hooks/useNotification'

import schema from './schema.json'
import { ROLES, loadSchema } from '@/helpers'

const MANUAL_INPUT = 2

export const TrainingForm = ({ training, onClose }) => {
  const { trainings, add, modify } = useTrainings()
  const { isLoading, isSuccess } = trainings

  const { set } = useNotification()

  const { courses, load: loadCourses } = useCourses()
  const { data: courseList } = courses

  const { users, load: loadUsers } = useUsers()
  const { data: userList } = users

  const initialValues = loadSchema(schema)

  const [filteredSchema, setFilteredSchema] = useState([])

  const [instructors, setInstructors] = useState([])

  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    if (training) {
      setFields(training.course)
      Object.entries(training).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setFilteredSchema(schema.filter((f) => f.id !== 'prev_expiry'))
    loadCourses()
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const instructors = userList.rows
      .filter((u) => u.roles.includes(ROLES.ASSESSMENT))
      .map((u) => ({ id: u.id, name: u.full_name }))
    setInstructors(instructors)
  }, [userList])

  const setFields = (course) => {
    const option = options.courseList.find((o) => o.id === parseInt(course))

    const filteredSchema = schema.filter(
      (s) =>
        (s.id === 'prev_expiry' && option?.expiry_type === MANUAL_INPUT) ||
        s.id !== 'prev_expiry'
    )
    setFilteredSchema(filteredSchema)
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    const data = { value, error: '' }
    if (id === 'course') {
      setFields(value)
    }
    setValues((values) => ({ ...values, [id]: data }))
  }

  const handleSubmit = (e) => {
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
    courseList: courseList.rows,
    instructors
  }

  return (
    <Form
      schema={filteredSchema}
      object={training}
      isLoading={isLoading}
      onChange={handleChange}
      values={values}
      options={options}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  )
}

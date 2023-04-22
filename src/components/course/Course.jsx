import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputField, FormButtonRow, SaveButton, CancelButton } from '../shared'

import useCourses from '../../hooks/useCourses'

const initialValues = {
  code: {
    value: '',
    error: ''
  },
  name: {
    value: '',
    error: ''
  }
}

export const Course = ({ course }) => {
  const { courses, add, modify } = useCourses()
  const { isLoading, isSuccess } = courses

  const [values, setValues] = useState(initialValues)
  const navigate = useNavigate()
  const formRef = useRef()

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
      navigate('/courses')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleChange = (e) => {
    const { id, value } = e.target
    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))
  }

  const handleFormSubmit = (e) => {
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

  const handleSave = (e) => {
    e.preventDefault()
    formRef.current.submit()
  }

  const handleFormCancel = (e) => {
    e.preventDefault()
    navigate('/courses')
  }

  return (
    <form onSubmit={handleFormSubmit} ref={formRef}>
      <InputField
        type="text"
        id="code"
        label="Code"
        placeholder="Enter code"
        value={values.code.value}
        onChange={handleChange}
        required
      />

      <InputField
        type="text"
        id="name"
        label="Name"
        placeholder="Enter name"
        value={values.name.value}
        onChange={handleChange}
        required
      />

      <FormButtonRow>
        <SaveButton isSubmitting={isLoading} onSave={handleSave} />

        <CancelButton isSubmitting={isLoading} onCancel={handleFormCancel} />
      </FormButtonRow>
    </form>
  )
}

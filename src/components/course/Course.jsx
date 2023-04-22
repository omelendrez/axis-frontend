import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  InputField,
  FormButtonRow,
  SaveButton,
  CancelButton,
  Switch
} from '../shared'

import useCourses from '../../hooks/useCourses'

const initialValues = {
  code: {
    value: '',
    error: ''
  },
  name: {
    value: '',
    error: ''
  },
  duration: {
    value: 0,
    error: ''
  },
  validity: {
    value: 0,
    error: ''
  },
  back_id: {
    value: '',
    error: ''
  },
  front_id: {
    value: '',
    error: ''
  },
  id_card: {
    value: '',
    error: false
  },
  cert_id_card: {
    value: '',
    error: false
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

  const handleSwitchChange = (e) => {
    const { id, checked } = e.target
    const data = { checked: checked ? 1 : 0, error: '' }
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

      <InputField
        type="number"
        id="duration"
        label="Course duration"
        placeholder="Enter course duration"
        value={values.duration.value}
        onChange={handleChange}
        required
      />

      <InputField
        type="number"
        id="validity"
        label="Course validity"
        placeholder="Enter course validity"
        value={values.validity.value}
        onChange={handleChange}
        required
      />

      <InputField
        type="text"
        id="front_id"
        label="ID card front text"
        placeholder="Enter ID card front text"
        value={values.front_id.value}
        onChange={handleChange}
        required
      />

      <InputField
        type="text"
        id="back_id"
        label="ID card back text"
        placeholder="Enter ID card back text"
        value={values.back_id.value}
        onChange={handleChange}
        required
      />

      <Switch
        id="id_card"
        label="Course with ID card?"
        checked={values.id_card.value}
        onChange={handleSwitchChange}
      />

      <Switch
        id="cert_id_card"
        label="Certificate with ID card?"
        checked={values.cert_id_card.value}
        onChange={handleSwitchChange}
      />

      <FormButtonRow>
        <SaveButton isSubmitting={isLoading} onSave={handleSave} />

        <CancelButton isSubmitting={isLoading} onCancel={handleFormCancel} />
      </FormButtonRow>
    </form>
  )
}

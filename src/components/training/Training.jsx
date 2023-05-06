import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  InputField,
  FormButtonRow,
  SaveButton,
  CancelButton,
  DropdownSearch
} from '../shared'

import useTrainings from '../../hooks/useTrainings'
import useCourses from '../../hooks/useCourses'

import initialValues from './model-default.json'

export const Training = ({ training }) => {
  const { trainings, add, modify } = useTrainings()
  const { isLoading, isSuccess } = trainings

  const { courses, load: loadCourses } = useCourses()
  const { data: coursesResponse } = courses

  const { count: coursesCount, rows: coursesList } = coursesResponse

  const [values, setValues] = useState(initialValues)
  const navigate = useNavigate()
  const formRef = useRef()

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
      navigate(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  useEffect(() => {
    if (!coursesCount) {
      loadCourses()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursesResponse])

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

    if (training?.id) {
      modify(training.id, payload)
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
    navigate(-1)
  }

  return (
    <form onSubmit={handleFormSubmit} ref={formRef}>
      <DropdownSearch
        id="course"
        label="Course"
        value={values.course.value}
        onChange={handleChange}
        options={coursesList}
        required
      />

      <InputField
        type="date"
        id="start"
        label="Start"
        placeholder="Enter start day"
        value={values.start.value}
        onChange={handleChange}
        required
      />

      <InputField
        type="date"
        id="expiry"
        label="Expiry"
        placeholder="Enter expiry date"
        value={values.expiry.value}
        onChange={handleChange}
      />

      <InputField
        type="text"
        id="certificate"
        label="Certificate #"
        placeholder="Enter certificate number"
        value={values.certificate.value}
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

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputField, FormButtonRow, SaveButton, CancelButton } from '../shared'

import useCourseItems from '../../hooks/useCourseItems'

const initialValues = {
  name: {
    value: '',
    error: ''
  }
}

export const CourseItem = ({ courseItem }) => {
  const { courseItems, add, modify } = useCourseItems()
  const { isLoading, isSuccess } = courseItems

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
    navigate('/course-items')
  }

  return (
    <form>
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

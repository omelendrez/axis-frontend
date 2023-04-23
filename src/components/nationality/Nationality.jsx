import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputField, FormButtonRow, SaveButton, CancelButton } from '../shared'

import useNationalities from '../../hooks/useNationalities'

const initialValues = {
  code: {
    value: '',
    error: ''
  },
  country: {
    value: '',
    error: ''
  },
  nationality: {
    value: '',
    error: ''
  }
}

export const Nationality = ({ nationality }) => {
  const { nationalities, add, modify } = useNationalities()
  const { isLoading, isSuccess } = nationalities

  const [values, setValues] = useState(initialValues)
  const navigate = useNavigate()
  const formRef = useRef()

  useEffect(() => {
    if (nationality) {
      Object.entries(nationality).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nationality])

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

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const payload = Object.entries(values)
      .filter((id) => id !== 'id')
      .reduce((acc, [id, value]) => ({ ...acc, [id]: value.value }), {})

    if (nationality?.id) {
      modify(nationality.id, payload)
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
    <>
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
          id="country"
          label="Country"
          placeholder="Enter country"
          value={values.country.value}
          onChange={handleChange}
          required
        />
        <InputField
          type="text"
          id="nationality"
          label="Nationality"
          placeholder="Enter nationality"
          value={values.nationality.value}
          onChange={handleChange}
          required
        />

        <FormButtonRow>
          <SaveButton isSubmitting={isLoading} onSave={handleSave} />

          <CancelButton isSubmitting={isLoading} onCancel={handleFormCancel} />
        </FormButtonRow>
      </form>
    </>
  )
}

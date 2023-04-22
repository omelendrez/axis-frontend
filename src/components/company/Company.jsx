import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputField, FormButtonRow, SaveButton, CancelButton } from '../shared'

import useCompanies from '../../hooks/useCompanies'

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

export const Company = ({ company }) => {
  const { companies, add, modify } = useCompanies()
  const { isLoading, isSuccess } = companies

  const [values, setValues] = useState(initialValues)
  const navigate = useNavigate()
  const formRef = useRef()

  useEffect(() => {
    if (company) {
      Object.entries(company).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [company])

  useEffect(() => {
    if (isSuccess) {
      navigate('/companies')
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

    if (company?.id) {
      modify(company.id, payload)
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
    navigate('/companies')
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

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '@/components'
import useCompanies from '@/hooks/useCompanies'
import { loadSchema } from '@/helpers'
import { status as statusList } from '@/static-lists'

import schema from './schema.json'

export const Company = ({ company }) => {
  const { companies, add, modify } = useCompanies()
  const { isLoading, isSuccess } = companies

  const initialValues = loadSchema(schema)

  const [values, setValues] = useState(initialValues)
  const navigate = useNavigate()

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
      navigate(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleChange = (e) => {
    const { id, value } = e.target
    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))
  }

  const handleSubmit = (e) => {
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

  const handleFormCancel = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  const options = {
    statusList
  }

  return (
    <Form
      schema={schema}
      object={company}
      isLoading={isLoading}
      onChange={handleChange}
      values={values}
      onSubmit={handleSubmit}
      onClose={handleFormCancel}
      options={options}
    />
  )
}

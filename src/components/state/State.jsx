import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputField, FormButtonRow, SaveButton, CancelButton } from '../shared'

import useStates from '../../hooks/useStates'

const initialValues = {
  name: {
    value: '',
    error: ''
  }
}

export const State = ({ state }) => {
  const { states, add, modify } = useStates()
  const { isLoading, isSuccess } = states

  const [values, setValues] = useState(initialValues)
  const navigate = useNavigate()
  const formRef = useRef()

  useEffect(() => {
    if (state) {
      Object.entries(state).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [state])

  useEffect(() => {
    if (isSuccess) {
      navigate('/states')
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

    if (state?.id) {
      modify(state.id, payload)
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
    navigate('/states')
  }

  return (
    <>
      <form onSubmit={handleFormSubmit} ref={formRef}>
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
    </>
  )
}

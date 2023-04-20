import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputField, FormButtonRow, SaveButton, CancelButton } from '../shared'
import { createRole, updateRole } from '../../services'
import useNotification from '../../hooks/useNotification'

const initialValues = {
  name: {
    value: '',
    error: ''
  }
}

export const Role = ({ role }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [values, setValues] = useState(initialValues)
  const { set } = useNotification()
  const isMounted = useRef(true)
  const navigate = useNavigate()
  const formRef = useRef()

  useEffect(() => {
    if (role) {
      Object.entries(role).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [role])

  const handleChange = (e) => {
    const { id, value } = e.target
    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))
  }

  const handleApiSuccess = (message) => {
    isMounted.current = false
    const notification = { type: 'success', message }
    set(notification)
    navigate('/roles')
  }

  const handleApiError = (e) => {
    const message =
      e.code === 'ERR_BAD_REQUEST'
        ? 'Some fields have wrong information. Please double-check and try again.'
        : e.message
    const notification = {
      type: 'error',
      message
    }
    set(notification)
  }

  const handleFinally = () => {
    if (isMounted.current) {
      setIsSubmitting(false)
    }
  }

  const create = (payload) => {
    createRole(payload)
      .then((res) => {
        handleApiSuccess('Role added successfully!')
      })
      .catch((e) => {
        handleApiError(e)
      })
      .finally(() => {
        handleFinally()
      })
  }

  const update = (payload) => {
    updateRole(role.id, payload)
      .then((res) => {
        handleApiSuccess('Role saved successfully')
      })
      .catch((e) => {
        handleApiError(e)
      })
      .finally(() => {
        handleFinally()
      })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const payload = Object.entries(values)
      .filter((id) => id !== 'id')
      .reduce((acc, [id, value]) => ({ ...acc, [id]: value.value }), {})

    if (role?.id) {
      update(payload)
    } else {
      create(payload)
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    formRef.current.submit()
  }

  const handleFormCancel = (e) => {
    e.preventDefault()
    navigate('/roles')
  }

  return (
    <form onSubmit={handleFormSubmit} ref={formRef}>
      <InputField
        type="text"
        id="name"
        label="Role"
        placeholder="Enter name"
        value={values.name.value}
        onChange={handleChange}
        required
      />

      <FormButtonRow>
        <SaveButton isSubmitting={isSubmitting} onSave={handleSave} />

        <CancelButton isSubmitting={isSubmitting} onCancel={handleFormCancel} />
      </FormButtonRow>
    </form>
  )
}

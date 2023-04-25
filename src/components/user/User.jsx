import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  InputField,
  Confirm,
  FormButtonRow,
  Dropdown,
  SaveButton,
  CancelButton
} from '../shared'
import useUsers from '../../hooks/useUsers.js'
import useRoles from '../../hooks/useRoles'
import { status as statusList } from '../../static-data'

const initialValues = {
  name: {
    value: '',
    error: ''
  },
  full_name: {
    value: '',
    error: ''
  },
  email: {
    value: '',
    error: ''
  },
  role: {
    value: '',
    error: ''
  },
  status: {
    value: '1',
    error: ''
  }
}

export const User = ({ user }) => {
  const { users, add, modify } = useUsers()
  const { isLoading, isSuccess } = users

  const { roles, load: loadRoles } = useRoles()
  const { data: rolesList } = roles

  const [values, setValues] = useState(initialValues)
  const [confirmMessage, setConfirmMessage] = useState('')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [tempValue, setTempValue] = useState(null)
  const navigate = useNavigate()
  const formRef = useRef()

  useEffect(() => {
    if (!rolesList.count) {
      loadRoles({ search: '' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user) {
      Object.entries(user).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [user])

  useEffect(() => {
    if (isSuccess) {
      navigate(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleChange = (e) => {
    const { id, value } = e.target
    if (id === 'status') {
      setTempValue({ id, value, prev: user?.status })
      setConfirmMessage('Are you sure you want to change user status?')
      return setIsConfirmOpen(true)
    }
    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    const { id, value } = tempValue
    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))
    setIsConfirmOpen(false)
  }

  const handleCancel = (e) => {
    e.preventDefault()

    const { id, prev } = tempValue
    const value = prev
    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))

    setTempValue(null)
    setIsConfirmOpen(false)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const payload = Object.entries(values)
      .filter((id) => id !== 'id')
      .reduce((acc, [id, value]) => ({ ...acc, [id]: value.value }), {})

    if (user?.id) {
      modify(user.id, payload)
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
      <Confirm
        open={isConfirmOpen}
        onCofirm={handleConfirm}
        onCancel={handleCancel}
        message={confirmMessage}
      />

      <form onSubmit={handleFormSubmit} ref={formRef}>
        <InputField
          type="username"
          id="name"
          label="Username"
          placeholder="Enter name"
          value={values.name.value}
          onChange={handleChange}
          required
          autoCapitalize="off"
        />

        <InputField
          type="text"
          id="full_name"
          label="Full name"
          placeholder="Enter full name"
          value={values.full_name.value}
          onChange={handleChange}
          required
        />

        <InputField
          type="email"
          id="email"
          label="Email"
          placeholder="Enter email"
          value={values.email.value}
          onChange={handleChange}
          required
          autoCapitalize="off"
        />

        <Dropdown
          id="role"
          label="Role"
          onChange={handleChange}
          value={values.role.value}
          options={rolesList}
        />
        {user?.id && (
          <Dropdown
            id="status"
            label="Status"
            onChange={handleChange}
            value={values.status.value}
            options={statusList}
          />
        )}

        <FormButtonRow>
          <SaveButton isSubmitting={isLoading} onSave={handleSave} />

          <CancelButton isSubmitting={isLoading} onCancel={handleFormCancel} />
        </FormButtonRow>
      </form>
    </>
  )
}

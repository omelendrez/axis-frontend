import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InputField, Confirm } from "../shared"
import { updateUser } from "../../services"
import useNoficication from "../../hooks/useNotification"

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
    value: '',
    error: ''
  },
}

const statusList = [
  { id: 1, name: 'Active' },
  { id: 0, name: 'Inactive' }
]

export const User = ({ user }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [values, setValues] = useState(initialValues)
  const [confirmMessage, setConfirmMessage] = useState('')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [tempValue, setTempValue] = useState(null)
  const { set } = useNoficication()
  const isMounted = useRef(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      Object.entries(user).map((f) => {
        const [id, value] = f
        const data = { value, error: '' }
        setValues(values => ({ ...values, [id]: data }))
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { id, value } = e.target
    if (id === 'status') {
      setTempValue({ id, value, prev: user.status })
      setConfirmMessage('Are you sure you want to change user status?')
      return setIsConfirmOpen(true)
    }
    const data = { value, error: '' }
    setValues(values => ({ ...values, [id]: data }))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    const { id, value } = tempValue
    const data = { value, error: '' }
    setValues(values => ({ ...values, [id]: data }))
    setIsConfirmOpen(false)
  }

  const handleCancel = (e) => {
    e.preventDefault()

    const { id, prev } = tempValue
    const value = prev
    const data = { value, error: '' }
    setValues(values => ({ ...values, [id]: data }))

    setTempValue(null)
    setIsConfirmOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const payload = Object.entries(values)
      .filter((id) => id !== 'id')
      .reduce((acc, [id, value]) => ({ ...acc, [id]: value.value }), {})

    updateUser(user.id, payload)
      .then((res) => {
        isMounted.current = false
        const notification = {
          type: 'success',
          message: 'User updated!'
        }
        set(notification)
        navigate('/users')
      })
      .catch((e) => {
        const message = e.code === "ERR_BAD_REQUEST"
          ? 'You have entered an invalid credentials. Please double-check and try again.'
          : e.message

        const notification = {
          type: 'error',
          message
        }

        set(notification)

      })
      .finally(() => {
        if (isMounted.current) {
          setIsSubmitting(false)
        }
      })

  }

  const { name, full_name, email, role } = values

  return (
    <>

      <Confirm
        open={isConfirmOpen}
        onCofirm={handleConfirm}
        onCancel={handleCancel}
        message={confirmMessage}
      />

      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          id="name"
          label="Username"
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
        />

        <InputField
          type="text"
          id="full_name"
          label="Full name"
          placeholder="Enter full name"
          value={full_name}
          onChange={handleChange}
        />

        <InputField
          type="text"
          id="email"
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
        />

        <InputField
          type="text"
          id="role"
          label="Role"
          placeholder="Enter role"
          value={role}
          onChange={handleChange}
        />

        <select id="status" onChange={handleChange} value={values.status.value}>
          {statusList.map((s) =>
            <option
              key={s.id}
              value={s.id}
            >
              {s.name}
            </option>
          )}
        </select>
        <button type="submit" aria-busy={isSubmitting}>
          Save changes
        </button>

      </form >
    </>

  )
}

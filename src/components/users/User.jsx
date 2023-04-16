import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InputField } from "../shared"
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

export const User = ({ user }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [values, setValues] = useState(initialValues)
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
    const data = { value, error: '' }
    setValues(values => ({ ...values, [id]: data }))
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

  const { id, name, full_name, email, role, status } = values

  return (
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

      <InputField
        type="text"
        id="status"
        label="Status"
        placeholder="Enter status"
        value={status}
        onChange={handleChange}
      />

      <button type="submit" aria-busy={isSubmitting}        >
        Change
      </button>

    </form>
  )
}

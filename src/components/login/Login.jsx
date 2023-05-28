import { useRef, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useNoficication from '../../hooks/useNotification'
import { FormButtonRow, InputField } from '../shared'
import { login, SP, KEYS } from '../../services'
import { UserContext } from '../../context'
import useApiMessages from '../../hooks/useApiMessages'
import './login.css'

const initialValues = {
  name: {
    value: '',
    error: ''
  },
  password: {
    value: '',
    error: ''
  }
}

export const Login = () => {
  const { set } = useNoficication()
  const { apiMessage } = useApiMessages()
  const { setUser: setUserContext } = useContext(UserContext)
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isMounted = useRef()

  useEffect(() => {
    const input = document.getElementsByTagName('input')[1]
    input.focus()
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target
    const data = {
      value,
      error: ''
    }
    setValues((values) => ({ ...values, [id]: data }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const session = new SP()

    const payload = {
      name: values.name.value,
      password: values.password.value
    }

    setIsSubmitting(true)

    login(payload)
      .then((res) => {
        const notification = {
          type: 'success',
          message: 'Welcome'
        }
        set(notification)
        const token = res.data.token
        session.save(KEYS.token, token)
        const user = { ...res.data, token: undefined }
        session.save(KEYS.user, user)
        isMounted.current = false
        setUserContext(res.data)
        navigate('/')
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const { name, password } = values

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <InputField
        type="text"
        id="name"
        label="Username"
        placeholder="Enter name"
        value={name.value}
        onChange={handleChange}
        autoCapitalize="off"
        required
      />

      <InputField
        type="password"
        id="password"
        label="Password"
        placeholder="Enter password"
        value={password.value}
        onChange={handleChange}
        autoCapitalize="off"
        required
      />

      <FormButtonRow>
        <button type="submit" aria-busy={isSubmitting}>
          Login
        </button>
        <button
          type="button"
          // aria-busy={isSubmitting}
          className="secondary"
          disabled
        >
          Register
        </button>
      </FormButtonRow>
    </form>
  )
}

import { useRef, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useNoficication from '../../hooks/useNotification'
import { FormButtonRow, InputField } from '../shared'
import { login, SP, KEYS } from '../../services'
import { UserContext } from '../../context'
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
  const { setUser: setUserContext } = useContext(UserContext)
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isMounted = useRef()

  useEffect(() => {
    document.getElementsByTagName('input')[0].focus()
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
      .catch((e) => {
        console.error(e)
        const notification = {
          type: 'error',
          message: e.response.data.message || e.message
        }
        set(notification)
        setIsSubmitting(false)
      })
      .finally(() => {
        if (isMounted.current) {
          setIsSubmitting(false)
        }
      })
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

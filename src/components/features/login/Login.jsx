import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useNotification from '@/hooks/useNotification'
import { FormButtonRow, InputField } from '@/components'
import { login, SP, KEYS } from '@/services'
import { UserContext } from '@/context'
import useApiMessages from '@/hooks/useApiMessages'
import { loadSchema } from '@/helpers'
import schema from './schema.json'

import './login.css'

export const Login = () => {
  const { set } = useNotification()
  const { apiMessage } = useApiMessages()
  const { setUser: setUserContext } = useContext(UserContext)
  const initialValues = loadSchema(schema)

  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldType, setFieldType] = useState('password')

  useEffect(() => {
    const input = document.getElementsByTagName('input')[0]
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
      .then(async (res) => {
        const token = res.data.token
        const user = {
          ...res.data,
          token: undefined,
          roles: await JSON.parse(res.data.roles)
        }
        session.save(KEYS.token, token)
        session.save(KEYS.user, user)

        setUserContext(user)
        if (user.roles.includes(1) || user.roles.includes(2)) {
          navigate('/')
        } else {
          navigate('/')
        }
        const notification = {
          type: 'success',
          message: 'Welcome'
        }
        set(notification)
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const { name, password } = values

  const handleFieldTypeToggle = (e) => {
    e.preventDefault()
    setFieldType((s) => (s === 'text' ? 'password' : 'text'))
  }

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
        onPasswordToggle={handleFieldTypeToggle}
        password={fieldType}
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

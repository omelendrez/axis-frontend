import { useRef, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import useNoficication from "../../hooks/useNotification"
import { validateUserName, validateNotEmpty, validatePasswordLength } from "../../helpers"
import { InputField } from "../shared"
import { login, SP, KEYS } from "../../services"
import { UserContext } from "../../context"

const initialValues = {
  name: {
    value: '',
    error: ''
  },
  password: {
    value: '',
    error: ''
  },
}

export const Login = () => {
  const { set } = useNoficication()
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const errorsCount = useRef(0)
  const isMounted = useRef(true)

  const handleChange = (e) => {
    const { id, value } = e.target
    const data = {
      value,
      error: ''
    }
    setValues(values => ({ ...values, [id]: data }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const session = new SP()
    errorsCount.current = 0
    validatePasswordLength(['password'], 5, setValues, values, errorsCount)
    validateUserName(['name'], setValues, values, errorsCount)
    validateNotEmpty(['name', 'password'], setValues, values, errorsCount)

    if (!errorsCount.current) {
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
          setUser(res.data)
          navigate('/')
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
  }

  const { name, password } = values

  return (
    <form onSubmit={handleSubmit}>

      <InputField
        type="text"
        id="name"
        label="Username"
        placeholder="Enter name"
        value={name}
        onChange={handleChange}
        autoCapitalize="off"
        required
      />

      <InputField
        type="password"
        id="password"
        label="Password"
        placeholder="Enter password"
        value={password}
        onChange={handleChange}
        autoCapitalize="off"
        required
      />

      <button type="submit" aria-busy={isSubmitting}        >
        Login
      </button>

    </form>
  )
}

import { useRef, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { validateUserName, validateNotEmpty, validatePasswordLength } from "../../helpers"
import { InputField, Modal } from "../shared"
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
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorModalMessage, setErrorModalMessage] = useState(false)
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
            ? 'You have entered an invalid username or password. Please double-check and try again.'
            : e.message

          setErrorModalMessage(message)
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
    <article>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <InputField
          type="text"
          id="name"
          label="Email"
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
        />

        <InputField
          type="password"
          id="password"
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={handleChange}
        />

        <button type="submit" aria-busy={isSubmitting}        >
          Login
        </button>


      </form>

      <Modal
        open={!!errorModalMessage}
        title="Wrong credentials!"
        type="error"
        message={errorModalMessage}
        toggle={setErrorModalMessage}
        label="Try again"
      />
    </article>
  )
}

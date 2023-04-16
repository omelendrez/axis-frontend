import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InputField, Modal } from "../shared"
import { validatePasswordLength, validateNotEmpty, validateConfirmPassword } from "../../helpers"
import { changePassword } from "../../services"
import { UserContext } from "../../context"

const initialValues = {
  prevPass: {
    value: '',
    error: ''
  },
  password: {
    value: '',
    error: ''
  },
  verPass: {
    value: '',
    error: ''
  },
}

export const ChangePassword = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
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
    isMounted.current = true
    validateNotEmpty(['prevPass', 'password', 'verPass'], setValues, values, errorsCount)
    validatePasswordLength(['password'], 5, setValues, values, errorsCount)
    validateConfirmPassword(['verPass'], setValues, values, errorsCount)

    if (!errorsCount.current) {
      const payload = {
        prevPass: values.prevPass.value,
        password: values.password.value
      }

      setIsSubmitting(true)

      changePassword(user.id, payload)
        .then((res) => {
          navigate('/')
        })
        .catch((e) => {
          console.log(e)
          setErrorModalMessage(e.response?.data?.message
            || 'An error has ocurred while trying to change the passowrd. Please try again later')
        })
        .finally(() => {
          if (isMounted.current) {
            setIsSubmitting(false)
          }
        })
    }
  }

  const { prevPass, password, verPass } = values

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          id="prevPass"
          label="Current password"
          placeholder="Enter your current password"
          value={prevPass}
          onChange={handleChange}
        />

        <InputField
          type="text"
          id="password"
          label="New password"
          placeholder="Enter the new password"
          value={password}
          onChange={handleChange}
        />

        <InputField
          type="text"
          id="verPass"
          label="Retype password"
          placeholder="Retype the new password"
          value={verPass}
          onChange={handleChange}
        />

        <button type="submit" aria-busy={isSubmitting}        >
          Change
        </button>

      </form>
      <Modal
        open={!!errorModalMessage}
        title="Error"
        type="error"
        message={errorModalMessage}
        toggle={setErrorModalMessage}
        label="Try again"
      />
    </>
  )
}

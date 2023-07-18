import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useNotification from '@/hooks/useNotification'
import useApiMessages from '@/hooks/useApiMessages'
import { FormButtonRow, InputField } from '@/components'
import {
  validatePasswordLength,
  validateNotEmpty,
  validateConfirmPassword
} from '@/helpers'
import { changePassword } from '@/services'
import { UserContext } from '@/context'
import './changePassword.css'

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
  }
}

export const ChangePassword = () => {
  const { set } = useNotification()
  const { apiMessage } = useApiMessages()
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [values, setValues] = useState(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const errorsCount = useRef(0)
  const isMounted = useRef(true)

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
    errorsCount.current = 0
    isMounted.current = true
    validateNotEmpty(
      ['prevPass', 'password', 'verPass'],
      setValues,
      values,
      errorsCount
    )
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
          const notification = {
            type: 'success',
            message: 'Password successfully changed!'
          }
          set(notification)

          navigate(-1)
        })
        .catch((e) => apiMessage(e))
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  const { prevPass, password, verPass } = values

  return (
    <form onSubmit={handleSubmit} className="change-password-form">
      <InputField
        type="text"
        id="prevPass"
        label="Current password"
        placeholder="Enter your current password"
        value={prevPass.value}
        onChange={handleChange}
        autoCapitalize="off"
        required
      />

      <InputField
        type="text"
        id="password"
        label="New password"
        placeholder="Enter the new password"
        value={password.value}
        onChange={handleChange}
        autoCapitalize="off"
        required
      />

      <InputField
        type="text"
        id="verPass"
        label="Retype password"
        placeholder="Retype the new password"
        value={verPass.value}
        onChange={handleChange}
        autoCapitalize="off"
        required
      />

      <FormButtonRow>
        <button type="submit" aria-busy={isSubmitting}>
          Change
        </button>
        <button
          type="button"
          aria-busy={isSubmitting}
          className="secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </FormButtonRow>
    </form>
  )
}

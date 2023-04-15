export const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export const isValidUsername = (userName) => {
  return String(userName)
    .toLowerCase()
    .match(
      /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
    )
}

export const validateNotEmpty = (ids, setValues, values, errorsCount) => {
  const errMessage = 'This fields cannot be empty'
  ids.forEach((id) => {
    const data = values[id]
    if (!data.value) {
      setValues(values => ({ ...values, [id]: { ...data, error: data.error || errMessage } }))
      errorsCount.current++
    }
  })
}

export const validateUserName = (ids, setValues, values, errorsCount) => {
  const errMessage = 'Invalid user name'
  ids.forEach((id) => {
    const data = values[id]
    if (!isValidUsername(data.value)) {
      setValues(values => ({ ...values, [id]: { ...data, error: data.error || errMessage } }))
      errorsCount.current++
    }
  })
}

export const validateEmail = (ids, setValues, values, errorsCount) => {
  const errMessage = 'Invalid email address'
  ids.forEach((id) => {
    const data = values[id]
    if (!isValidEmail(data.value)) {
      setValues(values => ({ ...values, [id]: { ...data, error: data.error || errMessage } }))
      errorsCount.current++
    }
  })
}

export const validatePasswordLength = (ids, minLength, setValues, values, errorsCount) => {
  const errMessage = `Password should be at least ${minLength} characters long`
  ids.forEach((id) => {
    const data = values[id]
    if (data.value.length < minLength) {
      setValues(values => ({ ...values, [id]: { ...data, error: data.error || errMessage } }))
      errorsCount.current++
    }
  })
}

export const validateConfirmPassword = (ids, setValues, values, errorsCount) => {
  const errMessage = 'Passwords do not match'
  ids.forEach((id) => {
    const data = values[id]
    if (data.value !== values['password'].value) {
      setValues(values => ({ ...values, [id]: { ...data, error: data.error || errMessage } }))
      errorsCount.current++
    }
  })
};


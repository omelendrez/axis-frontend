export const loadSchema = (schema) => {
  const initialValues = {}
  schema.forEach(
    (field) => (initialValues[field.id] = { value: '', error: '' })
  )
  return initialValues
}

export const getFieldData = (schema, event) => {
  const { id } = event.target

  let data = {}

  const field = schema.find((f) => f.id === id)

  if (field.type === 'switch') {
    const checked = event.target.checked
    data = { value: checked ? 1 : 0, error: '' }
  } else {
    const value = event.target.value
    data = { value, error: '' }
  }

  return { data, id }
}

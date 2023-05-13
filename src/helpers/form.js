export const loadSchema = (schema) => {
  const initialValues = {}
  schema.forEach(
    (field) => (initialValues[field.id] = { value: '', error: '' })
  )
  return initialValues
}


export const InputField = (props) => {
  const { id, label, type, placeholder, onChange, value } = props
  const inputProps = { id, label, type, placeholder, onChange, value: value.value }
  return (
    <div className={`form-control ${value.error ? 'error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input
        {...inputProps}
        autoCapitalize="off"
        autoCorrect="off"
      />
      <small>{value.error}</small>
    </div>
  )
}

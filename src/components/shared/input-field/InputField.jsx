
export const InputField = (props) => {
  const { id, label, type, placeholder, onChange, value } = props
  return (
    <div className={`form-control ${value.error ? 'error' : ''}`}>
      <label>{label}</label>
      <div>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value.value}
          onChange={onChange}
        />
        <small>{value.error}</small>
      </div>
    </div>
  )
}

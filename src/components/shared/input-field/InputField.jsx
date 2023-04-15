
export const InputField = (props) => {
  const { id, label, type, placeholder, onChange, value } = props
  return (
    <div className={`form-control ${value.error ? 'error' : ''}`}>
      <label>{label}</label>
      <div className="view-password">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value.value}
          onChange={onChange}
        />
        <div>
          <svg
            width="20"
            height="17"
            fill="currentColor"
            className="bi bi-eye-fill"
            viewBox="0 0 16 16"
          >
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
          </svg>

        </div>
      </div>
      <small>{value.error}</small>
    </div>
  )
}

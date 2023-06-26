import './inputField.css'
import './passwordIcon.css'

const PasswordIcon = ({ password, onPasswordToggle }) => (
  <span className="material-icons password-icon" onClick={onPasswordToggle}>
    {password === 'text' ? 'visibility_off' : 'visibility'}
  </span>
)

export const InputField = (props) => {
  const { id, label, value, password, onPasswordToggle } = props

  const inputProps = {
    ...props,
    value: value || '',
    type: password ? password : props.type
  }

  return (
    <div className="form-control">
      <label htmlFor={id}>{label}</label>
      <input {...inputProps} autoCorrect="off" />
      {password?.length && (
        <PasswordIcon password={password} onPasswordToggle={onPasswordToggle} />
      )}
    </div>
  )
}

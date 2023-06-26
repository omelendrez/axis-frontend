import './inputField.css'
import './passwordIcon.css'

const PasswordIcon = ({ password, onPasswordToggle }) => (
  <span
    className="material-icons password-icon"
    onClick={onPasswordToggle || undefined}
  >
    {password === 'text' ? 'visibility_off' : 'visibility'}
  </span>
)

export const InputField = (props) => {
  const { id, label, value, password } = props

  const inputProps = {
    ...props,
    label: undefined,
    value: value || '',
    type: password ? password : props.type
  }

  delete inputProps.password
  delete inputProps.onPasswordToggle

  return (
    <div className="form-control">
      <label htmlFor={id}>{label}</label>
      <input {...inputProps} autoCorrect="off" />
      {props.onPasswordToggle && (
        <PasswordIcon
          password={password}
          onPasswordToggle={props.onPasswordToggle}
        />
      )}
    </div>
  )
}

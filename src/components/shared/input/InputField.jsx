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
  const { id, label, value, password, hideLabel } = props

  const inputProps = {
    ...props,
    label: undefined,
    value: value || '',
    type: password ? password : props.type,
    placeholder: label
  }

  delete inputProps.password
  delete inputProps.onPasswordToggle
  delete inputProps.hideLabel

  return (
    <div className="form-control">
      <label htmlFor={id}>{!hideLabel && label}</label>
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

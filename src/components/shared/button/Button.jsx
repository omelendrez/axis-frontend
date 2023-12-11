import './button.css'

export const Button = ({
  onClick,
  disabled,
  className,
  children,
  ...props
}) => (
  <button
    className={`button ${className || ''}`}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)

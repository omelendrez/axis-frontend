import './button.css'

export const Button = ({
  onClick,
  disabled,
  className,
  children,
  isLoading,
  ...props
}) => (
  <button
    className={`button ${className || ''}`}
    onClick={onClick}
    disabled={disabled}
    aria-busy={isLoading}
    {...props}
  >
    {children}
  </button>
)

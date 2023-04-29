import './button.css'

export const Button = ({ onClick, disabled, className, children }) => (
  <button
    className={`button ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)

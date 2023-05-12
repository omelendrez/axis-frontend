import './actionButton.css'

export const ActionButton = ({
  label,
  onClick,
  disabled,
  className,
  tooltip
}) => (
  <div
    className={`action-button ${className ? className : ''}`}
    onClick={onClick}
    disabled={disabled}
    data-tooltip={tooltip}
  >
    <span className={`material-icons ${className ? className : ''}`}>
      {label}
    </span>
  </div>
)

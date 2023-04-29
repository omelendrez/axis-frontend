import './iconButton.css'

export const IconButton = ({
  onClick,
  disabled,
  className,
  children,
  tooltip
}) => (
  <div
    className={`icon-button ${className}`}
    onClick={onClick}
    disabled={disabled}
    data-tooltip={tooltip}
  >
    <span className="material-icons">{children}</span>
  </div>
)

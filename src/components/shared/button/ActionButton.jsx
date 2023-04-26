import './actionButton.css'

export const ActionButton = ({ label, onClick, disabled, className }) => (
  <div
    className={`action-button ${className ? className : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    <span className={`material-icons ${className ? className : ''}`}>
      {label}
    </span>
  </div>
)

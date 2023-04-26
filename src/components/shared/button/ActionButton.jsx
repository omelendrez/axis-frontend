import './actionButton.css'
export const ActionButton = ({ label, onClick, disabled, className }) => (
  <button
    type="button"
    className={`action-button ${className ? className : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    <span className="material-icons">{label}</span>
  </button>
)

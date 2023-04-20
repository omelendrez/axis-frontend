import "./actionButton.css";
export const ActionButton = ({ label, onClick, disable, className }) => (
  <button
    type="button"
    className={`action-button ${className ? className : ""}`}
    onClick={onClick}
    disabled={disable}
  >
    {label}
  </button>
);
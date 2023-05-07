export const CloseButton = ({ isSubmitting, onClose }) => (
  <button
    type="button"
    className="secondary"
    aria-busy={isSubmitting}
    onClick={onClose}
  >
    <span className="material-icons">close</span>
    Close
  </button>
)

export const CancelButton = ({ isSubmitting, onCancel }) => (
  <button
    type="button"
    className="secondary"
    aria-busy={isSubmitting}
    onClick={onCancel}
  >
    <span className="material-icons">chevron_left</span>
    Back
  </button>
)

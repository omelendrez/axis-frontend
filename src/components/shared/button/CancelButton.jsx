export const CancelButton = ({ isSubmitting, onCancel }) => (
  <button className="secondary" aria-busy={isSubmitting} onClick={onCancel}>
    Go back
  </button>
);

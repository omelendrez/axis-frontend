export const SaveButton = ({ isSubmitting, onSave }) => (
  <button type="submit" aria-busy={isSubmitting} onClick={onSave}>
    <span className="material-icons">save</span>
    Save
  </button>
)

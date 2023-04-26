export const SaveButton = ({ isSubmitting }) => (
  <button type="submit" aria-busy={isSubmitting}>
    <span className="material-icons">save</span>
    Save
  </button>
)

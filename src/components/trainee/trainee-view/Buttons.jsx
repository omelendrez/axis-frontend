import './buttons.css'

export const Buttons = ({ selected, onDelete, onEdit, noCheckboxes }) => {
  let forced = false
  if (noCheckboxes) {
    forced = true
  }

  return (
    <div className="buttons">
      {onEdit && (
        <button
          className="primary"
          disabled={!forced && selected?.length !== 1}
          onClick={onEdit}
        >
          <span className="material-icons">edit</span>
        </button>
      )}
      {onDelete && (
        <button
          className="delete"
          disabled={!forced && !selected?.length}
          onClick={onDelete}
        >
          <span className="material-icons">delete</span>
        </button>
      )}
    </div>
  )
}

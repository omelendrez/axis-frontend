import './buttons.css'

export const Buttons = ({
  selected,
  onAdd,
  onEdit,
  onDelete,
  noCheckboxes
}) => {
  let forced = false
  if (noCheckboxes) {
    forced = true
  }

  return (
    <div className="buttons">
      {onAdd && (
        <button
          data-tooltip="Click to Add"
          className="primary"
          disabled={!forced && selected?.length !== 0}
          onClick={onAdd}
        >
          <span className="material-icons">add</span>
        </button>
      )}
      {onEdit && (
        <button
          data-tooltip="Click to Edit"
          className="primary"
          disabled={!forced && selected?.length !== 1}
          onClick={onEdit}
        >
          <span className="material-icons">edit</span>
        </button>
      )}
      {onDelete && (
        <button
          data-tooltip="Click to Delete"
          className="delete"
          disabled={!forced && selected?.length !== 1}
          onClick={onDelete}
        >
          <span className="material-icons">delete</span>
        </button>
      )}
    </div>
  )
}

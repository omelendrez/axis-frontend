import './buttons.css'

export const Buttons = ({
  selected,
  onSave,
  onAdd,
  onEdit,
  onDelete,
  onUndo,
  noCheckboxes
}) => {
  let forced = false
  if (noCheckboxes) {
    forced = true
  }

  return (
    <div className="buttons-main">
      {onSave && (
        <button
          data-tooltip="Click to Save"
          className="primary"
          disabled={!forced && selected?.length !== 0}
          onClick={onSave}
        >
          <span className="material-icons">save</span>
        </button>
      )}{' '}
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
      {onUndo && (
        <button
          data-tooltip="Click to Undo last status"
          className="primary"
          disabled={!forced && selected?.length !== 1}
          onClick={onUndo}
        >
          <span className="material-icons">undo</span>
        </button>
      )}
    </div>
  )
}

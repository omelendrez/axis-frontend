import './buttons.css'

export const Buttons = ({
  selected,
  onView,
  onSave,
  onAdd,
  onEdit,
  onDelete,
  onReset,
  onUndo,
  onAssign,
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
          data-tooltip="Save"
          className="primary"
          disabled={!forced && selected?.length !== 0}
          onClick={onSave}
        >
          <span className="material-icons">save</span>
        </button>
      )}
      {onAdd && (
        <button
          data-tooltip="Add"
          className="primary"
          disabled={!forced && selected?.length !== 0}
          onClick={onAdd}
        >
          <span className="material-icons">add</span>
        </button>
      )}
      {onView && (
        <button
          data-tooltip="View"
          className="primary"
          disabled={!forced && selected?.length !== 1}
          onClick={onView}
        >
          <span className="material-icons">visibility</span>
        </button>
      )}
      {onEdit && (
        <button
          data-tooltip="Edit"
          className="primary"
          disabled={!forced && selected?.length !== 1}
          onClick={onEdit}
        >
          <span className="material-icons">edit</span>
        </button>
      )}
      {onAssign && (
        <button
          data-tooltip="Assign instructors"
          className="primary"
          disabled={!forced && selected?.length !== 1}
          onClick={onAssign}
        >
          <span className="material-icons">assignment_ind</span>
        </button>
      )}
      {onDelete && (
        <button
          data-tooltip="Delete"
          className="delete"
          disabled={!forced && selected?.length !== 1}
          onClick={onDelete}
        >
          <span className="material-icons">remove</span>
        </button>
      )}
      {onReset && (
        <button
          data-tooltip="Reset password"
          className="delete"
          disabled={!forced && selected?.length !== 1}
          onClick={onReset}
        >
          <span className="material-icons">lock_reset</span>
        </button>
      )}
      {onUndo && (
        <button
          data-tooltip="Undo last status"
          className="delete"
          disabled={!forced && selected?.length !== 1}
          onClick={onUndo}
        >
          <span className="material-icons">undo</span>
        </button>
      )}
    </div>
  )
}

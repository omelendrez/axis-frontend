import './buttons.css'

export const Buttons = ({ selected, noDelete }) => {
  let forced = false
  if (!selected) {
    forced = true
  }
  return (
    <div className="buttons">
      <button className="primary" disabled={!forced && selected?.length !== 1}>
        <span className="material-icons">edit</span>
      </button>
      {!noDelete && (
        <button className="delete" disabled={!forced && !selected?.length}>
          <span className="material-icons">delete</span>
        </button>
      )}
    </div>
  )
}

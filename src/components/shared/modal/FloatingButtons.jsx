import './floatingButtons.css'

export const FloatingButtons = ({ isVisible, onApprove, onReject }) => {
  const handleApprove = (e) => {
    e.preventDefault()
    onApprove()
  }

  const handleReject = (e) => {
    e.preventDefault()
    onReject()
  }

  return (
    isVisible && (
      <div className="floating-buttons">
        <button className="button approve" onClick={handleApprove}>
          <span className="material-icons">check</span>
        </button>
        <button className="button reject" onClick={handleReject}>
          <span className="material-icons">close</span>
        </button>
      </div>
    )
  )
}

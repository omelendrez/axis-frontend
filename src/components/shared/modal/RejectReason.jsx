import { useState } from 'react'

export const RejectReason = ({ open, onReject, onCancel }) => {
  const [reason, setReason] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    setReason(e.target.value)
  }

  const handleReject = (e) => {
    e.preventDefault()
    onReject(reason)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setReason('')
    onCancel()
  }

  return (
    <dialog open={open}>
      <article>
        <h3>Reject Reason</h3>
        <textarea
          rows={3}
          cols={40}
          onChange={handleChange}
          value={reason}
          placeholder="Enter the reason for this rejection"
        />
        <footer>
          <a
            href="/#"
            className="secondary"
            role="button"
            onClick={handleCancel}
          >
            Cancel
          </a>
          <a href="/#" onClick={handleReject} role="button">
            Reject
          </a>
        </footer>
      </article>
    </dialog>
  )
}

import { useState } from 'react'
import './rejectReasonForm.css'
import { ActionButton } from '../button'

export const RejectReasonForm = ({
  title,
  placeholder,
  rejectLabel,
  open,
  onReject,
  onCancel
}) => {
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
    <dialog open={open} className="modal">
      <article className="modal-container reject-reason-container">
        <ActionButton
          label="close"
          onClick={handleCancel}
          className="modal-close-button"
        />
        <h3>{title}</h3>
        <textarea
          rows={3}
          cols={40}
          onChange={handleChange}
          value={reason}
          placeholder={placeholder}
        />
        <footer>
          <button className="secondary" onClick={handleCancel}>
            Close
          </button>
          <button onClick={handleReject} disabled={!reason}>
            {rejectLabel}
          </button>
        </footer>
      </article>
    </dialog>
  )
}

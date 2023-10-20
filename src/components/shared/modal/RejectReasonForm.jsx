import { useState } from 'react'
import './rejectReasonForm.css'
import { ActionButton } from '../button'

export const RejectReasonForm = ({
  title,
  placeholder,
  rejectLabel,
  closeLabel,
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
        <h3>{title || 'cancel or reject reason'}</h3>
        <textarea
          rows={3}
          cols={40}
          onChange={handleChange}
          value={reason}
          placeholder={placeholder}
        />
        <footer>
          <button className="secondary" onClick={handleCancel}>
            {closeLabel || 'close'}
          </button>
          <button onClick={handleReject} disabled={!reason}>
            {rejectLabel || 'reject'}
          </button>
        </footer>
      </article>
    </dialog>
  )
}

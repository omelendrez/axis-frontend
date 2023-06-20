import { ActionButton } from '@/components'
import './modal.css'

export const Modal = ({ open, title, onClose, children }) => (
  <dialog open={open} className="modal">
    <article className="modal-container">
      <ActionButton
        label="close"
        onClick={onClose}
        className="modal-close-button"
      />
      <h5>{title}</h5>
      <div>{children}</div>
    </article>
  </dialog>
)

import { ActionButton } from '../button'
import './modal.css'

export const Modal = ({ open, onClose, children }) => (
  <dialog open={open} className="modal">
    <article className="modal-container">
      <ActionButton
        label="close"
        onClick={onClose}
        className="modal-close-button"
      />
      {children}
    </article>
  </dialog>
)

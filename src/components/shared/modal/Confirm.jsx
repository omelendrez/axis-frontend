import './modal.css'

export const Confirm = ({ open, onCofirm, onCancel, message }) =>
  <dialog open={open} >
    <article>
      <h3>Confirm your action!</h3>
      <p>
        {message}
      </p>
      <footer>
        <a href='#' className="secondary" role='button' onClick={onCancel}>Cancel</a>
        <a href='#' onClick={onCofirm} role='button'>Confirm</a>
      </footer>
    </article>
  </dialog>



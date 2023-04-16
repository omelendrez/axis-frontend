import './modal.css'

export const Confirm = ({ open, onCofirm, onCancel, message }) =>
  <dialog open={open} >
    <article>
      <h3>Confirm your action!</h3>
      <p>
        {message}
      </p>
      <footer>
        <button className="secondary" onClick={onCancel}>Cancel</button>
        <button onClick={onCofirm}>Confirm</button>
      </footer>
    </article>
  </dialog>



export const Modal = ({ type = 'info', open, toggle, title, message, label }) => {
  const handleClose = (e) => {
    e.preventDefault()
    toggle(false)
  }

  return (
    <dialog open={open} className={type} >
      <article className={type}>
        <header>
          <a href="#close" aria-label="Close" className="close" onClick={handleClose}></a>
          <h3>{title}</h3>
        </header>
        <p>{message}</p>
        <footer>
          <button onClick={handleClose}>
            {label}
          </button>
        </footer>
      </article>
    </dialog>
  )
}

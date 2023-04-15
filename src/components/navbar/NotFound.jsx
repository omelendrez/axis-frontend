import { useNavigate } from "react-router-dom"

export const NotFound = () => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className="container">
      <article>
        <h2>Page not found!</h2>
        <p>
          The page you are looking for does not exist.
        </p>
        <footer>
          <button onClick={handleClick}>
            Back to Home
          </button>
        </footer>
      </article>
    </div>
  )
}

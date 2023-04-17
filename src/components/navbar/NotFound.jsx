import { Link } from "react-router-dom"

export const NotFound = () => {

  return (
    <div className="container">
      <article>
        <h2>Page not found!</h2>
        <p>
          The page you are looking for does not exist.
        </p>
        <footer>
          <Link to="/dashboard" role="button">
            Back to Dashboard
          </Link>
        </footer>
      </article>
    </div>
  )
}

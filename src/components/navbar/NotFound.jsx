import { Link } from 'react-router-dom'
import './notFound.css'

const NotFound = () => {
  return (
    <main className="container not-found">
      <article>
        <header className="header">
          <span className="material-icons">error</span> Page not found!
        </header>
        <p>The page you are looking for does not exist.</p>
        <footer className="footer">
          <Link to="/" role="button">
            <span className="material-icons">home</span>
          </Link>
        </footer>
      </article>
    </main>
  )
}

export default NotFound

import { Link } from 'react-router-dom'
import './addButton.css'

export const AddButton = ({ url }) => (
  <div className="add-button-container">
    <Link to={url} role="button">
      <span className="material-icons">add</span>
    </Link>
  </div>
)

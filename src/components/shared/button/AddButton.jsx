import { Link } from 'react-router-dom'
import './addButton.css'

export const AddButton = ({ url, onClick }) => (
  <div className="add-button-container">
    <Link to={url} role="button" onClick={onClick ? onClick : () => {}}>
      <span className="material-icons">add</span>
    </Link>
  </div>
)

import { useNavigate } from 'react-router-dom'
import './backButton.css'

export const BackButton = () => {
  const navigate = useNavigate()

  const handleBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <div onClick={handleBack} className="back-button-container">
      <span className="material-icons">arrow_back_ios</span>
    </div>
  )
}

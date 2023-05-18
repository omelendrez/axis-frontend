import { Buttons } from '../../shared'
import './photo.css'

export const Photo = ({ photoUrl, onEdit }) => {
  const handleImageError = (e) =>
    (e.target.src = '/public/assets/no-image-icon.png')

  return (
    <article className="photo">
      <h6 className="title">Profile photo</h6>
      <Buttons onEdit={onEdit} noCheckboxes />
      <div>
        <img src={photoUrl} alt={photoUrl} onError={handleImageError} />
      </div>
    </article>
  )
}

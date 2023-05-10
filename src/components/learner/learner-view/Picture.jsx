import { Buttons } from './Buttons'
import './picture.css'

export const Picture = ({ photoUrl, onEdit }) => {
  const handleImageError = (e) =>
    (e.target.src = '/public/assets/no-image-icon.png')

  return (
    <article className="picture">
      <h6 className="title">Profile picture</h6>
      <Buttons onEdit={onEdit} noCheckboxes />
      <div>
        <img src={photoUrl} alt={photoUrl} onError={handleImageError} />
      </div>
    </article>
  )
}

import { getPhotoUrl } from '../../../services'
import { Buttons } from '../../shared'
import './photo.css'

export const Photo = ({ badge, onEdit }) => {
  console.log(badge)
  const photoUrl = badge
    ? getPhotoUrl(badge)
    : '/public/assets/no-image-icon.png'

  return (
    <article className="photo">
      <h6 className="title">Profile photo</h6>
      <Buttons onEdit={onEdit} noCheckboxes />
      <div>
        <img src={photoUrl} alt={photoUrl} />
      </div>
    </article>
  )
}

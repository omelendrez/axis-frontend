import { getPhotoUrl } from '../../../services'
import { Buttons } from '../../shared'
import './photo.css'

export const Photo = ({ badge, onEdit }) => {
  const photoUrl = badge
    ? getPhotoUrl(badge)
    : '/public/assets/no-image-icon.png'

  return (
    <article className="photo">
      <h6 className="title">Learner picture</h6>
      <Buttons onEdit={onEdit} noCheckboxes />
      <div>
        <img src={photoUrl} alt={photoUrl} width={768} height={576} />
      </div>
    </article>
  )
}

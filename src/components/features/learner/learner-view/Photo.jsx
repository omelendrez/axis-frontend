import { getPhotoUrl } from '@/services'
import { Buttons, Divider } from '@/components'
import './photo.css'

export const Photo = ({ badge, onEdit }) => {
  const photoUrl = badge ? getPhotoUrl(badge) : '/assets/no-image-icon.png'

  const handleError = (e) => (e.target.src = '/assets/no-image-icon.png')

  return (
    <article className="photo">
      <h6 className="title">Learner picture</h6>
      <Buttons onEdit={onEdit} noCheckboxes />
      <Divider style={{ margin: '1rem 0' }} />

      <div>
        <img
          src={photoUrl}
          alt={photoUrl}
          width={768}
          height={576}
          onError={handleError}
        />
      </div>
    </article>
  )
}

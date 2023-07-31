import { getPhotoUrl } from '@/services'
import './card.css'

export const Card = ({ item, onView }) => {
  const {
    badge,
    company_name,
    course_name,
    full_name,
    instructor,
    start,
    state_name,
    status_name,
    status
  } = item

  const photoUrl = badge ? getPhotoUrl(badge) : '/assets/no-image-icon.png'

  const handleError = (e) => (e.target.src = '/assets/no-image-icon.png')

  return (
    <article className="card trainings" onClick={() => onView(item.id)}>
      <div className="card-avatar-root">
        <img
          src={photoUrl}
          alt={badge}
          className="card-avatar-img"
          onError={handleError}
        />
      </div>
      <div className="card-body">
        <div className="course">
          {start} - {course_name}
        </div>
        <div className="small-font instructor">{instructor}</div>

        <div className="ellipsis name">{full_name}</div>
        {/* <div className="small-font">{badge}</div> */}
        <div className="small-font">{company_name}</div>

        <div className={`status status-${status} small-font`}>
          {status_name} - {state_name}
        </div>

        {/* <div className="card-line-buttons">
          <div>
            <span className="material-icons thumb-up">thumb_up</span>
          </div>
          <div>
            <span className="material-icons thumb-down">thumb_down</span>
          </div>
        </div> */}
      </div>
    </article>
  )
}

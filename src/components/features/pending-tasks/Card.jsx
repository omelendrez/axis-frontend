import { getPhotoUrl } from '@/services'
import useUser from '@/hooks/useUser'
import './card.css'
import { TRAINING_STATUS, USER_ROLE } from '@/helpers'
import { useEffect, useState } from 'react'

export const Card = ({ item, onView, isSelected, onSelect }) => {
  const {
    id,
    badge,
    company_name,
    course_name,
    full_name,
    instructor,
    start,
    status_name,
    status
  } = item

  const { user } = useUser()

  const [multiple, setMultiple] = useState(false)

  const photoUrl = badge ? getPhotoUrl(badge) : '/assets/no-image-icon.png'

  const handleError = (e) => (e.target.src = '/assets/no-image-icon.png')

  const handleClick = (e) => {
    e.preventDefault()
    onView(item.id)
  }

  const handleSelectItem = (e) => {
    e.stopPropagation()
    onSelect(item)
  }

  useEffect(() => {
    if (user.roles?.length) {
      setMultiple(
        Boolean(
          user.roles.find(
            (role) =>
              role.id === USER_ROLE.ACCOUNTS ||
              role.id === USER_ROLE.MD ||
              role.id === USER_ROLE.SYS_ADMIN
          )
        )
      )
    }
  }, [user.roles])

  return (
    <article className="card trainings" onClick={handleClick}>
      <div className="card-avatar-root">
        <img
          src={photoUrl}
          alt={badge}
          className="card-avatar-img"
          onError={handleError}
        />
      </div>
      <div className="card-body">
        <div className="ellipsis course">{course_name}</div>
        <div className="small-font">{start}</div>

        <div className="small-font instructor">{instructor}</div>

        <div className="ellipsis name">{full_name}</div>
        <div className="small-font company">{company_name}</div>

        <div className={`status status-${status} small-font`}>
          {status_name}
        </div>
      </div>
      {status !== TRAINING_STATUS.COMPLETED && multiple && (
        <div className="card-line-buttons">
          <label htmlFor={`chk_${id}`}>{id}</label>
          <input
            id={`chk_${id}`}
            type="checkbox"
            onClick={handleSelectItem}
            checked={isSelected}
            readOnly
          />
        </div>
      )}
    </article>
  )
}

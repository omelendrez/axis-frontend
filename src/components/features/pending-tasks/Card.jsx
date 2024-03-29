import { getPhotoUrl, getPictureExists } from '@/services'
import useUser from '@/hooks/useUser'
import './card.css'
import { TRAINING_STATUS, USER_ROLE } from '@/helpers'
import { useEffect, useState } from 'react'

// TODO: Remove sys_admin from multiple approvers
const rolesIncluded = [USER_ROLE.ACCOUNTS, USER_ROLE.MD, USER_ROLE.SYS_ADMIN]

export const Card = ({ item, onView, isSelected, onSelect, hasCheckboxes }) => {
  const {
    id,
    badge,
    company_name,
    course_name,
    full_name,
    reject_reason,
    instructor,
    start,
    end,
    status_name,
    status
  } = item

  const { user } = useUser()

  const { roles: userRoles } = user

  const [isMultiple, setIsMultiple] = useState(false)

  const [photoUrl, setPhotoUrl] = useState('/assets/no-image-icon.png')

  const handleClick = (e) => {
    e.preventDefault()
    onView(item.id)
  }

  const handleSelectItem = (e) => {
    e.stopPropagation()
    onSelect(item)
  }
  useEffect(() => {
    const photoUrl = getPhotoUrl(badge)
    getPictureExists(badge).then((res) => {
      if (res.data.exists) {
        setPhotoUrl(photoUrl)
      }
    })

    return () => setPhotoUrl(null)
  }, [badge])

  useEffect(() => {
    if (userRoles?.length) {
      setIsMultiple(
        Boolean(userRoles.find((role) => rolesIncluded.includes(role.id)))
      )
    }
  }, [userRoles])

  const isCompleted = status === TRAINING_STATUS.COMPLETED

  return (
    <article className="card trainings" onClick={handleClick}>
      <div className="card-avatar-root">
        <img
          src={photoUrl || '/assets/no-image-icon.png'}
          alt={badge}
          className="card-avatar-img"
        />
      </div>
      <div className="card-body">
        <div className="ellipsis course">{course_name}</div>
        <div className="small-font">
          {start !== end ? `${start} - ${end}` : start}
        </div>

        {instructor && (
          <div className="small-font instructor">{instructor}</div>
        )}

        <div className="small-font badge">{badge}</div>

        <div className="ellipsis name">{full_name}</div>
        <div className="small-font company">{company_name}</div>

        <div className={`status status-${status} small-font`}>
          {status_name}
        </div>
        {reject_reason && status !== TRAINING_STATUS.CANCELLED ? (
          <div className="reject-reason">
            <span className="material-icons">error</span>
          </div>
        ) : null}
      </div>
      {hasCheckboxes && isMultiple && onSelect && !isCompleted && (
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

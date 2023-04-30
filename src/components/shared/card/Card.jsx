import useUser from '../../../hooks/useUser'
import { Tag, IconButton } from '../'
import { FOREIGNER } from '../../../helpers'
import './card.css'

import { getPhoto } from '../../../services'

export const Card = ({ item, fields, onEdit, onDelete, onView }) => {
  const { user } = useUser()
  const photoUrl = getPhoto(item.badge)
  let isLocked = false
  fields.forEach((f) => {
    const lock = f.lock
    if (lock) {
      if (lock.values.includes(item[f.name])) {
        isLocked = true
      }
    }
  })

  const handleImageError = (e) => (e.target.src = 'assets/no-image-icon.png')

  return (
    <article className="card">
      <div className="card-avatar-root">
        <div className="card-avatar-circular">
          <img
            src={photoUrl}
            alt={item.badge}
            className="card-avatar-img"
            onError={handleImageError}
          />
        </div>
      </div>
      <div className="card-body">
        <div>
          <div>
            <Tag className={item.type}>{item.type}</Tag>
          </div>
          <div>{item.badge}</div>
          <div>
            <b>{item.full_name}</b>
          </div>
        </div>
        <div className="small-font">{item.company}</div>
        <div className="small-font">
          <div>
            {item.sex} - {item.state === FOREIGNER ? null : `${item.state} - `}
            {item.nationality} - {item.age} years old
          </div>
        </div>
      </div>
      <div className="card-buttons">
        <IconButton
          className="primary"
          onClick={(e) => {
            e.preventDefault()
            onView(item)
          }}
          tooltip="View training data"
        >
          visibility
        </IconButton>
        <IconButton
          className="primary"
          onClick={(e) => {
            e.preventDefault()
            onEdit(item)
          }}
          disabled={user.role !== 1 || isLocked}
          tooltip="Edit trainee"
        >
          edit
        </IconButton>
        <IconButton
          className="delete"
          onClick={(e) => {
            e.preventDefault()
            onDelete(item)
          }}
          disabled={user.role !== 1 || isLocked}
          tooltip="Delete trainee"
        >
          delete
        </IconButton>
      </div>
    </article>
  )
}

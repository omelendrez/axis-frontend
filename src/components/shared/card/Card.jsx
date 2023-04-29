import useUser from '../../../hooks/useUser'
import { Tag, IconButton } from '../'
import './card.css'

export const Card = ({ item, fields, onEdit, onDelete, onView }) => {
  const { user } = useUser()
  let isLocked = false
  fields.forEach((f) => {
    const lock = f.lock
    if (lock) {
      if (lock.values.includes(item[f.name])) {
        isLocked = true
      }
    }
  })
  return (
    <article className="card">
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
            {item.sex} - {item.state} - {item.nationality} - {item.age} years
            old
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

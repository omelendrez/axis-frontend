import { Tag } from '../'
import './card.css'

import { getPhoto } from '../../../services'

export const Card = ({ item, onView }) => {
  const photoUrl = getPhoto(item.badge)

  const handleImageError = (e) => (e.target.src = 'assets/no-image-icon.png')

  return (
    <article className="card" onClick={() => onView(item)}>
      <div className="card-avatar-root">
        <img
          src={photoUrl}
          alt={item.badge}
          className="card-avatar-img"
          onError={handleImageError}
        />
      </div>
      <div className="card-body">
        <div className="ellipsis">{item.full_name}</div>
        <div className="small-font">{item.company}</div>
        <div style={{ display: 'flex' }}>
          <Tag className={item.type}>{item.type}</Tag>
          <div>{item.badge}</div>
        </div>
      </div>
    </article>
  )
}

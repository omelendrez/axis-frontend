import { getPhotoUrl, getPictureExists } from '@/services'
import { Buttons, Divider, Preview } from '@/components'
import './photo.css'
import { useEffect, useState } from 'react'

export const Photo = ({ badge, onEdit, update }) => {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    const photoUrl = getPhotoUrl(badge)

    getPictureExists(badge).then((res) =>
      setUrl(res.data.exists ? photoUrl : null)
    )

    return () => setUrl(null)
  }, [badge, update])

  return (
    <article className="photo">
      <h6 className="title">Learner picture</h6>
      <Buttons onEdit={onEdit} noCheckboxes />
      <Divider style={{ margin: '1rem 0' }} />
      <div>
        {url ? (
          <Preview imageUrl={url} width={400} />
        ) : (
          <img
            src="/assets/no-image-icon.png"
            alt={badge}
            width={768}
            height={576}
          />
        )}
      </div>
    </article>
  )
}

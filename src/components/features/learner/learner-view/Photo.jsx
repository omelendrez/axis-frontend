import { getBucketDocumentUrl, getPhotoUrl, pictureExists } from '@/services'
import { Buttons, Divider, Preview } from '@/components'
import './photo.css'
import { useEffect, useState } from 'react'

export const Photo = ({ badge, onEdit, update }) => {
  const [photo, setPhoto] = useState(null)
  const [photoFound, setPhotoFound] = useState(false)

  useEffect(() => {
    const photoUrl = getPhotoUrl(badge)

    pictureExists(badge).then((res) => {
      if (res.data.exists) {
        getBucketDocumentUrl(photoUrl).then((res) => setPhoto(res.data))
      }
      setPhotoFound(res.data.exists)
    })
    return () => setPhoto(null)
  }, [badge, update])

  return (
    <article className="photo">
      <h6 className="title">Learner picture</h6>
      <Buttons onEdit={onEdit} noCheckboxes />
      <Divider style={{ margin: '1rem 0' }} />
      <div>
        {photoFound ? (
          <Preview imageUrl={photo} width={400} />
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

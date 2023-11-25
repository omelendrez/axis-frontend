import { getListPhotoUrl, pictureExists } from '@/services'
import { Buttons, Divider, Preview } from '@/components'
import './photo.css'
import { useEffect, useState } from 'react'

const NO_IMAGE = '/assets/no-image-icon.png'

export const Photo = ({ badge, onEdit }) => {
  const [photo, setPhoto] = useState(null)
  const [photoFound, setPhotoFound] = useState(false)

  useEffect(() => {
    const photoUrl = getListPhotoUrl(badge)
    pictureExists(badge).then((res) => {
      if (res.data.exists) {
        setPhoto(photoUrl)
      } else {
        setPhoto(NO_IMAGE)
      }
      setPhotoFound(res.data.exists)
    })
  }, [badge])

  return (
    <article className="photo">
      <h6 className="title">Learner picture</h6>
      <Buttons onEdit={onEdit} noCheckboxes />
      <Divider style={{ margin: '1rem 0' }} />

      <div>
        {photoFound ? (
          <Preview imageUrl={photo} width={400} />
        ) : (
          <img src={photo} alt={photo} width={768} height={576} />
        )}
      </div>
    </article>
  )
}

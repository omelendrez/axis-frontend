import { getLearnerIdUrl, learnerIdCardExists } from '@/services'
import { Buttons, Divider, Preview } from '@/components'
import './photo.css'
import { useEffect, useState } from 'react'

const NO_IMAGE = '/assets/id_card_img.jpg'

export const LearnerIdCard = ({ badge, onEdit, update }) => {
  const [photo, setIDCard] = useState(null)
  const [photoFound, setIDCardFound] = useState(false)

  useEffect(() => {
    const idUrl = getLearnerIdUrl(badge)

    learnerIdCardExists(badge).then((res) => {
      if (res.data.exists) {
        setIDCard(idUrl)
      } else {
        setIDCard(NO_IMAGE)
      }
      setIDCardFound(res.data.exists)
    })
  }, [badge, update])

  return (
    <article className="id-card">
      <h6 className="title">ID Card</h6>
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

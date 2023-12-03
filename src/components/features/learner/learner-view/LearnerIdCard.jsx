import {
  getBucketDocumentUrl,
  getLearnerIdUrl,
  learnerIdCardExists
} from '@/services'
import { Buttons, Divider, Preview } from '@/components'
import './photo.css'
import { useEffect, useState } from 'react'

export const LearnerIdCard = ({ badge, onEdit, update }) => {
  const [idCard, setIDCard] = useState(null)
  const [idCardFound, setIDCardFound] = useState(false)

  useEffect(() => {
    const idUrl = getLearnerIdUrl(badge)

    learnerIdCardExists(badge).then((res) => {
      setIDCardFound(res.data.exists)
      if (res.data.exists) {
        getBucketDocumentUrl(idUrl).then((res) => setIDCard(res.data))
      }
    })
    return () => setIDCard(null)
  }, [badge, update])

  return (
    <article className="id-card">
      <h6 className="title">ID Card</h6>
      <Buttons onEdit={onEdit} noCheckboxes />
      <Divider style={{ margin: '1rem 0' }} />

      <div>
        {idCardFound ? (
          <Preview imageUrl={idCard} width={400} />
        ) : (
          <img
            src="/assets/id_card_img.jpg"
            alt={badge}
            width={768}
            height={576}
          />
        )}
      </div>
    </article>
  )
}

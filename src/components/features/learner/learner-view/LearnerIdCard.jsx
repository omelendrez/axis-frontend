import { getLearnerIdUrl } from '@/services'
import { Buttons, Divider, Preview } from '@/components'
import './photo.css'
import { useEffect, useState } from 'react'

export const LearnerIdCard = ({ badge, onEdit, update }) => {
  const [idCard, setIDCard] = useState(null)

  useEffect(() => {
    const idUrl = getLearnerIdUrl(badge)
    setIDCard(idUrl)
  }, [badge, update])

  return (
    <article className="id-card">
      <h6 className="title">ID Card</h6>
      <Buttons onEdit={onEdit} noCheckboxes />
      <Divider style={{ margin: '1rem 0' }} />

      <div>
        <Preview imageUrl={idCard} width={400} />
      </div>
    </article>
  )
}

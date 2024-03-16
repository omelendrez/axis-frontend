import { useEffect, useState } from 'react'
import { Modal, Preview, Task } from '@/components'
import { FoetUpload } from './FoetUpload'

import { getFOETUrl } from '@/services'
import { documentNumber, getUserAuth } from '@/helpers'

import './foet.css'

const FOET_EXPIRY_TYPE = 2

export const Foet = ({ training, onUpdate, update, role, user }) => {
  const { roles } = user

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [url, setUrl] = useState(null)

  const { id, status_id: status, tracking, course } = training

  const { expiry_type: expiryType } = course

  const { isCancelled, canView, canApprove } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )

  useEffect(() => {
    const imageUrl = getFOETUrl(id)

    setUrl(imageUrl)

    return () => setUrl(null)
  }, [id, update])

  const handleScan = (e) => {
    e.preventDefault()
    setIsFormOpen(true)
  }

  const handleClose = (e) => {
    e?.preventDefault()
    setIsFormOpen(false)

    onUpdate()
  }

  const title = <strong>Previous FOET</strong>

  if (!canView || expiryType !== FOET_EXPIRY_TYPE) {
    return null
  }

  return (
    <Task title={title} className="foet" key={title}>
      <div className="foet-children">
        <Preview imageUrl={url} />

        {canApprove && (
          <div className="buttons">
            <button onClick={handleScan} disabled={isCancelled}>
              scan foet
            </button>
          </div>
        )}
      </div>

      <Modal open={isFormOpen} title="Scan foet" onClose={handleClose}>
        <div className="form-container">
          <FoetUpload onClose={handleClose} fileName={documentNumber(id)} />
        </div>
      </Modal>
    </Task>
  )
}

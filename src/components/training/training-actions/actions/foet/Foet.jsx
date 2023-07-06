import { useEffect, useState } from 'react'
import { Modal, Task } from '@/components'
import { FoetUpload } from './FoetUpload'
import useApiMessages from '@/hooks/useApiMessages'
import { foetExists, getFOETUrl, adminApproval } from '@/services'
import { documentNumber, getUserAuth } from '@/helpers'

import './foet.css'

const FOET_EXPIRY_TYPE = 2

export const Foet = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [isImage, setIsImage] = useState(false)

  const { id, status_id: status, tracking, course } = training

  const { expiry_type: expiryType } = course

  const { isCancelled, canView, canUpdate } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )

  const imageUrl = getFOETUrl(id)

  useEffect(() => {
    foetExists(id)
      .then((res) => setIsImage(res.data.exists))
      .catch((e) => apiMessage(e))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const process = (payload) => {
    setIsSubmitting(true)

    adminApproval(id, payload)
      .then((res) => {
        onUpdate()
        apiMessage(res)
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const handleApprove = (e) => {
    e.preventDefault()
    process({
      approved: 1
    })
  }

  const handleReject = (e) => {
    e.preventDefault()
    process({
      approved: 0
    })
  }

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
    <Task
      title={title}
      className="foet"
      approveLabel="Approve"
      rejectLabel="Reject"
      onApprove={canUpdate ? handleApprove : null}
      onReject={canUpdate ? handleReject : null}
      approveDisabled={isCancelled}
      rejectDisabled={isCancelled}
      isSubmitting={isSubmitting}
    >
      <div className="foet-children">
        {isImage && (
          <figure>
            <img src={imageUrl} alt={imageUrl} />
          </figure>
        )}
        {canUpdate && (
          <div className="buttons">
            <button onClick={handleScan} disabled={isCancelled}>
              {isImage ? 'Re-scan foet' : 'scan foet'}
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

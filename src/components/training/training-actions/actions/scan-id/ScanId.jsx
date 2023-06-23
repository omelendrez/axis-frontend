import { useEffect, useState } from 'react'
import { Modal, IdCardUpload, Task } from '@/components'
import useApiMessages from '@/hooks/useApiMessages'
import {
  frontdeskApproval,
  learnerIdCardExists,
  getLearnerIdUrl
} from '@/services'
import { TRAINING_STATUS } from '@/helpers'
import './scanId.css'

export const ScanId = ({ training, onUpdate }) => {
  const { apiMessage } = useApiMessages()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isPhotoOpen, setIsPhotoOpen] = useState(false)

  const [isImage, setIsImage] = useState(false)

  const { id, status_id: status, badge } = training

  const isCancelled = status === TRAINING_STATUS.CANCELLED

  const imageUrl = getLearnerIdUrl(training.badge)

  const isApproved = status > TRAINING_STATUS.ADMIN

  useEffect(() => {
    learnerIdCardExists(badge)
      .then((res) => setIsImage(res.data.exists))
      .catch((e) => apiMessage(e))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const process = (payload) => {
    setIsSubmitting(true)

    frontdeskApproval(id, payload)
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
    setIsPhotoOpen(true)
  }

  const handleClose = (e) => {
    e?.preventDefault()
    setIsPhotoOpen(false)
    onUpdate()
  }

  const title = <strong>Learner id card</strong>

  return (
    <>
      <Task
        title={title}
        className="scan-id"
        onApprove={isApproved ? null : handleApprove}
        onReject={isApproved ? null : handleReject}
        approveDisabled={isCancelled}
        rejectDisabled={isCancelled}
        isSubmitting={isSubmitting}
      >
        <div className="scan-id-children">
          {isImage && (
            <figure>
              <img src={imageUrl} alt={imageUrl} />
            </figure>
          )}

          <div className="buttons">
            <button onClick={handleScan} disabled={isCancelled}>
              {isImage ? 'Re-scan Id' : 'Scan Id'}
            </button>
          </div>
        </div>

        <Modal open={isPhotoOpen} title="Scan Id card" onClose={handleClose}>
          <div className="form-container">
            <IdCardUpload onClose={handleClose} badge={badge} />
          </div>
        </Modal>
      </Task>
    </>
  )
}

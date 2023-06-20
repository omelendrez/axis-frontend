import { useState } from 'react'
import { Modal, IdCardUpload, Task } from '@/components'
import useApiMessages from '@/hooks/useApiMessages'
import { frontdeskApproval } from '@/services'
import { TRAINING_STATUS } from '@/helpers'
import './scanId.css'

export const ScanId = ({ training, onUpdate }) => {
  const { apiMessage } = useApiMessages()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isPhotoOpen, setIsPhotoOpen] = useState(false)

  const { id, status_id: status, badge } = training

  const isCancelled = status === TRAINING_STATUS.CANCELLED

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
  }

  const title = <strong>Identitication</strong>

  return (
    <>
      <Task
        title={title}
        className="scan-id"
        onApprove={handleApprove}
        onReject={handleReject}
        approveDisabled={isCancelled}
        rejectDisabled={isCancelled}
        isSubmitting={isSubmitting}
      >
        <div className="buttons">
          <button onClick={handleScan}>Scan Id</button>
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

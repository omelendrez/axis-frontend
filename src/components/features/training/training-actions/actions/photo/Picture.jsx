import { useEffect, useState } from 'react'
import {
  Modal,
  Task,
  PhotoUpload,
  Preview,
  RejectReasonForm
} from '@/components'
import useApiMessages from '@/hooks/useApiMessages'
import {
  trainingCoordinatorApproval,
  pictureExists,
  getPhotoUrl,
  cancelTraining,
  saveReason
} from '@/services'
import { TRAINING_STATUS, getUserAuth } from '@/helpers'
import './picture.css'
import { Status } from '../status-container/Status'

export const Picture = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isPhotoOpen, setIsPhotoOpen] = useState(false)

  const [isImage, setIsImage] = useState(false)

  const [isRejectReasonOpen, setIsRejectReasonOpen] = useState(false)

  const { id, status_id: status, badge, tracking } = training

  const trackingRecord = tracking.find(
    (t) => t.status_id === TRAINING_STATUS.TRAINING_COORDINATOR_DONE
  )

  const imageUrl = getPhotoUrl(badge)

  const { isApproved, isCancelled, canView, canApprove } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )

  useEffect(() => {
    pictureExists(badge)
      .then((res) => setIsImage(res.data.exists))
      .catch((e) => apiMessage(e))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const process = (payload) => {
    setIsSubmitting(true)

    trainingCoordinatorApproval(id, payload)
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

  const handleRejectReasonCancel = () => {
    setIsRejectReasonOpen(false)
  }

  const handleRejectReasonReject = (reason) => {
    setIsSubmitting(true)
    const payload = {
      reason
    }

    cancelTraining(id)
      .then((res) => {
        saveReason(id, payload).then(() => {
          onUpdate()
          setIsRejectReasonOpen(false)
          apiMessage(res)
        })
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const handleReject = (e) => {
    e.preventDefault()
    setIsRejectReasonOpen(true)
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

  const title = <strong>Learner Picture</strong>

  if (!canView) {
    return null
  }

  return (
    <>
      <Task
        title={title}
        status={<Status trackingRecord={trackingRecord} />}
        className="picture"
        onApprove={canApprove ? handleApprove : null}
        onReject={canApprove && !isApproved ? handleReject : null}
        rejectLabel="Cancel"
        approveDisabled={isCancelled}
        rejectDisabled={isCancelled}
        isSubmitting={isSubmitting}
      >
        <div className="picture-children">
          {isImage && <Preview imageUrl={imageUrl} />}
          {canApprove && (
            <div className="buttons">
              <button onClick={handleScan} disabled={isCancelled}>
                {isImage ? 'Re-take picture' : 'Take picture'}
              </button>
            </div>
          )}
        </div>

        <Modal open={isPhotoOpen} title="Take picture" onClose={handleClose}>
          <div className="form-container">
            <PhotoUpload onClose={handleClose} badge={badge} />
          </div>
        </Modal>
      </Task>
      <RejectReasonForm
        title="cancel reason"
        placeholder="Enter the reason why you are cancelling this training record"
        rejectLabel="Cancel"
        open={isRejectReasonOpen}
        onCancel={handleRejectReasonCancel}
        onReject={handleRejectReasonReject}
      />
    </>
  )
}

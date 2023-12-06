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
  saveReason,
  getBucketDocumentUrl
} from '@/services'
import { TRAINING_STATUS, getUserAuth } from '@/helpers'
import './picture.css'
import { Status } from '../status-container/Status'

export const Picture = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [photo, setPhoto] = useState(null)

  const [photoFound, setPhotoFound] = useState(false)

  const [isPhotoOpen, setIsPhotoOpen] = useState(false)

  const [isRejectReasonOpen, setIsRejectReasonOpen] = useState(false)

  const { id, status_id: status, badge, tracking } = training

  const trackingRecord = tracking.find(
    (t) => t.status_id === TRAINING_STATUS.TRAINING_COORDINATOR_DONE
  )

  const { isApproved, isCancelled, canView, canApprove } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )

  useEffect(() => {
    const photoUrl = getPhotoUrl(badge)

    pictureExists(badge).then((res) => {
      if (res.data.exists) {
        getBucketDocumentUrl(photoUrl).then((res) => setPhoto(res.data))
      }
      setPhotoFound(res.data.exists)
    })
    return () => setPhoto(null)
  }, [badge])

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

  if (!canView || !canApprove) {
    return null
  }

  return (
    <>
      <Task
        key={title}
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
          {photoFound && <Preview imageUrl={photo} />}
          {canApprove && (
            <div className="buttons">
              <button onClick={handleScan} disabled={isCancelled}>
                {photoFound ? 'Re-take picture' : 'Take picture'}
              </button>
            </div>
          )}
        </div>

        <Modal open={isPhotoOpen} title="Take picture" onClose={handleClose}>
          <div className="form-container">
            <PhotoUpload onClose={handleClose} badge={badge} />
            <ol className="photo-tip">
              <li>Camera must be set to 3:4 aspect ratio.</li>
              <li>Orientation must be landscape.</li>
            </ol>
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

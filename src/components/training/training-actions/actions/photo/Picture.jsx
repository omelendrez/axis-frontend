import { useEffect, useState } from 'react'
import { Modal, Task, PhotoUpload } from '@/components'
import useApiMessages from '@/hooks/useApiMessages'
import {
  trainingCoordinatorApproval,
  pictureExists,
  getPhotoUrl
} from '@/services'
import { getUserAuth, isDesktop } from '@/helpers'

import './picture.css'
import { Status } from '../status-container/Status'

export const Picture = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isPhotoOpen, setIsPhotoOpen] = useState(false)

  const [isImage, setIsImage] = useState(false)

  const { id, status_id: status, badge, tracking } = training

  const trackingRecord = tracking.find((t) => t.status_id === role)

  const { isApproved, isCancelled, canView, canUpdate } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )

  const imageUrl = getPhotoUrl(badge)

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

  const title = <strong>Learner Picture</strong>

  if (!canView || isDesktop()) {
    return null
  }

  return (
    <>
      <Task
        title={title}
        status={<Status trackingRecord={trackingRecord} />}
        className="picture"
        onApprove={!isApproved && canUpdate ? handleApprove : null}
        onReject={!isApproved ? handleReject : null}
        approveDisabled={isCancelled}
        rejectDisabled={isCancelled}
        isSubmitting={isSubmitting}
      >
        <div className="picture-children">
          {isImage && (
            <figure>
              <img src={imageUrl} alt={imageUrl} />
            </figure>
          )}
          {canUpdate && (
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
    </>
  )
}

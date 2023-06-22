import { useEffect, useState } from 'react'
import { Modal, Task, PhotoUpload } from '@/components'
import useApiMessages from '@/hooks/useApiMessages'
import {
  trainingCoordinatorApproval,
  pictureExists,
  getPhotoUrl
} from '@/services'
import { TRAINING_STATUS } from '@/helpers'

import './picture.css'

export const Picture = ({ training, onUpdate }) => {
  const { apiMessage } = useApiMessages()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isPhotoOpen, setIsPhotoOpen] = useState(false)

  const [isImage, setIsImage] = useState(false)

  const { id, status_id: status, badge } = training

  const isCancelled = status === TRAINING_STATUS.CANCELLED

  const imageUrl = getPhotoUrl(training.badge)

  const isApproved = status > TRAINING_STATUS.ADMIN

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

  return (
    <>
      <Task
        title={title}
        className="picture"
        onApprove={isApproved ? null : handleApprove}
        onReject={isApproved ? null : handleReject}
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

          <div className="buttons">
            <button onClick={handleScan} disabled={isCancelled}>
              {isImage ? 'Re-take picture' : 'Take picture'}
            </button>
          </div>
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

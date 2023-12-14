import { useEffect, useState } from 'react'
import {
  Modal,
  IdCardUpload,
  Task,
  Preview,
  RejectReasonForm
} from '@/components'
import { Status } from '../status-container/Status'
import useApiMessages from '@/hooks/useApiMessages'
import {
  frontdeskApproval,
  undoLastApproval,
  learnerIdCardExists,
  getLearnerIdUrl,
  saveReason,
  getBucketDocumentUrl
} from '@/services'
import { TRAINING_STATUS, getUserAuth } from '@/helpers'
import './scanId.css'

export const ScanId = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isPhotoOpen, setIsPhotoOpen] = useState(false)

  const [isIdCard, setIsIdCard] = useState(false)

  const [idCard, setIDCard] = useState(null)

  const [isRejectReasonOpen, setIsRejectReasonOpen] = useState(false)

  const { id, status_id: status, badge, tracking } = training

  const trackingRecord = tracking.find(
    (t) => t.status_id === TRAINING_STATUS.FRONTDESK_DONE
  )

  const { canApprove, isCancelled, canView } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )

  useEffect(() => {
    const imageUrl = getLearnerIdUrl(badge)
    learnerIdCardExists(badge)
      .then((res) => {
        setIsIdCard(res.data.exists)
        if (res.data.exists) {
          getBucketDocumentUrl(imageUrl).then((res) => setIDCard(res.data))
        }
      })
      .catch((e) => apiMessage(e))
    return () => setIDCard(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [training])

  const handleApprove = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const payload = {
      approved: 1
    }

    frontdeskApproval(id, payload)
      .then((res) => {
        saveReason(id, payload).then(() => {
          onUpdate()
          apiMessage(res)
        })
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const handleRejectReasonCancel = () => {
    setIsRejectReasonOpen(false)
  }

  const handleRejectReasonReject = (reason) => {
    setIsSubmitting(true)
    const payload = {
      reason
    }

    undoLastApproval(id)
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

  const title = <strong>Learner id card</strong>

  if (!canView) {
    return null
  }

  return (
    <>
      <Task
        key={title}
        title={title}
        status={<Status trackingRecord={trackingRecord} />}
        className="scan-id"
        onApprove={canApprove ? handleApprove : null}
        onReject={canApprove ? handleReject : null}
        approveDisabled={isCancelled}
        rejectDisabled={isCancelled}
        isSubmitting={isSubmitting}
      >
        <div className="scan-id-children">
          {isIdCard && <Preview imageUrl={idCard} />}

          {canApprove && (
            <div className="buttons">
              <button onClick={handleScan} disabled={isCancelled}>
                {isIdCard ? 'Re-scan Id' : 'Scan Id'}
              </button>
            </div>
          )}
        </div>

        <Modal open={isPhotoOpen} title="Scan Id card" onClose={handleClose}>
          <div className="form-container">
            <IdCardUpload onClose={handleClose} badge={badge} />
          </div>
        </Modal>
      </Task>

      <RejectReasonForm
        title="Reject reason"
        placeholder="Enter the reason why you are rejecting this training record"
        rejectLabel="Reject"
        open={isRejectReasonOpen}
        onCancel={handleRejectReasonCancel}
        onReject={handleRejectReasonReject}
      />
    </>
  )
}

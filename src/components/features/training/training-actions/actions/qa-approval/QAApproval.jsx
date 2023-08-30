import { useState } from 'react'
import { Task, RejectReasonForm } from '@/components'

import description from './description'
import { Status } from '../status-container/Status'
import useApiMessages from '@/hooks/useApiMessages'
import {
  QAApproval as approval,
  saveReason,
  undoLastApproval
} from '@/services'
import { TRAINING_STATUS, getUserAuth } from '@/helpers'

export const QAApproval = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isRejectOpen, setIsRejectOpen] = useState(false)

  const { id, status_id: status, tracking } = training

  const trackingRecord = tracking.find(
    (t) => t.status_id === TRAINING_STATUS.QA_DONE
  )

  const { isApproved, isCancelled, canView } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )
  const process = (payload) => {
    setIsSubmitting(true)

    approval(id, payload)
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
    setIsRejectOpen(true)
  }

  const handleCancel = () => {
    setIsRejectOpen(false)
  }

  const handleConfirmReject = async (reason) => {
    setIsSubmitting(true)
    const payload = {
      reason
    }
    try {
      await undoLastApproval(id)
      await undoLastApproval(id)
      await saveReason(id, payload)
      onUpdate()
      setIsRejectOpen(false)
      setIsSubmitting(false)
    } catch (error) {
      apiMessage(error)
      setIsSubmitting(false)
    }
  }

  const result = (
    <strong>
      {isCancelled ? 'CANCELLED' : isApproved ? 'QA/QC APPROVED' : ''}
    </strong>
  )

  const title = <strong>QA/QC Approval</strong>

  if (!canView) {
    return null
  }

  return (
    <>
      <Task
        title={title}
        status={<Status trackingRecord={trackingRecord} />}
        description={
          !isApproved ? (
            description
          ) : (
            <div className="description-large">{result}</div>
          )
        }
        className="md-approval"
        onApprove={!isApproved ? handleApprove : null}
        onReject={!isApproved ? handleReject : null}
        approveDisabled={isCancelled}
        rejectDisabled={isCancelled}
        isSubmitting={isSubmitting}
      ></Task>

      <RejectReasonForm
        title="reject reason"
        placeholder="Enter the reason why you are rejecting this training record"
        rejectLabel="Reject"
        open={isRejectOpen}
        onReject={handleConfirmReject}
        onCancel={handleCancel}
      />
    </>
  )
}

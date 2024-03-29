import { useState } from 'react'
import { Task } from '@/components'

import description from './description'
import { Status } from '../status-container/Status'

import useApiMessages from '@/hooks/useApiMessages'
import { MDApproval as approval } from '@/services'
import { TRAINING_STATUS, getUserAuth } from '@/helpers'

export const MDApproval = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { id, status_id: status, tracking } = training

  const trackingRecord = tracking.find(
    (t) => t.status_id === TRAINING_STATUS.MD_DONE
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

  const result = (
    <strong>
      {isCancelled ? 'CANCELLED' : isApproved ? 'MD APPROVED' : ''}
    </strong>
  )

  const title = <strong>MD Approval</strong>

  if (!canView) {
    return null
  }

  return (
    <Task
      key={title}
      title={title}
      status={<Status trackingRecord={trackingRecord} />}
      description={
        isApproved ? (
          <div className="description-large">{result}</div>
        ) : (
          description
        )
      }
      className="md-approval"
      onApprove={!isApproved ? handleApprove : null}
      // onReject={!isApproved ? handleReject : null}
      approveDisabled={isCancelled}
      // rejectDisabled={isCancelled}
      approveLabel="Approve"
      // rejectLabel="Reject"
      isSubmitting={isSubmitting}
    ></Task>
  )
}

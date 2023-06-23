import { useState } from 'react'
import { Task } from '@/components'

import description from './description'
import useApiMessages from '@/hooks/useApiMessages'
import { QAApproval as approval } from '@/services'
import { getUserAuth } from '@/helpers'

export const QAApproval = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { id, status_id: status } = training

  const { isApproved, isCancelled, canView } = getUserAuth(
    role,
    user.roles,
    status,
    training.tracking
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
    process({
      approved: 0
    })
  }

  const result = (
    <strong>{isCancelled ? 'CANCELLED' : isApproved ? 'APPROVED' : ''}</strong>
  )

  const title = <strong>QA/QC Approval</strong>

  if (!canView) {
    return null
  }

  return (
    <Task
      title={title}
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
      approveLabel="Approve"
      rejectLabel="Reject"
      isSubmitting={isSubmitting}
    ></Task>
  )
}

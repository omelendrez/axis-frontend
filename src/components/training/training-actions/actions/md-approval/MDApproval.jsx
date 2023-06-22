import { useState } from 'react'
import { Task } from '@/components'

import description from './description'
import useApiMessages from '@/hooks/useApiMessages'
import { MDApproval as approval } from '@/services'
import { TRAINING_STATUS } from '@/helpers'

export const MDApproval = ({ training, onUpdate }) => {
  const { apiMessage } = useApiMessages()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { id, status_id: status } = training
  const isCancelled = status === TRAINING_STATUS.CANCELLED

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
    <strong>
      {status === TRAINING_STATUS.CANCELLED
        ? 'CANCELLED'
        : status >= TRAINING_STATUS.MD
        ? 'APPROVED'
        : ''}
    </strong>
  )

  const title = <strong>MD Approval</strong>

  return (
    <Task
      title={title}
      description={
        status < TRAINING_STATUS.MD ? (
          description
        ) : (
          <div className="description-large">{result}</div>
        )
      }
      className="md-approval"
      onApprove={status < TRAINING_STATUS.MD ? handleApprove : null}
      onReject={status < TRAINING_STATUS.MD ? handleReject : null}
      approveDisabled={isCancelled}
      rejectDisabled={isCancelled}
      approveLabel="Approve"
      rejectLabel="Reject"
      isSubmitting={isSubmitting}
    ></Task>
  )
}

import { useState } from 'react'
import { Task } from '@/components'

import description from './description'
import useApiMessages from '@/hooks/useApiMessages'
import { QAApproval as approval } from '@/services'
import { TRAINING_STATUS } from '@/helpers'

export const QAApproval = ({ training, onUpdate }) => {
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
        : status >= TRAINING_STATUS.QA
        ? 'APPROVED'
        : ''}
    </strong>
  )

  const title = <strong>QA/QC Approval</strong>

  return (
    <Task
      title={title}
      description={
        status < TRAINING_STATUS.QA ? (
          description
        ) : (
          <div className="description-large">{result}</div>
        )
      }
      className="md-approval"
      onApprove={status < TRAINING_STATUS.QA ? handleApprove : null}
      onReject={status < TRAINING_STATUS.QA ? handleReject : null}
      approveDisabled={isCancelled}
      rejectDisabled={isCancelled}
      approveLabel="Approve"
      rejectLabel="Reject"
      isSubmitting={isSubmitting}
    ></Task>
  )
}

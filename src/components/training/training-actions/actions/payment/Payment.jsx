import { useState } from 'react'
import { Task } from '../../Task'

import description from './description'
import useApiMessages from '@/hooks/useApiMessages'
import { financeApproval } from '@/services/api/approvals'
import { TRAINING_STATUS } from '@/helpers'

export const Payment = ({ training, onUpdate }) => {
  const { apiMessage } = useApiMessages()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { id, status_id: status, finance_status: financeStatus } = training
  const isCancelled = status === TRAINING_STATUS.CANCELLED

  const process = (payload) => {
    setIsSubmitting(true)

    financeApproval(id, payload)
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
      PAYMENT
      {financeStatus === null
        ? ' PENDING'
        : financeStatus === 0
        ? ' NOT RECEIVED'
        : ' RECEIVED'}
    </strong>
  )
  const title = <strong>Payment</strong>

  return (
    <Task
      title={title}
      description={
        financeStatus === null ? (
          description
        ) : (
          <div className="description-large">{result}</div>
        )
      }
      className="payment"
      onApprove={financeStatus === null ? handleApprove : null}
      onReject={financeStatus === null ? handleReject : null}
      approveDisabled={isCancelled}
      rejectDisabled={isCancelled}
      approveLabel="Paid"
      rejectLabel="Not paid"
      isSubmitting={isSubmitting}
    ></Task>
  )
}

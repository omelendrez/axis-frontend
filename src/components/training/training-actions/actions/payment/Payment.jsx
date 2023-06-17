import { useState } from 'react'
import { Task } from '../../Task'

import description from './description'
import useApiMessages from '../../../../../hooks/useApiMessages'
import { financeApproval } from '../../../../../services/api/approvals'

export const Payment = ({ training, onUpdate }) => {
  const { apiMessage } = useApiMessages()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const process = (id, payload) => {
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
    process(training.id, {
      approved: 1
    })
  }

  const handleReject = (e) => {
    e.preventDefault()
    process(training.id, {
      approved: 0
    })
  }

  const result = (
    <strong>
      PAYMENT
      {training.finance_status === null
        ? ' PENDING'
        : training.finance_status === 0
        ? ' NOT RECEIVED'
        : ' RECEIVED'}
    </strong>
  )
  const title = <strong>Payment</strong>

  return (
    <Task
      title={title}
      description={
        training.finance_status === null ? (
          description
        ) : (
          <div className="description-large">{result}</div>
        )
      }
      className="payment"
      onApprove={training.finance_status === null ? handleApprove : null}
      onReject={training.finance_status === null ? handleReject : null}
      approveLabel="Paid"
      rejectLabel="Not paid"
      isSubmitting={isSubmitting}
    ></Task>
  )
}

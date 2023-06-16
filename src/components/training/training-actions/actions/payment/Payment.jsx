import { useState } from 'react'
import { Task } from '../../Task'

import description from './description'
import useApiMessages from '../../../../../hooks/useApiMessages'
import { financeApproval } from '../../../../../services/api/approvals'
import './payment.css'

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
      finance_status: 1
    })
  }

  const handleReject = (e) => {
    e.preventDefault()
    process(training.id, {
      finance_status: 0
    })
  }

  const title = (
    <strong>
      PAYMENT
      {training.finance_status === null
        ? ' PENDING'
        : training.finance_status === 0
        ? ' NOT RECEIVED'
        : ' RECEIVED'}
    </strong>
  )

  return (
    <Task
      title="Accounts"
      description={training.finance_status === null ? description : title}
      className="payment"
      onApprove={training.finance_status === null ? handleApprove : null}
      onReject={training.finance_status === null ? handleReject : null}
      approveLabel="Paid"
      rejectLabel="Not paid"
      isSubmitting={isSubmitting}
    ></Task>
  )
}

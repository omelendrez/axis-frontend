import { useState } from 'react'
import { Task } from '@/components'

import description from './description'
import useApiMessages from '@/hooks/useApiMessages'
import { financeApproval } from '@/services'
import { getUserAuth } from '@/helpers'

export const Payment = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { id, status_id: status, finance_status: financeStatus } = training

  const { isApproved, isCancelled, canView } = getUserAuth(
    role,
    user.roles,
    status,
    training.tracking
  )

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
      {!isApproved
        ? ' PENDING'
        : financeStatus === 0
        ? ' NOT RECEIVED'
        : ' RECEIVED'}
    </strong>
  )
  const title = <strong>Payment</strong>

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
      className="payment"
      onApprove={!isApproved ? handleApprove : null}
      onReject={!isApproved ? handleReject : null}
      approveDisabled={isCancelled}
      rejectDisabled={isCancelled}
      approveLabel="Paid"
      rejectLabel="Not paid"
      isSubmitting={isSubmitting}
    ></Task>
  )
}

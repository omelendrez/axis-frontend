import { useState } from 'react'
import { Task } from '@/components'

import description from './description'
import { Status } from '../status-container/Status'
import useApiMessages from '@/hooks/useApiMessages'
import { financeApproval } from '@/services'
import { TRAINING_STATUS, getUserAuth } from '@/helpers'

export const Payment = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    id,
    status_id: status,
    finance_status: financeStatus,
    tracking
  } = training

  const trackingRecord = tracking.find(
    (t) => t.status_id === TRAINING_STATUS.FINANCE
  )

  const { isApproved, isCancelled, canView, canApprove } = getUserAuth(
    role,
    roles,
    status,
    tracking
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
      status={<Status trackingRecord={trackingRecord} />}
      description={
        isApproved ? (
          <div className="description-large">{result}</div>
        ) : (
          description
        )
      }
      className="payment"
      onApprove={canApprove ? handleApprove : null}
      onReject={canApprove ? handleReject : null}
      approveDisabled={isCancelled}
      rejectDisabled={isCancelled}
      approveLabel="Paid"
      rejectLabel="Not paid"
      isSubmitting={isSubmitting}
    ></Task>
  )
}

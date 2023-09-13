import { useState } from 'react'
import { Task } from '@/components'

import description from './description'
import { Status } from '../status-container/Status'
import useApiMessages from '@/hooks/useApiMessages'
import { accountsApproval, cancelTraining, saveReason } from '@/services'
import { TRAINING_STATUS, getUserAuth } from '@/helpers'

export const Payment = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { id, status_id: status, tracking } = training

  const trackingRecord = tracking.find(
    (t) => t.status_id === TRAINING_STATUS.ACCOUNTS_DONE
  )

  const { isApproved, isCancelled, canView, canApprove } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )

  const process = (payload) => {
    setIsSubmitting(true)

    accountsApproval(id, payload)
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
    const payload = {
      reason: 'The payment was not made.'
    }
    cancelTraining(id)
      .then((res) => {
        saveReason(id, payload).then(() => {
          onUpdate()
          apiMessage(res)
        })
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const result = (
    <strong>
      PAYMENT
      {!isApproved ? ' NOT RECEIVED' : ' RECEIVED'}
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

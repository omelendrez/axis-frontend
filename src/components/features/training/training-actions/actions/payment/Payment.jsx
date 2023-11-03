import { useEffect, useState } from 'react'

import { Modal, Preview, Task } from '@/components'
import { PaymentUpload } from './PaymentUpload'

import description from './description'
import { Status } from '../status-container/Status'
import useApiMessages from '@/hooks/useApiMessages'
import {
  accountsApproval,
  cancelTraining,
  saveReason,
  getPaymentUrl,
  paymentExists
} from '@/services'
import { TRAINING_STATUS, documentNumber, getUserAuth } from '@/helpers'

export const Payment = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const [update, setUpdate] = useState(false)

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isImage, setIsImage] = useState(false)

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
  const imageUrl = getPaymentUrl(id)

  useEffect(() => {
    paymentExists(id)
      .then((res) => setIsImage(res.data.exists))
      .catch((e) => apiMessage(e))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update])

  const handleScan = (e) => {
    e.preventDefault()
    setIsFormOpen(true)
  }

  const handleClose = (e) => {
    e?.preventDefault()
    setIsFormOpen(false)

    onUpdate()
    setUpdate((u) => !u)
  }

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
    >
      <div className="payment-children">
        {isImage && <Preview imageUrl={imageUrl} />}

        {canApprove && (
          <div className="buttons">
            <button onClick={handleScan} disabled={isCancelled}>
              {isImage ? 'Re-upload' : 'upload'}
            </button>
          </div>
        )}
      </div>

      <Modal open={isFormOpen} title="upload payment" onClose={handleClose}>
        <div className="form-container">
          <PaymentUpload onClose={handleClose} fileName={documentNumber(id)} />
        </div>
      </Modal>
    </Task>
  )
}

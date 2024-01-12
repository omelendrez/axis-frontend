import { useEffect, useState } from 'react'

import { Task, RejectReasonForm } from '@/components'

import useApiMessages from '@/hooks/useApiMessages'

import {
  adminApproval,
  cancelTraining,
  saveReason,
  generateWelcomeLetter,
  getWelcomeLetterUrl,
  welcomeLetterExists,
  sendWelcomeLetter,
  getBucketDocumentUrl
} from '@/services'

import { TRAINING_STATUS, getUserAuth } from '@/helpers'

import { Status } from '../status-container/Status'

import './welcome-letter.css'

export const WelcomeLetter = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const [url, setUrl] = useState(null)

  const { roles } = user

  const { id, status_id: status, tracking, contact_info: emails } = training

  const trackingRecord = tracking.find(
    (t) => t.status_id === TRAINING_STATUS.ADMIN_DONE
  )

  const { canView, canApprove, isCancelled } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRejectReasonOpen, setIsRejectReasonOpen] = useState(false)

  const [update, setUpdate] = useState(false)

  const [isDoc, setIsDoc] = useState(false)

  const [isSent, setIsSent] = useState(false)

  const documentUrl = getWelcomeLetterUrl(id)

  useEffect(() => {
    welcomeLetterExists(id)
      .then((res) => {
        getBucketDocumentUrl(documentUrl).then((res) => setUrl(res.data))
        setIsDoc(res.data.exists)
      })
      .catch((e) => apiMessage(e))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update])

  const approve = (payload) => {
    setIsSubmitting(true)

    adminApproval(id, payload)
      .then((res) => {
        onUpdate()
        apiMessage(res)
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const cancel = (reason) => {
    setIsSubmitting(true)

    cancelTraining(id)
      .then((res) => {
        const payload = { reason }
        saveReason(id, payload).then(() => {
          onUpdate()
          apiMessage(res)
        })
        setIsRejectReasonOpen(false)
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const handleApprove = (e) => {
    e.preventDefault()
    approve({
      approved: 1
    })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setIsRejectReasonOpen(true)
  }

  const handleRejectReasonCancel = () => {
    setIsRejectReasonOpen(false)
  }

  const handleRejectReasonReject = (reason) => {
    cancel(reason)
  }

  const handleGenerate = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      ...training,
      user
    }

    generateWelcomeLetter(id, payload)
      .then((res) => {
        const data = {
          message: `${res.data.Title} for ${res.data.Subject}, generated Successfully!`
        }
        apiMessage({ data })
        setUpdate((u) => !u)
        onUpdate()
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const handleSendLetter = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const email = emails[0].value
    const payload = {
      ...training,
      to: email,
      user
    }

    sendWelcomeLetter(id, payload)
      .then((res) => {
        const data = {
          message: `${res.data.subject} email, sent Successfully!`
        }
        apiMessage({ data })
        // setUpdate((u) => !u)
        setIsSent(true)
        setIsSubmitting(false)
        // onUpdate()
      })
      .catch((e) => apiMessage(e))
  }

  const props = {
    type: 'application/pdf'
  }

  if (!canView) {
    return null
  }

  const title = <strong>Welcome Letter</strong>

  return (
    <>
      <Task
        key={title}
        title={title}
        status={<Status trackingRecord={trackingRecord} />}
        className="welcome-letter"
        approveLabel="Approve"
        rejectLabel="Cancel"
        description={
          canApprove && (
            <div className="buttons">
              <button
                onClick={handleGenerate}
                disabled={isCancelled}
                aria-busy={isSubmitting}
              >
                {isDoc ? 'Re-generate' : 'generate'}
              </button>
              {isDoc && emails.length === 0 ? (
                <button disabled className="missing-email">
                  No email address
                </button>
              ) : (
                isDoc && (
                  <div className="send-button-container">
                    <button
                      onClick={handleSendLetter}
                      disabled={isCancelled || isSent}
                      aria-busy={isSubmitting}
                    >
                      Send letter
                    </button>
                    <div className="emails-list">
                      {emails.map((e) => (
                        <div key={e.value}>{e.value}</div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )
        }
        onApprove={canApprove ? handleApprove : null}
        onReject={canApprove ? handleCancel : null}
        approveDisabled={isCancelled}
        rejectDisabled={isCancelled}
        isSubmitting={isSubmitting}
      >
        {isDoc && (
          <figure>
            <object data={url} {...props} className="welcome-letter">
              <embed src={url} {...props} className="welcome-letter" />
            </object>
          </figure>
        )}
      </Task>
      <RejectReasonForm
        title="Cancel reason"
        placeholder="Enter the reason why you are cancelling this training record"
        rejectLabel="cancel"
        closeLabel="exit"
        open={isRejectReasonOpen}
        onCancel={handleRejectReasonCancel}
        onReject={handleRejectReasonReject}
      />
    </>
  )
}

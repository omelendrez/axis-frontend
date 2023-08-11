import { useEffect, useState } from 'react'

import { Task } from '@/components'

import useApiMessages from '@/hooks/useApiMessages'

import {
  adminApproval,
  generateWelcomeLetter,
  getWelcomeLetterUrl,
  welcomeLetterExists,
  sendWelcomeLetter
} from '@/services'

import { TRAINING_STATUS, getUserAuth } from '@/helpers'

import { Status } from '../status-container/Status'

import './welcome-letter.css'

export const WelcomeLetter = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const { id, status_id: status, tracking } = training

  const trackingRecord = tracking.find(
    (t) => t.status_id === TRAINING_STATUS.ADMIN
  )

  const { canView, canUpdate, isCancelled } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [update, setUpdate] = useState(false)

  const [isDoc, setIsDoc] = useState(false)

  const documentUrl = getWelcomeLetterUrl(id)

  useEffect(() => {
    welcomeLetterExists(id)
      .then((res) => setIsDoc(res.data.exists))
      .catch((e) => apiMessage(e))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update])

  const process = (payload) => {
    setIsSubmitting(true)

    adminApproval(id, payload)
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

  const handleGenerate = (e) => {
    e.preventDefault()
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
  }

  const handleSendLetter = (e) => {
    e.preventDefault()
    const payload = {
      ...training,
      to: 'omar.melendrez@gmail.com',
      user
    }

    sendWelcomeLetter(id, payload)
      .then((res) => {
        const data = {
          message: `${res.data.subject} email, sent Successfully!`
        }
        apiMessage({ data })
        setUpdate((u) => !u)
        onUpdate()
      })
      .catch((e) => apiMessage(e))
  }

  const props = {
    type: 'application/pdf'
  }

  if (!canView) {
    return null
  }

  return (
    <Task
      title="Welcome Letter"
      status={<Status trackingRecord={trackingRecord} />}
      className="welcome-letter"
      approveLabel="Approve"
      rejectLabel="Reject"
      description={
        canUpdate && (
          <div className="buttons">
            <button onClick={handleGenerate} disabled={isCancelled}>
              {isDoc ? 'Re-generate' : 'generate'}
            </button>
            {isDoc && (
              <button onClick={handleSendLetter} disabled={isCancelled}>
                Send letter
              </button>
            )}
          </div>
        )
      }
      onApprove={canUpdate ? handleApprove : null}
      onReject={canUpdate ? handleReject : null}
      approveDisabled={isCancelled}
      rejectDisabled={isCancelled}
      isSubmitting={isSubmitting}
    >
      {isDoc && (
        <figure>
          <object data={documentUrl} {...props} className="welcome-letter">
            <embed src={documentUrl} {...props} className="welcome-letter" />
          </object>
        </figure>
      )}
    </Task>
  )
}

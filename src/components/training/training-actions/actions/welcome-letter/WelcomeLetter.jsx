import { Task } from '@/components'
import {
  generateWelcomeLetter,
  getWelcomeLetterUrl,
  welcomeLetterExists
} from '@/services'
import useApiMessages from '@/hooks/useApiMessages'

import { TRAINING_STATUS, getUserAuth } from '@/helpers'
import './print.css'
import { useEffect, useState } from 'react'
import { Status } from '../status-container/Status'

export const WelcomeLetter = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const { id, status_id: status, tracking } = training

  const trackingRecord = tracking.find(
    (t) => t.status_id === TRAINING_STATUS.ADMIN
  )

  const { canView, canUpdate } = getUserAuth(role, roles, status, tracking)

  const [update, setUpdate] = useState(false)

  const [isDoc, setIsDoc] = useState(false)

  const documentUrl = getWelcomeLetterUrl(id)

  useEffect(() => {
    welcomeLetterExists(id)
      .then((res) => setIsDoc(res.data.exists))
      .catch((e) => apiMessage(e))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update])

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
      approveLabel={isDoc ? 'Re-generate' : 'Generate'}
      approveDisabled={!canUpdate}
      rejectLabel="Print"
      onApprove={canUpdate ? handleGenerate : null}
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

import { Task } from '@/components'
import {
  generateWelcomeLetter,
  getWelcomeLetterUrl,
  welcomeLetterExists
} from '@/services'
import useApiMessages from '@/hooks/useApiMessages'

import { getUserAuth } from '@/helpers'
import './print.css'
import { useEffect, useState } from 'react'

export const WelcomeLetter = ({ training, type, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const { id, status_id: status, tracking } = training

  const { canView, canUpdate } = getUserAuth(role, roles, status, tracking)

  const [refresh, setRefresh] = useState(false)

  const [isDoc, setIsDoc] = useState(false)

  const documentUrl = getWelcomeLetterUrl(id)

  useEffect(() => {
    welcomeLetterExists(id)
      .then((res) => setIsDoc(res.data.exists))
      .catch((e) => apiMessage(e))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

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
        setRefresh((r) => !r)
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

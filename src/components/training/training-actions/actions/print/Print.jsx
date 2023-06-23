import { Task } from '@/components'
import {
  generateCertificate,
  generateIdCard,
  getCertificateUrl,
  getIdCardUrl,
  certificateExists,
  idCardExists
} from '@/services'
import useApiMessages from '@/hooks/useApiMessages'

import { DOC_TYPE, getUserAuth } from '@/helpers'
import './print.css'
import { useEffect, useState } from 'react'

export const Print = ({ training, type, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { id, status_id: status } = training

  const { isCancelled, canView, canUpdate } = getUserAuth(
    role,
    user.roles,
    status,
    training.tracking
  )

  const [refresh, setRefresh] = useState(false)

  const [isDoc, setIsDoc] = useState(false)

  const documentUrl =
    type === DOC_TYPE.CERTIFICATE ? getCertificateUrl(id) : getIdCardUrl(id)

  const generate =
    type === DOC_TYPE.CERTIFICATE ? generateCertificate : generateIdCard

  const docExists =
    type === DOC_TYPE.CERTIFICATE ? certificateExists : idCardExists

  useEffect(() => {
    docExists(id)
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

    generate(id, payload)
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
      title={type === DOC_TYPE.CERTIFICATE ? 'Certificate' : 'ID Card'}
      className="document"
      approveLabel={isDoc ? 'Re-generate' : 'Generate'}
      approveDisabled={!canUpdate || isCancelled}
      rejectLabel="Print"
      onApprove={canUpdate && !isCancelled ? handleGenerate : null}
    >
      {isDoc && (
        <figure>
          <object
            data={documentUrl}
            {...props}
            className={
              type === DOC_TYPE.CERTIFICATE ? 'certificate' : 'id-card'
            }
          >
            <embed
              src={documentUrl}
              {...props}
              className={
                type === DOC_TYPE.CERTIFICATE ? 'certificate' : 'id-card'
              }
            />
          </object>
        </figure>
      )}
    </Task>
  )
}

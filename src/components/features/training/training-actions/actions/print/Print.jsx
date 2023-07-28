import { useEffect, useState } from 'react'
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
import { Status } from '../status-container/Status'

import { DOC_TYPE, TRAINING_STATUS, getUserAuth } from '@/helpers'
import './print.css'

export const Print = ({ training, onUpdate, type, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const { id, status_id: status, id_card, tracking } = training

  const trackingRecord = tracking.find(
    (t) =>
      t.status_id ===
      (type === DOC_TYPE.CERTIFICATE
        ? TRAINING_STATUS.CERT_PRINT
        : TRAINING_STATUS.ID_CARD_PRINT)
  )

  const { isCancelled, canView, canUpdate } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )

  const [isDoc, setIsDoc] = useState(false)

  const documentUrl =
    type === DOC_TYPE.CERTIFICATE ? getCertificateUrl(id) : getIdCardUrl(id)

  const generate =
    type === DOC_TYPE.CERTIFICATE ? generateCertificate : generateIdCard

  const docExists =
    type === DOC_TYPE.CERTIFICATE ? certificateExists : idCardExists

  const isPrinted =
    type === DOC_TYPE.CERTIFICATE
      ? status >= TRAINING_STATUS.CERT_PRINT
      : status >= TRAINING_STATUS.ID_CARD_PRINT

  useEffect(() => {
    docExists(id)
      .then((res) => setIsDoc(res.data.exists))
      .catch((e) => apiMessage(e))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        onUpdate()
      })
      .catch((e) => apiMessage(e))
  }

  const props = {
    type: 'application/pdf'
  }

  if (
    !canView ||
    (role === TRAINING_STATUS.ID_CARD_PRINT && parseInt(id_card, 10) !== 1)
  ) {
    return null
  }

  const handleMarkAsPrinted = (e) => {
    e.preventDefault()

    console.log('MarkAsPrinted')
  }

  return (
    <Task
      title={type === DOC_TYPE.CERTIFICATE ? 'Certificate' : 'ID Card'}
      status={<Status trackingRecord={trackingRecord} />}
      className="print"
      description={
        isPrinted ? (
          <center>
            This document is already printed{' '}
            <span className="material-icons">check</span>
          </center>
        ) : null
      }
      approveLabel={isDoc ? 'Re-generate' : 'Generate'}
      approveDisabled={!canUpdate || isCancelled}
      rejectLabel="Mark as printed"
      onReject={isDoc && !isPrinted ? handleMarkAsPrinted : null}
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

import { useEffect, useState } from 'react'
import { Divider, Task } from '@/components'
import { Status } from '../status-container/Status'

import {
  generateCertificate,
  generateIdCard,
  getCertificateUrl,
  getIdCardUrl,
  certificateExists,
  idCardExists,
  certificatePrintDone,
  idCardPrintDone,
  saveOpitoFields
} from '@/services'

import useApiMessages from '@/hooks/useApiMessages'

import { CERT_TYPE, DOC_TYPE, TRAINING_STATUS, getUserAuth } from '@/helpers'

import './print.css'

const defaultOpitoFieldsValues = {
  learnerId: '',
  certificateNo: ''
}

export const Print = ({ training, onUpdate, type, role, user }) => {
  const { apiMessage } = useApiMessages()

  const isCertificate = type === DOC_TYPE.CERTIFICATE

  const { roles } = user

  const {
    id,
    status_id: status,
    course: { id_card, cert_type },
    tracking
  } = training

  const trackingRecord = tracking.find(
    (t) =>
      t.status_id ===
      (isCertificate
        ? TRAINING_STATUS.CERT_PRINT_DONE
        : TRAINING_STATUS.ID_CARD_PRINT_DONE)
  )

  const { isCancelled, canView, canUpdate } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )

  const [isDoc, setIsDoc] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [opitoFields, setOpitoFields] = useState(defaultOpitoFieldsValues)

  const documentUrl = isCertificate ? getCertificateUrl(id) : getIdCardUrl(id)

  const generate = isCertificate ? generateCertificate : generateIdCard

  const docExists = isCertificate ? certificateExists : idCardExists

  const markAsPrinted = isCertificate ? certificatePrintDone : idCardPrintDone

  const isPrinted = isCertificate
    ? status >= TRAINING_STATUS.CERT_PRINT_DONE
    : status >= TRAINING_STATUS.ID_CARD_PRINT_DONE

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

    if (isOpito) {
      const data = {
        message: 'Anduvio!'
      }
      apiMessage({ data })
      return console.log(payload)
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

  const handleMarkAsPrinted = (e) => {
    e.preventDefault()
    const hasId = parseInt(id_card, 10)
    const payload = { hasId }
    markAsPrinted(id, payload)
      .then((res) => {
        onUpdate()
        apiMessage(res)
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const embedClass = isCertificate ? 'certificate' : 'id-card'
  const title = isCertificate ? 'Certificate' : 'ID Card'
  const isOpito = cert_type === CERT_TYPE.OPITO

  const handleOpitoFieldsChange = (e) => {
    e.preventDefault()
    setOpitoFields((of) => ({ ...of, [e.target.id]: e.target.value }))
  }

  const handleSaveFields = (e) => {
    e.preventDefault()

    saveOpitoFields(id, opitoFields)
      .then((res) => apiMessage(res))
      .catch((e) => apiMessage(e))
  }

  let buttonLabel = ''

  if (isCertificate) {
    if (isOpito) {
      buttonLabel = isDoc ? 'Re-upload' : 'Upload'
    } else {
      buttonLabel = isDoc ? 'Re-generate' : 'Generate'
    }
  }

  if (!canView || (type === DOC_TYPE.ID_CARD && parseInt(id_card, 10) !== 1)) {
    return null
  }

  return (
    <Task
      title={title}
      status={<Status trackingRecord={trackingRecord} />}
      className="print"
      description={
        isPrinted ? (
          <center>
            This document is already printed
            <span className="material-icons">check</span>
          </center>
        ) : null
      }
      approveLabel={buttonLabel}
      approveDisabled={!canUpdate || isCancelled || isSubmitting}
      rejectLabel="Mark as printed"
      rejectDisabled={!canUpdate || isCancelled || isSubmitting}
      onReject={isDoc && !isPrinted ? handleMarkAsPrinted : null}
      onApprove={canUpdate && !isCancelled ? handleGenerate : null}
    >
      {isOpito && isCertificate && (
        <div className="opito-fields">
          <label htmlFor="learnerId">Learner Id:</label>
          <input
            type="text"
            id="learnerId"
            placeholder="Enter learner Id"
            onChange={handleOpitoFieldsChange}
            value={opitoFields.learnerId}
          />
          <label htmlFor="certificateNo">Certificate #:</label>
          <input
            type="text"
            id="certificateNo"
            placeholder="Enter certificate #"
            onChange={handleOpitoFieldsChange}
            value={opitoFields.certificateNo}
          />
          <button className="button" onClick={handleSaveFields}>
            Save
          </button>
          <Divider style={{ marginTop: '1rem' }} />
        </div>
      )}
      {isDoc && (
        <figure>
          <object data={documentUrl} {...props} className={embedClass}>
            <embed src={documentUrl} {...props} className={embedClass} />
          </object>
        </figure>
      )}
    </Task>
  )
}

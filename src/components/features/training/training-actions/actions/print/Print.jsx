import { useEffect, useState } from 'react'
import { Divider, Modal, Task } from '@/components'
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
  saveOpitoFields,
  getBucketDocumentUrl
} from '@/services'

import useApiMessages from '@/hooks/useApiMessages'

import {
  CERT_TYPE,
  DOC_TYPE,
  TRAINING_STATUS,
  USER_ROLE,
  documentNumber,
  getUserAuth
} from '@/helpers'

import { CertificateUpload } from './CertificateUpload'

import './print.css'

export const Print = ({ training, onUpdate, type, role, user }) => {
  const { apiMessage } = useApiMessages()

  const isCertificate = type === DOC_TYPE.CERTIFICATE

  const { roles } = user

  const isPrinter = Boolean(roles.find((r) => r.id === USER_ROLE.PRINTER))

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

  const { isCancelled, canView, isComplete } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )

  const [isDoc, setIsDoc] = useState(false)

  const [url, setUrl] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [opitoFields, setOpitoFields] = useState({
    learnerId: '',
    certificateNo: ''
  })

  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false)

  const documentUrl = isCertificate ? getCertificateUrl(id) : getIdCardUrl(id)

  const generate = isCertificate ? generateCertificate : generateIdCard

  const docExists = isCertificate ? certificateExists : idCardExists

  const markAsPrinted = isCertificate ? certificatePrintDone : idCardPrintDone

  const isPrinted = isCertificate
    ? status >= TRAINING_STATUS.CERT_PRINT_DONE
    : status >= TRAINING_STATUS.ID_CARD_PRINT_DONE

  useEffect(() => {
    docExists(id)
      .then((res) => {
        setIsDoc(res.data.exists)
        if (res.data.exists) {
          getBucketDocumentUrl(documentUrl).then((res) => setUrl(res.data))
        }
      })
      .catch((e) => apiMessage(e))

    return () => setIsDoc(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [training])

  useEffect(() => {
    if (training.id) {
      const { opito_learner, certificate } = training
      setOpitoFields({ learnerId: opito_learner, certificateNo: certificate })
    }
  }, [training])

  const handleGenerate = (e) => {
    e.preventDefault()

    setIsDoc(false)

    const payload = {
      ...training,
      user
    }

    if (isOpito && isCertificate) {
      return setIsUploadFormOpen(true)
    } else {
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
    setOpitoFields((fields) => ({ ...fields, [e.target.id]: e.target.value }))
  }

  const handleSaveFields = (e) => {
    e.preventDefault()

    saveOpitoFields(id, opitoFields)
      .then((res) => apiMessage(res))
      .catch((e) => apiMessage(e))
  }

  const handleClose = (e) => {
    e?.preventDefault()
    setIsUploadFormOpen(false)
    onUpdate()
  }

  let buttonLabel = isDoc ? 'Re-generate' : 'Generate'

  if (isCertificate && isOpito) {
    buttonLabel = isDoc ? 'Re-upload' : 'Upload'
  }

  if (
    !canView ||
    (type === DOC_TYPE.ID_CARD && parseInt(id_card, 10) !== 1) ||
    !opitoFields?.learnerId
  ) {
    return null
  }

  const { learnerId, certificateNo } = opitoFields

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
      approveDisabled={isComplete || isSubmitting}
      rejectLabel="Mark as printed"
      rejectDisabled={isComplete || isSubmitting}
      onReject={isDoc && !isPrinted && isPrinter ? handleMarkAsPrinted : null}
      onApprove={
        !isComplete && !isCancelled && isPrinter ? handleGenerate : null
      }
    >
      {isOpito && isCertificate && (
        <div className="opito-fields">
          <label htmlFor="learnerId">Learner Id:</label>
          {isComplete && <div className="opito-field">{learnerId}</div>}
          {!isComplete && (
            <input
              type="text"
              id="learnerId"
              placeholder="Enter learner Id"
              onChange={handleOpitoFieldsChange}
              value={learnerId}
              readOnly={isComplete}
            />
          )}
          <label htmlFor="certificateNo">Certificate #:</label>
          {isComplete && <div className="opito-field">{certificateNo}</div>}

          {!isComplete && (
            <input
              type="text"
              id="certificateNo"
              placeholder="Enter certificate #"
              onChange={handleOpitoFieldsChange}
              value={certificateNo}
              readOnly={isComplete}
            />
          )}
          {!isComplete && (
            <button className="button" onClick={handleSaveFields}>
              Save
            </button>
          )}
          <Divider style={{ marginTop: '1rem' }} />
        </div>
      )}
      {isDoc && (
        <figure>
          <object data={url} {...props} className={embedClass}>
            <embed src={url} {...props} className={embedClass} />
          </object>
        </figure>
      )}
      <Modal
        open={isUploadFormOpen}
        title="opito certificate"
        onClose={handleClose}
      >
        <div className="form-container">
          <CertificateUpload
            onClose={handleClose}
            fileName={documentNumber(id)}
          />
        </div>
      </Modal>
    </Task>
  )
}

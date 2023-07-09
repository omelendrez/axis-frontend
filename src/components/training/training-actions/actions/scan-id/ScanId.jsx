import { useEffect, useState } from 'react'
import { Modal, IdCardUpload, Task, Preview } from '@/components'
import { Status } from '../status-container/Status'
import useApiMessages from '@/hooks/useApiMessages'
import {
  frontdeskApproval,
  learnerIdCardExists,
  getLearnerIdUrl,
  generateOpitoCertificate
} from '@/services'
import { TRAINING_STATUS, getUserAuth } from '@/helpers'
import './scanId.css'
import { getOpitoRecords } from '@/services/api/opito'

export const ScanId = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const [opitoFile, setOpitoFile] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isPhotoOpen, setIsPhotoOpen] = useState(false)

  const [isImage, setIsImage] = useState(false)

  const { id, status_id: status, badge, tracking } = training

  const trackingRecord = tracking.find(
    (t) => t.status_id === TRAINING_STATUS.FRONTDESK
  )

  const { canApprove, isCancelled, canView, canUpdate } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )

  const imageUrl = getLearnerIdUrl(badge)

  useEffect(() => {
    learnerIdCardExists(badge)
      .then((res) => setIsImage(res.data.exists))
      .catch((e) => apiMessage(e))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const process = (payload) => {
    setIsSubmitting(true)

    frontdeskApproval(id, payload)
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

  const handleScan = (e) => {
    e.preventDefault()
    setIsPhotoOpen(true)
  }

  const handleClose = (e) => {
    e?.preventDefault()
    setIsPhotoOpen(false)
    onUpdate()
  }

  const title = <strong>Learner id card</strong>

  if (!canView) {
    return null
  }

  const handleOpito = (e) => {
    e.preventDefault()
    getOpitoRecords()
      .then((res) => {
        if (res.data.length === 0) {
          const message = {
            data: {
              message: 'There are no records pending to be processed'
            }
          }
          apiMessage(message)
        } else {
          const { data } = res
          const invalidRecords = data.filter((r) => r.front_id === '')
          if (invalidRecords.length > 0) {
            const { opito_reg_code: code } = invalidRecords[0]
            const message = {
              response: {
                data: {
                  message: `Missing course Front ID text (Check course with Opito Reg. Code ${code})`
                }
              }
            }
            return apiMessage(message)
          }

          const payload = {
            records: data
          }
          generateOpitoCertificate(payload)
            .then((res) => {
              setOpitoFile(res.data.file.substring(1))
              apiMessage(res)
            })
            .catch((e) => apiMessage(e))
        }
      })
      .catch((e) => apiMessage(e))
  }

  return (
    <Task
      title={title}
      status={<Status trackingRecord={trackingRecord} />}
      className="scan-id"
      onApprove={canApprove ? handleApprove : null}
      onReject={canApprove ? handleReject : null}
      approveDisabled={isCancelled}
      rejectDisabled={isCancelled}
      isSubmitting={isSubmitting}
    >
      <div className="scan-id-children">
        {isImage && <Preview imageUrl={imageUrl} />}

        {opitoFile && (
          <a
            href={`${import.meta.env.VITE_ASSETS_URL}${opitoFile}`}
            alt={opitoFile}
            target="_blank"
            rel="noreferrer"
          >
            {opitoFile}
          </a>
        )}

        {canUpdate && (
          <div className="buttons">
            <button onClick={handleScan} disabled={isCancelled}>
              {isImage ? 'Re-scan Id' : 'Scan Id'}
            </button>
            {false && <button onClick={handleOpito}>Generate xlsx</button>}
          </div>
        )}
      </div>

      <Modal open={isPhotoOpen} title="Scan Id card" onClose={handleClose}>
        <div className="form-container">
          <IdCardUpload onClose={handleClose} badge={badge} />
        </div>
      </Modal>
    </Task>
  )
}

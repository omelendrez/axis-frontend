import { useState } from 'react'
import { Task } from '@/components'
import { Status } from '../status-container/Status'

import description from './description'
import useApiMessages from '@/hooks/useApiMessages'
import { medicalApproval } from '@/services'
import { TRAINING_STATUS, getUserAuth } from '@/helpers'
import './medical.css'

const initialValues = { systolic: '', diastolic: '' }

export const Medical = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [bp, setBp] = useState(initialValues)

  const handleChange = (e) =>
    setBp((bp) => ({ ...bp, [e.target.id]: e.target.value }))
  const { id, status_id: status, tracking } = training

  const trackingRecord = tracking.find(
    (t) => t.status_id === TRAINING_STATUS.MEDIC_DONE
  )

  const { isApproved, isCancelled, canView, canApprove } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )

  const process = (payload) => {
    setIsSubmitting(true)

    medicalApproval(id, payload)
      .then((res) => {
        setBp(initialValues)
        onUpdate()
        apiMessage(res)
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const handleApprove = (e) => {
    e.preventDefault()
    process({
      systolic,
      diastolic,
      approved: 1
    })
  }

  const handleReject = (e) => {
    e.preventDefault()
    process({
      systolic,
      diastolic,
      approved: 0
    })
  }

  const { systolic, diastolic } = bp

  let result = isApproved
    ? !systolic && !diastolic
      ? 'NO BP READINGS'
      : ''
    : 'PENDING'

  training.medical.forEach((md) => {
    md.bp?.forEach((p) => {
      result = (
        <div className="bp-results">
          <div>Systolic: {p.systolic}</div>
          <div>Diastolic: {p.diastolic}</div>
        </div>
      )
    })
  })

  const title = <strong>MEDIC TEST</strong>

  if (!canView || !canApprove) {
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
      className="blood-pressure"
      onApprove={canApprove ? handleApprove : null}
      onReject={canApprove ? handleReject : null}
      approveDisabled={!systolic || !diastolic || isCancelled}
      rejectDisabled={!systolic || !diastolic || isCancelled}
      isSubmitting={isSubmitting}
    >
      {!isApproved && (
        <>
          <input
            id="systolic"
            type="number"
            placeholder="Systolic"
            onChange={handleChange}
            value={systolic}
            className="bp"
            disabled={isCancelled}
          />

          <input
            id="diastolic"
            type="number"
            placeholder="Diastolic"
            onChange={handleChange}
            value={diastolic}
            className="bp"
            disabled={isCancelled}
          />
        </>
      )}
    </Task>
  )
}

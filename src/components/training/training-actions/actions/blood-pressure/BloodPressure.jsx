import { useState } from 'react'
import { Task } from '@/components'
import './bloodPressure.css'
import { medicalApproval } from '@/services/api/approvals'
import description from './description'
import useApiMessages from '@/hooks/useApiMessages'
import { TRAINING_STATUS } from '@/helpers'

export const BloodPressure = ({ training, onUpdate }) => {
  const { apiMessage } = useApiMessages()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const initialValues = { systolic: '', diastolic: '' }
  const [bp, setBp] = useState(initialValues)

  const handleChange = (e) =>
    setBp((bp) => ({ ...bp, [e.target.id]: e.target.value }))

  const { id, status_id: status } = training

  const isCancelled = status === TRAINING_STATUS.CANCELLED

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

  let result = ''

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

  const title = <strong>MEDICAL TEST</strong>

  return (
    <Task
      title={title}
      description={
        result ? <div className="description-large">{result}</div> : description
      }
      className="blood-pressure"
      onApprove={!result ? handleApprove : null}
      onReject={!result ? handleReject : null}
      approveLabel="Fit"
      rejectLabel="No fit"
      approveDisabled={!systolic || !diastolic || isCancelled}
      rejectDisabled={!systolic || !diastolic || isCancelled}
      isSubmitting={isSubmitting}
    >
      {!result && (
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

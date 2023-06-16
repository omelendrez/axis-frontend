import { useState } from 'react'
import { Task } from '../../Task'
import './bloodPressure.css'
import { medicalApproval } from '../../../../../services/api/approvals'
import description from './description'
import useApiMessages from '../../../../../hooks/useApiMessages'

export const BloodPressure = ({ training, onUpdate }) => {
  const { apiMessage } = useApiMessages()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bp, setBp] = useState({ systolic: '', diastolic: '' })

  const handleChange = (e) =>
    setBp((bp) => ({ ...bp, [e.target.id]: e.target.value }))

  const process = (id, payload) => {
    setIsSubmitting(true)

    medicalApproval(id, payload)
      .then((res) => {
        onUpdate()
        apiMessage(res)
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const handleApprove = (e) => {
    e.preventDefault()
    process(training.id, {
      systolic,
      diastolic,
      fit: 1
    })
  }

  const handleReject = (e) => {
    e.preventDefault()
    process(training.id, {
      systolic,
      diastolic,
      fit: 0
    })
  }

  const { systolic, diastolic } = bp

  return (
    <Task
      title="Blood pressure"
      description={description}
      className="blood-pressure"
      onApprove={handleApprove}
      onReject={handleReject}
      approveLabel="Fit"
      rejectLabel="No fit"
      approveDisabled={!systolic || !diastolic}
      rejectDisabled={!systolic || !diastolic}
      isSubmitting={isSubmitting}
    >
      <input
        id="systolic"
        type="number"
        placeholder="Systolic"
        onChange={handleChange}
        value={systolic}
        className="bp"
      />

      <input
        id="diastolic"
        type="number"
        placeholder="Diastolic"
        onChange={handleChange}
        value={diastolic}
        className="bp"
      />
    </Task>
  )
}

import { useState } from 'react'
import { Task } from '../../Task'
import './bloodPressure.css'
import { medicalApproval } from '../../../../../services/api/approvals'
import description from './description'
import useApiMessages from '../../../../../hooks/useApiMessages'

export const BloodPressure = ({ training, onUpdate }) => {
  const { apiMessage } = useApiMessages()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const initialValues = { systolic: '', diastolic: '' }
  const [bp, setBp] = useState(initialValues)

  const handleChange = (e) =>
    setBp((bp) => ({ ...bp, [e.target.id]: e.target.value }))

  const process = (id, payload) => {
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
    process(training.id, {
      systolic,
      diastolic,
      approved: 1
    })
  }

  const handleReject = (e) => {
    e.preventDefault()
    process(training.id, {
      systolic,
      diastolic,
      approved: 0
    })
  }

  const { systolic, diastolic } = bp

  let result = ''

  training.medical.forEach((md) => {
    md.bp?.forEach((p) => {
      result = ` ${p.systolic}/${p.diastolic}`
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
      approveDisabled={!systolic || !diastolic}
      rejectDisabled={!systolic || !diastolic}
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
          />

          <input
            id="diastolic"
            type="number"
            placeholder="Diastolic"
            onChange={handleChange}
            value={diastolic}
            className="bp"
          />
        </>
      )}
    </Task>
  )
}

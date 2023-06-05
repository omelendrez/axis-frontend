import { useState } from 'react'
import { Task } from '../Task'
import './bloodPressure.css'

export const BloodPressure = () => {
  const [bp, setBp] = useState({ systolic: '', diastolic: '' })

  const handleChange = (e) =>
    setBp((bp) => ({ ...bp, [e.target.id]: e.target.value }))

  const handleApprove = (e) => {
    e.preventDefault()
    console.log('approved')
  }

  const handleReject = (e) => {
    e.preventDefault()
    console.log('rejected')
  }

  const { systolic, diastolic } = bp

  return (
    <Task
      title="Blood pressure"
      className="blood-pressure"
      onApprove={handleApprove}
      onReject={handleReject}
      approveDisabled={!bp}
      rejectDisabled={!bp}
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

import { useState } from 'react'
import { Photo, Learner } from '../learner/learner-view'
import { Course } from './training-view'
import { Action } from './training-actions'
import { Divider } from '../shared'
import { undoLastApproval } from '../../services/api/approvals'
import useApiMessages from '../../hooks/useApiMessages'

import './trainingView.css'

const AlertCancelled = () => <div className="alert-cancelled">cancelled</div>

export const TrainingView = ({ training, onUpdate }) => {
  const { apiMessage } = useApiMessages()
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!training) {
    return (
      <article>
        <center>Record not found</center>
      </article>
    )
  }

  const handleUndo = (e) => {
    e.preventDefault()

    undoLastApproval(training.id)
      .then((res) => {
        apiMessage(res)
        onUpdate()
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  return (
    <main className="training-view">
      {training.status_id === 12 && <AlertCancelled />}
      <Photo {...training} />
      <Learner learner={{ ...training, status: undefined }} />
      <Course
        training={training}
        onUndo={handleUndo}
        isSubmitting={isSubmitting}
        onUpdate={onUpdate}
      />
      <Divider />
      <div className="actions">
        <Action training={training} onUpdate={onUpdate} />
      </div>
    </main>
  )
}

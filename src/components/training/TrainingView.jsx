import { useState } from 'react'
import { Photo, Learner } from '../learner/learner-view'
import { Course } from './training-view'
import { Action } from './training-actions'
import { Divider } from '../shared'
import { undo } from '../../services/api/approvals'
import useApiMessages from '../../hooks/useApiMessages'

import './trainingView.css'

export const TrainingView = ({ training, tracking, onUpdate }) => {
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

    undo(training.id)
      .then((res) => {
        apiMessage(res)
        onUpdate()
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }
  return (
    <main className="training-view">
      <Photo {...training} />
      <Learner learner={{ ...training, status: undefined }} />
      <Course
        training={training}
        tracking={tracking}
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

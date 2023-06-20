import { useState } from 'react'
import { Photo, Learner } from '../learner/learner-view'
import { Course, AlertCancelled } from './training-view'
import { Action } from './training-actions'
import { Divider } from '@/components'
import { undoLastApproval } from '@/services/api/approvals'
import useApiMessages from '@/hooks/useApiMessages'
import useUser from '@/hooks/useUser'
import { TRAINING_STATUS } from '@/helpers'

import './trainingView.css'

export const TrainingView = ({ training, onUpdate }) => {
  const { apiMessage } = useApiMessages()
  const { user } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!training) {
    return (
      <article>
        <center>Record not found</center>
      </article>
    )
  }

  const { id, status_id: status } = training

  const { roles } = user

  const isAdmin = Boolean(roles.find((r) => r.id === 1))

  const handleUndo = (e) => {
    e.preventDefault()

    undoLastApproval(id)
      .then((res) => {
        apiMessage(res)
        onUpdate()
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  return (
    <main className="training-view">
      {status === TRAINING_STATUS.CANCELLED && <AlertCancelled />}
      <Photo {...training} />
      <Learner learner={{ ...training, status: undefined }} />
      <Course
        training={training}
        onUndo={isAdmin ? handleUndo : null}
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

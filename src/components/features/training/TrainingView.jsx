import { useState } from 'react'
import { Photo, Learner } from '../learner/learner-view'
import { Course, StatusStamp } from './training-view'
import { Action } from './training-actions'
import { Divider } from '@/components'
import { undoLastApproval } from '@/services'
import useApiMessages from '@/hooks/useApiMessages'
import useUser from '@/hooks/useUser'

import './trainingView.css'
import { TRAINING_STATUS } from '@/helpers'
import { useNavigate } from 'react-router-dom'

export const TrainingView = ({ training, onUpdate }) => {
  const { apiMessage } = useApiMessages()
  const { user } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  if (!training) {
    return (
      <article>
        <center>Record not found</center>
      </article>
    )
  }

  const {
    id,
    status_id: statusId,
    course_state: stateName,
    learner_id
  } = training

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

  const handleView = (e) => {
    e.preventDefault()
    navigate(`/learner/${learner_id}`)
  }

  return (
    <main className="training-view">
      <StatusStamp status={{ statusId, stateName }} />
      <Photo {...training} />
      <Learner
        learner={{ ...training, status: undefined }}
        onView={handleView}
      />
      <Course
        training={training}
        onUndo={isAdmin && statusId > TRAINING_STATUS.NEW ? handleUndo : null}
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

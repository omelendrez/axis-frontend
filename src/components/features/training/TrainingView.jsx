import { useState } from 'react'
import { Photo, Learner } from '../learner/learner-view'
import { Course, StatusStamp } from './training-view'
import { Action } from './training-actions'
import { Divider, Modal, TrainingForm } from '@/components'
import { getTraining, undoLastApproval } from '@/services'
import useApiMessages from '@/hooks/useApiMessages'
import useUser from '@/hooks/useUser'

import '../learner/learner-view/learner.css'
import './trainingView.css'
import { TRAINING_STATUS } from '@/helpers'
import { useNavigate } from 'react-router-dom'
import { RejectReason } from './training-view/RejectReason'

export const TrainingView = ({ training, onUpdate }) => {
  const { apiMessage } = useApiMessages()
  const { user } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTrainingEdit, setIsTrainingEdit] = useState(false)
  const [trainingEditData, setTrainingEditData] = useState(null)

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
    status: statusName,
    learner_id,
    reject_reason: reason
  } = training

  const { roles } = user

  const isAdmin = Boolean(roles.find((r) => r.id === 1))

  const handleUndo = (e) => {
    e.preventDefault()

    undoLastApproval(id)
      .then((res) => {
        const data = {
          message: `Status "${statusName}" has been reverted!`
        }
        apiMessage({ data })

        onUpdate()
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const handleLearnerView = (e) => {
    e.preventDefault()
    navigate(`/learner/${learner_id}`)
  }

  const handleEditTraining = () =>
    getTraining(id)
      .then((res) => {
        setTrainingEditData(res.data)
        setIsTrainingEdit(true)
      })
      .catch((e) => apiMessage(e))

  const handleClose = (e) => {
    e?.preventDefault()
    onUpdate()
    setTrainingEditData(null)
    setIsTrainingEdit(false)
  }

  return (
    <main className="training-view">
      {reason && <RejectReason reason={reason} />}
      <StatusStamp status={{ statusId, statusName }} />
      <Photo {...training} />
      <Learner
        learner={{ ...training, status: undefined }}
        onView={handleLearnerView}
      />
      <Course
        training={training}
        onUndo={isAdmin && statusId > TRAINING_STATUS.NEW ? handleUndo : null}
        isSubmitting={isSubmitting}
        onUpdate={onUpdate}
        onEdit={handleEditTraining}
      />
      <Divider />
      <div className="actions">
        <Action training={training} onUpdate={onUpdate} />
      </div>
      <Modal open={isTrainingEdit} title="Edit training" onClose={handleClose}>
        <TrainingForm training={trainingEditData} onClose={handleClose} />
      </Modal>
    </main>
  )
}

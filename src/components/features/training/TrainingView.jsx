import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RejectReasonView } from './training-view/RejectReasonView'

import { Confirm, Divider, Modal, TrainingForm } from '@/components'
import { Photo, Learner } from '../learner/learner-view'
import { Course, StatusStamp, Assignments } from './training-view'
import { Action } from './training-actions'

import useApiMessages from '@/hooks/useApiMessages'
import useUser from '@/hooks/useUser'
import useConfirm from '@/hooks/useConfirm'

import { deleteTraining, getTraining, undoLastApproval } from '@/services'

import '../learner/learner-view/learner.css'
import './trainingView.css'
import { TRAINING_STATUS, USER_ROLE } from '@/helpers'

export const TrainingView = ({ training, onUpdate }) => {
  const { apiMessage } = useApiMessages()
  const { user } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTrainingEdit, setIsTrainingEdit] = useState(false)
  const [trainingEditData, setTrainingEditData] = useState(null)

  const [isAssingmentEdit, setIsAssignmentEdit] = useState(false)

  const { isConfirmOpen, confirmMessage, setMessage, closeConfirm } =
    useConfirm()

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

  const isSysAdmin = Boolean(roles.find((r) => r.id === USER_ROLE.SYS_ADMIN))

  const isAdmin = Boolean(roles.find((r) => r.id === USER_ROLE.ADMIN))

  const isTC = Boolean(
    roles.find((r) => r.id === USER_ROLE.TRAINING_COORDINATOR)
  )

  const handleUndo = (e) => {
    e.preventDefault()

    undoLastApproval(id)
      .then(() => {
        const data = {
          message: `Status "${statusName}" has been reverted!`
        }
        apiMessage({ data })

        onUpdate()
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const handleDelete = (e) => {
    e.preventDefault()

    const message = (
      <span>
        Are you sure you want to delete this training record
        <span className="primary"> {training?.course?.name}</span>?
      </span>
    )

    setMessage(message)
  }

  const handleDeleteConfirm = (e) => {
    e.preventDefault()
    closeConfirm()

    deleteTraining(id)
      .then(() => {
        const data = {
          message: 'Training record has been deleted!',
          onClose: navigate('/pending-tasks')
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

  const handleEditTraining = (e) => {
    e?.preventDefault()
    getTraining(id)
      .then((res) => {
        setTrainingEditData(res.data)
        setIsTrainingEdit(true)
      })
      .catch((e) => apiMessage(e))
  }

  const handleAssignment = (e) => {
    e?.preventDefault()
    getTraining(id)
      .then((res) => {
        setTrainingEditData(res.data)
        setIsAssignmentEdit(true)
      })
      .catch((e) => apiMessage(e))
  }

  const handleClose = (e) => {
    e?.preventDefault()
    onUpdate()
    setTrainingEditData(null)
    setIsTrainingEdit(false)
    setIsAssignmentEdit(false)
  }

  const handleCancel = (e) => {
    e.preventDefault()

    closeConfirm()
  }

  return (
    <main className="training-view">
      {reason && <RejectReasonView status={statusName} reason={reason} />}
      <StatusStamp status={{ statusId, statusName }} />
      <Photo {...training} />
      <Learner
        learner={{ ...training, status: undefined }}
        onView={handleLearnerView}
      />
      <Course
        training={training}
        onUndo={isSysAdmin ? handleUndo : null}
        onDelete={
          isSysAdmin || (isAdmin && [TRAINING_STATUS.NEW].includes(statusId))
            ? handleDelete
            : null
        }
        isSubmitting={isSubmitting}
        onUpdate={onUpdate}
        onEdit={handleEditTraining}
        onAssign={isTC && handleAssignment}
      />
      <Divider />

      <div className="actions">
        <Action training={training} onUpdate={onUpdate} />
      </div>

      <Modal open={isTrainingEdit} title="Edit training" onClose={handleClose}>
        <TrainingForm training={trainingEditData} onClose={handleClose} />
      </Modal>

      <Modal
        open={isAssingmentEdit}
        title="Assign instructors"
        onClose={handleClose}
      >
        <Assignments training={id} onClose={handleClose} />
      </Modal>

      <Confirm
        open={isConfirmOpen}
        onCofirm={handleDeleteConfirm}
        onCancel={handleCancel}
        message={confirmMessage}
      />
    </main>
  )
}

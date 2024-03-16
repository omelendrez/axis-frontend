import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { InstructorForm } from './instructor/InstructorForm'
import { RejectReasonView } from './training-view/RejectReasonView'
import { Confirm, Divider, Modal, TrainingForm } from '@/components'
import { Photo, Learner } from '../learner/learner-view'
import { Course, StatusStamp, Instructors } from './training-view'
import { Action } from './training-actions'

import useApiMessages from '@/hooks/useApiMessages'
import useUser from '@/hooks/useUser'
import useUsers from '@/hooks/useUsers'
import useConfirm from '@/hooks/useConfirm'

import {
  deleteTraining,
  getTraining,
  undoLastApproval,
  deleteInstructor,
  createInstructor,
  getCourseModules
} from '@/services'

import { TRAINING_STATUS, USER_ROLE, convertDateFormat } from '@/helpers'

import instructorFields from './training-view/instructor-fields.json'

import '../learner/learner-view/learner.css'
import './trainingView.css'

export const TrainingView = ({ training, onUpdate, update }) => {
  const { apiMessage } = useApiMessages()
  const { user } = useUser()
  const { users, load: loadUsers } = useUsers()

  const [instructors, setInstructors] = useState([])
  const [modules, setModules] = useState([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isTrainingEdit, setIsTrainingEdit] = useState(false)
  const [trainingEditData, setTrainingEditData] = useState(null)

  const [isInstructorEdit, setIsInstructorEdit] = useState(false)
  const [instructorEditData, setInstructorEditData] = useState(null)

  const { isConfirmOpen, confirmMessage, setMessage, closeConfirm } =
    useConfirm()

  const navigate = useNavigate()

  useEffect(() => {
    loadUsers()
    getCourseModules(id).then((res) => setModules(res.data.rows))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setInstructors(
      users.data.rows
        .filter((u) => u.roles.includes(USER_ROLE.INSTRUCTOR))
        .map((u) => {
          const { id, name } = u
          return { id, name }
        })
    )
  }, [users])

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
    start,
    end,
    learner_id,
    reject_reason: reason
  } = training

  const min = convertDateFormat(start)
  const max = convertDateFormat(end)

  const { roles } = user

  const isSysAdmin = Boolean(roles.find((r) => r.id === USER_ROLE.SYS_ADMIN))

  const isAdmin = Boolean(roles.find((r) => r.id === USER_ROLE.ADMIN))

  const isTC = Boolean(
    roles.find((r) => r.id === USER_ROLE.TRAINING_COORDINATOR)
  )

  const canEdit = isTC

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

  const handleAddInstructor = (e) => {
    e.preventDefault()

    const fields = instructorFields.map((f) => f.field)

    const fieldData = {}
    fields.forEach((f) => (fieldData[f] = ''))

    setInstructorEditData({ ...fieldData, training: id })
    setIsInstructorEdit(true)
  }

  const handleSaveInstructor = (payload) => {
    delete payload.id
    createInstructor(payload)
      .then((res) => {
        apiMessage(res)
        onUpdate()
        setIsInstructorEdit(false)
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const handleDeleteInstructor = (id) =>
    deleteInstructor(id)
      .then((res) => {
        apiMessage(res)
        onUpdate()
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))

  const handleClose = (e) => {
    e?.preventDefault()
    onUpdate()
    setTrainingEditData(null)
    setIsTrainingEdit(false)
    setIsInstructorEdit(false)
  }

  const handleCancel = (e) => {
    e.preventDefault()

    closeConfirm()
  }

  return (
    <main className="training-view">
      {reason && <RejectReasonView status={statusName} reason={reason} />}
      <StatusStamp status={{ statusId, statusName }} />
      <Photo {...training} update={update} />
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
      />
      {statusId >= TRAINING_STATUS.MEDIC_DONE ? (
        <Instructors
          training={training}
          onAdd={canEdit ? handleAddInstructor : null}
          onDelete={canEdit ? handleDeleteInstructor : null}
          key={instructorEditData?.id}
        />
      ) : null}
      <Divider />
      <div className="actions">
        <Action training={training} onUpdate={onUpdate} update={update} />
      </div>
      <Modal open={isTrainingEdit} title="Edit training" onClose={handleClose}>
        <TrainingForm training={trainingEditData} onClose={handleClose} />
      </Modal>
      <Modal
        open={isInstructorEdit}
        title="Edit instructor info"
        onClose={handleClose}
      >
        <InstructorForm
          instructor={instructorEditData}
          instructors={instructors}
          modules={modules}
          onSave={handleSaveInstructor}
          onClose={handleClose}
          min={min}
          max={max}
        />
      </Modal>
      <Confirm
        open={isConfirmOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleCancel}
        message={confirmMessage}
      />
    </main>
  )
}

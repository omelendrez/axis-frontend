import { useEffect, useState } from 'react'
import { Task } from '@/components'
import { Status } from '../status-container/Status'
import { TrainingDates } from './TrainingDates'
import description from './description'
import useApiMessages from '@/hooks/useApiMessages'
import { medicalApproval, saveReason, cancelTraining } from '@/services'
import {
  TRAINING_STATUS,
  USER_ROLE,
  getTrainingDates,
  getUserAuth
} from '@/helpers'
import './medical.css'

export const Medical = ({ training, onUpdate, role, user }) => {
  const { apiMessage } = useApiMessages()

  const { roles } = user

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const newList = dates.map((d) =>
      e.target.dataset.date === d.date
        ? {
            ...d,
            [e.target.id]: e.target.value ? parseInt(e.target.value, 10) : ''
          }
        : d
    )
    setDates(newList)
  }

  const { id, status_id: status, tracking, start, end, medical } = training

  const courseDates = getTrainingDates(start, end)

  const [dates, setDates] = useState([])

  const trackingRecord = tracking.find(
    (t) => t.status_id === TRAINING_STATUS.MEDIC_DONE
  )

  const isMedic = Boolean(roles.find((r) => r.id === USER_ROLE.MEDIC))

  const { isApproved, isCancelled, canView, isComplete } = getUserAuth(
    role,
    roles,
    status,
    tracking
  )

  const process = (payload) => {
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
    process({
      updates: dates.filter((d) => d.systolic > 0 && d.diastolic > 0),
      approved: 1,
      status
    })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    const payload = {
      reason: 'Learner did not pass medical fit for this training'
    }
    cancelTraining(id)
      .then((res) => {
        saveReason(id, payload).then(() => {
          onUpdate()
          apiMessage(res)
        })
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  useEffect(() => {
    const data = courseDates.map((d) => {
      const dataValues = medical.find((m) => m.date === d.date)
      let value
      if (dataValues) {
        value = { ...dataValues, existing: true }
      } else {
        value = { ...d, systolic: '', diastolic: '' }
      }

      return value
    })

    setDates(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [training])

  const result = isApproved
    ? !medical.length
      ? 'NO BP READINGS'
      : ''
    : 'PENDING'

  const title = <strong>MEDIC TEST</strong>

  if (!canView) {
    return null
  }

  const isMedicDone = dates.length === medical.length

  return (
    <Task
      key={title}
      title={title}
      status={<Status trackingRecord={trackingRecord} />}
      description={
        isApproved ? (
          <div className="description-large">{result}</div>
        ) : (
          description
        )
      }
      className="blood-pressure"
      onApprove={!isMedicDone ? handleApprove : null}
      onReject={!isMedicDone ? handleCancel : null}
      approveLabel="FIT"
      rejectLabel="NO FIT"
      approveDisabled={isComplete || isCancelled}
      rejectDisabled={isComplete || isCancelled}
      isSubmitting={isSubmitting}
    >
      <TrainingDates
        dates={dates}
        onChange={handleChange}
        canEdit={!isCancelled && !isComplete && isMedic}
      />
    </Task>
  )
}

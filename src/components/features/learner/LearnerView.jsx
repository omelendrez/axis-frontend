import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useApiMessages from '@/hooks/useApiMessages'
import {
  getContacts,
  getContact,
  deleteContact,
  getLearner,
  getLearnerView,
  deleteLearner,
  getLearnerTrainings,
  getTraining,
  deleteTraining
} from '@/services'
import { Confirm, Modal } from '@/components'
import { Photo, Learner, Trainings, Contacts } from './learner-view'
import { LearnerForm, TrainingForm, Contact, PhotoUpload } from '../..'
import trainingFields from './learner-view/training-fields.json'
import contactFields from './learner-view/contact-fields.json'
import './learnerView.css'
import useConfirm from '@/hooks/useConfirm'
import useUser from '@/hooks/useUser'

export const LearnerView = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { user } = useUser()

  const { apiMessage } = useApiMessages()
  const [learner, setLearner] = useState(null)
  const [contacts, setContacts] = useState([])
  const [trainings, setTrainings] = useState([])
  const [trainingEditData, setTrainingEditData] = useState(null)
  const [learnerEditData, setLearnerEditData] = useState(null)
  const [contactEditData, setContactEditData] = useState(null)
  const [isTrainingEdit, setIsTrainingEdit] = useState(false)
  const [isLearnerEdit, setIsLearnerEdit] = useState(false)
  const [isContactEdit, setIsContactEdit] = useState(false)
  const [isPhotoOpen, setIsPhotoOpen] = useState(false)
  const [photoBadge, setPhotoBadge] = useState(null)
  const [update, setUpdate] = useState(false)
  const [trainingId, setTrainingId] = useState(null)

  const { isConfirmOpen, confirmMessage, setMessage, closeConfirm } =
    useConfirm()
  const { roles } = user

  const isAdmin = Boolean(roles.find((r) => r.id === 1))

  const badge = learner?.badge

  const id = params?.id

  const handleEditLearner = (e) => {
    e?.preventDefault()
    if (id) {
      getLearner(id)
        .then((res) => {
          setLearnerEditData(res.data)
          setIsLearnerEdit(true)
        })
        .catch((e) => apiMessage(e))
    }
  }

  const handleDeleteLearner = (e) => {
    e.preventDefault()

    deleteLearner(id)
      .then((res) => {
        apiMessage(res)
        navigate('/learners')
      })
      .catch((e) => apiMessage(e))
  }

  const handleAddTraining = (e) => {
    e.preventDefault()

    const fields = trainingFields.map((f) => f.field)

    const fieldData = {}
    fields.forEach((f) => (fieldData[f] = ''))

    setTrainingEditData({ ...fieldData, learner: id, id: undefined })
    setIsTrainingEdit(true)
  }

  const handleAddContact = (e) => {
    e.preventDefault()

    const fields = contactFields.map((f) => f.field)

    const fieldData = {}
    fields.forEach((f) => (fieldData[f] = ''))

    setContactEditData({ ...fieldData, learner: id, id: undefined })
    setIsContactEdit(true)
  }

  const handleViewTraining = (id) => {
    navigate(`/training/${id}`)
  }

  const handleEditTraining = (id) =>
    getTraining(id)
      .then((res) => {
        setTrainingEditData(res.data)
        setIsTrainingEdit(true)
      })
      .catch((e) => apiMessage(e))

  const handleEditContact = (id) =>
    getContact(id)
      .then((res) => {
        setContactEditData(res.data)
        setIsContactEdit(true)
      })
      .catch((e) => apiMessage(e))

  const handleDeleteTraining = (id) => {
    setTrainingId(id)

    const message = (
      <span>Are you sure you want to delete this training record?</span>
    )

    setMessage(message)
  }

  const handleDeleteConfirm = (e) => {
    e.preventDefault()
    closeConfirm()

    deleteTraining(trainingId)
      .then(() => {
        const data = {
          message: 'Training record has been deleted!'
        }
        apiMessage({ data })

        setUpdate((u) => !u)
      })
      .catch((e) => apiMessage(e))
  }

  const handleDeleteContact = (id) =>
    deleteContact(id)
      .then((res) => {
        apiMessage(res)
        setUpdate((u) => !u)
      })
      .catch((e) => apiMessage(e))

  const handleEditPhoto = (e) => {
    e.preventDefault()
    setIsPhotoOpen(true)
  }

  const handleClose = (e) => {
    e?.preventDefault()

    setUpdate((u) => !u)

    if (isTrainingEdit) {
      setTrainingEditData(null)
      setIsTrainingEdit(false)
    }
    if (isLearnerEdit) {
      setLearnerEditData(null)
      setIsLearnerEdit(false)
    }
    if (isContactEdit) {
      setContactEditData(null)
      setIsContactEdit(false)
    }
    if (isPhotoOpen) {
      setIsPhotoOpen(false)
    }
  }

  useEffect(() => {
    if (id) {
      getLearnerView(id)
        .then((res) => {
          const learner = res.data
          setLearner(learner)
          setPhotoBadge(learner.badge)
          getContacts(id)
            .then((res) => setContacts(res.data))
            .catch((e) => apiMessage(e))

          getLearnerTrainings(id)
            .then((res) => setTrainings(res.data))
            .catch((e) => apiMessage(e))
        })
        .catch((e) => apiMessage(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, update])

  const handleCancel = (e) => {
    e.preventDefault()

    closeConfirm()
  }

  if (!learner) {
    return null
  }

  return (
    <>
      {/* Edit modals  */}
      <Modal open={isTrainingEdit} title="Edit training" onClose={handleClose}>
        <TrainingForm training={trainingEditData} onClose={handleClose} />
      </Modal>
      <Modal open={isLearnerEdit} title="Edit learner" onClose={handleClose}>
        <LearnerForm learner={learnerEditData} onClose={handleClose} />
      </Modal>
      <Modal
        open={isContactEdit}
        title="Edit contact info"
        onClose={handleClose}
      >
        <Contact contact={contactEditData} onClose={handleClose} />
      </Modal>
      <Modal open={isPhotoOpen} title="Profile picture" onClose={handleClose}>
        <PhotoUpload onClose={handleClose} badge={badge} />
      </Modal>
      <main className="learner-view">
        {/* Data components */}

        <Photo badge={photoBadge} onEdit={handleEditPhoto} />

        <Learner
          learner={learner}
          onEdit={handleEditLearner}
          onDelete={handleDeleteLearner}
        />

        <Trainings
          trainings={trainings}
          onView={handleViewTraining}
          onAdd={handleAddTraining}
          onEdit={handleEditTraining}
          onDelete={isAdmin ? handleDeleteTraining : null}
          key={trainingEditData?.id}
        />

        <Contacts
          contacts={contacts}
          onAdd={handleAddContact}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
          key={contactEditData?.id}
        />
        <Confirm
          open={isConfirmOpen}
          onCofirm={handleDeleteConfirm}
          onCancel={handleCancel}
          message={confirmMessage}
        />
      </main>
    </>
  )
}

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getContacts,
  getContact,
  deleteContact,
  getLearner,
  getLearnerView,
  getTrainings,
  getTraining,
  deleteTraining
} from '../../services'
import { Loading, Modal } from '../shared'
import { Photo, Learner, Trainings, Contacts } from './learner-view'
import {
  Learner as LearnerForm,
  Training,
  Contact,
  Photo as PhotoForm
} from '..'
import useNoficication from '../../hooks/useNotification'
import trainingFields from './learner-view/training-fields.json'
import contactFields from './learner-view/contact-fields.json'
import './learnerView.css'
import { handleError } from '../../reducers/error'

export const LearnerView = () => {
  const params = useParams()
  const { set } = useNoficication()
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

  const id = params?.id

  const handleEditLearner = (e) => {
    e?.preventDefault()
    getLearner(id)
      .then((res) => {
        setLearnerEditData(res.data)
        setIsLearnerEdit(true)
      })
      .catch((e) => handleError(e))
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

  const handleEditTraining = (id) =>
    getTraining(id)
      .then((res) => {
        setTrainingEditData(res.data)
        setIsTrainingEdit(true)
      })
      .catch((e) => handleError(e))

  const handleEditContact = (id) =>
    getContact(id)
      .then((res) => {
        setContactEditData(res.data)
        setIsContactEdit(true)
      })
      .catch((e) => handleError(e))

  const handleDeleteTraining = (trainingId) =>
    deleteTraining(trainingId)
      .then((res) => {
        const notification = {
          type: 'success',
          message: res.data.message
        }
        set(notification)

        getTrainings(id)
      })
      .catch((e) => handleError(e))

  const handleDeleteContact = (contactId) =>
    deleteContact(contactId)
      .then((res) => {
        const notification = {
          type: 'success',
          message: res.data.message
        }
        set(notification)

        getContacts(id)
      })
      .catch((e) => handleError(e))

  const handleEditPhoto = (e) => {
    e.preventDefault()
    setIsPhotoOpen(true)
  }

  const handleClose = (e) => {
    e?.preventDefault()

    getLearnerView(id)
      .then((res) => {
        setLearner(res.data)
        setPhotoBadge(null)
        setTimeout(() => {
          setPhotoBadge(res.data.badge)
        }, 1000)
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
      })
      .catch((e) => handleError(e))
  }

  useEffect(() => {
    if (id) {
      getLearnerView(id)
        .then((res) => {
          const learner = res.data
          setLearner(learner)
          setPhotoBadge(learner.badge)
        })
        .catch((e) => handleError(e))

      getContacts(id)
        .then((res) => {
          setContacts(res.data)
        })
        .catch((e) => handleError(e))

      getTrainings(id)
        .then((res) => {
          setTrainings(res.data)
        })
        .catch((e) => handleError(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, id])

  if (!learner) {
    return <Loading />
  }

  return (
    <>
      {/* Edit modals  */}
      <Modal open={isTrainingEdit} title="Edit training" onClose={handleClose}>
        <Training training={trainingEditData} onClose={handleClose} />
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
        <PhotoForm onClose={handleClose} badge={learner.badge} />
      </Modal>
      <main className="learner-view">
        {/* Data components */}
        <div>
          <Photo badge={photoBadge} onEdit={handleEditPhoto} />
        </div>
        <div>
          <Learner learner={learner} onEdit={handleEditLearner} />
        </div>
        <div>
          <Trainings
            trainings={trainings}
            onAdd={handleAddTraining}
            onEdit={handleEditTraining}
            onDelete={handleDeleteTraining}
            key={trainingEditData?.id}
          />
        </div>
        <div>
          <Contacts
            contacts={contacts}
            onAdd={handleAddContact}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
            key={contactEditData?.id}
          />
        </div>
      </main>
    </>
  )
}

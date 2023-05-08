import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getContact,
  getContacts,
  getPhoto,
  getLearner,
  getLearnerView,
  getTraining,
  getTrainings,
  deleteContact,
  deleteTraining
} from '../../services'
import { Loading, Modal } from '../shared'
import { Picture, Learner, Trainings, Contacts } from './learner-view'
import { Learner as LearnerForm, Training, Contact } from '..'
import useNoficication from '../../hooks/useNotification'
import trainingFields from './learner-view/training-fields.json'
import contactFields from './learner-view/contact-fields.json'

import './learnerView.css'

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
  const id = params?.id

  const handleEditLearner = (e) => {
    e?.preventDefault()
    getLearner(id).then((res) => {
      setLearnerEditData(res.data)
      setIsLearnerEdit(true)
    })
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

  const handleEditTraining = (id) => {
    getTraining(id).then((res) => {
      setTrainingEditData(res.data)
      setIsTrainingEdit(true)
    })
  }

  const handleEditContact = (id) => {
    getContact(id).then((res) => {
      setContactEditData(res.data)
      setIsContactEdit(true)
    })
  }

  const handleDeleteTraining = (trainingId) => {
    deleteTraining(trainingId)
      .then((res) => {
        const notification = {
          type: 'success',
          message: res.data.message
        }
        set(notification)

        getTrainings(id)
      })
      .catch((e) => {
        console.log(e)
        const notification = {
          type: 'error',
          message: e.response.data.message
        }
        set(notification)
      })
  }

  const handleDeleteContact = (contactId) => {
    deleteContact(contactId)
      .then((res) => {
        const notification = {
          type: 'success',
          message: res.data.message
        }
        set(notification)

        getContacts(id)
      })
      .catch((e) => {
        const notification = {
          type: 'error',
          message: e.data.message
        }
        set(notification)
      })
  }

  const handleClose = (e) => {
    e?.preventDefault()
    getLearnerView(id).then((res) => {
      setLearner(res.data)
      setIsTrainingEdit(false)
      setIsLearnerEdit(false)
      setIsContactEdit(false)
    })
  }

  useEffect(() => {
    if (id) {
      getLearnerView(id).then((res) => setLearner(res.data))
      getContacts(id).then((res) => setContacts(res.data))
      getTrainings(id).then((res) => setTrainings(res.data))
    }
  }, [params, id])

  if (!learner) {
    return <Loading />
  }
  const photoUrl = getPhoto(learner.badge)

  return (
    <main className="learner-view">
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

      {/* Data components */}

      <div>
        <Picture photoUrl={photoUrl} />
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
        />
        <Contacts
          contacts={contacts}
          onAdd={handleAddContact}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
        />
      </div>
    </main>
  )
}

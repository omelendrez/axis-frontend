import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getContact,
  getContacts,
  getPhoto,
  getTrainee,
  getTraineeView,
  getTraining,
  getTrainings,
  deleteContact,
  deleteTraining
} from '../../services'
import { Loading, Modal } from '../shared'
import { Picture, Trainee, Trainings, Contacts } from './trainee-view'
import { Trainee as TraineeForm, Training, Contact } from '../'
import useNoficication from '../../hooks/useNotification'
import trainingFields from './trainee-view/training-fields.json'
import contactFields from './trainee-view/contact-fields.json'

import './traineeView.css'

export const TraineeView = () => {
  const params = useParams()
  const { set } = useNoficication()
  const [trainee, setTrainee] = useState(null)
  const [contacts, setContacts] = useState([])
  const [trainings, setTrainings] = useState([])
  const [trainingEditData, setTrainingEditData] = useState(null)
  const [traineeEditData, setTraineeEditData] = useState(null)
  const [contactEditData, setContactEditData] = useState(null)
  const [isTrainingEdit, setIsTrainingEdit] = useState(false)
  const [isTraineeEdit, setIsTraineeEdit] = useState(false)
  const [isContactEdit, setIsContactEdit] = useState(false)
  const id = params?.id

  const handleEditTrainee = (e) => {
    e?.preventDefault()
    getTrainee(id).then((res) => {
      setTraineeEditData(res.data)
      setIsTraineeEdit(true)
    })
  }

  const handleAddTraining = (e) => {
    e.preventDefault()

    const fields = trainingFields.map((f) => f.field)

    const fieldData = {}
    fields.forEach((f) => (fieldData[f] = ''))

    setTrainingEditData({ ...fieldData, trainee: id, id: undefined })
    setIsTrainingEdit(true)
  }

  const handleAddContact = (e) => {
    e.preventDefault()

    const fields = contactFields.map((f) => f.field)

    const fieldData = {}
    fields.forEach((f) => (fieldData[f] = ''))

    setContactEditData({ ...fieldData, trainee: id, id: undefined })
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
    getTraineeView(id).then((res) => {
      setTrainee(res.data)
      setIsTrainingEdit(false)
      setIsTraineeEdit(false)
      setIsContactEdit(false)
    })
  }

  useEffect(() => {
    if (id) {
      getTraineeView(id).then((res) => setTrainee(res.data))
      getContacts(id).then((res) => setContacts(res.data))
      getTrainings(id).then((res) => setTrainings(res.data))
    }
  }, [params, id])

  if (!trainee) {
    return <Loading />
  }
  const photoUrl = getPhoto(trainee.badge)

  return (
    <main className="trainee-view">
      {/* Edit modals  */}

      <Modal open={isTrainingEdit} title="Edit training" onClose={handleClose}>
        <Training training={trainingEditData} onClose={handleClose} />
      </Modal>
      <Modal open={isTraineeEdit} title="Edit trainee" onClose={handleClose}>
        <TraineeForm trainee={traineeEditData} onClose={handleClose} />
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
        <Trainee trainee={trainee} onEdit={handleEditTrainee} />
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

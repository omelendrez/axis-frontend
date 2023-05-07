import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getContact,
  getContacts,
  getPhoto,
  getTrainee,
  getTraineeView,
  getTraining,
  getTrainings
} from '../../services'
import { Loading, Modal } from '../shared'
import { Picture, Trainee, Trainings, Contacts } from './trainee-view'
import { Trainee as TraineeForm, Training, Contact } from '../'
import './traineeView.css'

export const TraineeView = () => {
  const params = useParams()
  const [trainee, setTrainee] = useState(null)
  const [contacts, setContacts] = useState([])
  const [trainings, setTrainings] = useState([])
  const [training, setTraining] = useState(null)
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

  const handleEditTraining = (id) => {
    getTraining(id).then((res) => {
      setTraining(res.data)
      setIsTrainingEdit(true)
    })
  }

  const handleEditContact = (id) => {
    getContact(id).then((res) => {
      console.log(res)
      setContactEditData(res.data)
      setIsContactEdit(true)
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
      <Modal open={isTrainingEdit} title="Edit training" onClose={handleClose}>
        <Training training={training} onClose={handleClose} />
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
      <div>
        <Picture photoUrl={photoUrl} />
      </div>
      <div>
        <Trainee trainee={trainee} onEdit={handleEditTrainee} />
      </div>
      <div>
        <Trainings trainings={trainings} onEdit={handleEditTraining} />
        <Contacts contacts={contacts} onEdit={handleEditContact} />
      </div>
    </main>
  )
}

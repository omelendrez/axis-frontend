import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  getContactInfos,
  getPhoto,
  getTraineeView,
  getTrainings
} from '../../services'
import { Loading } from '../shared'
import { Picture, Trainee, Training, Contact } from './trainee-view'
import './traineeView.css'

export const TraineeView = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [trainee, setTrainee] = useState(null)
  const [contactInfos, setContactInfos] = useState([])
  const [trainings, setTrainings] = useState([])
  const id = params?.id

  const handleEditTrainee = (e) => {
    e.preventDefault()
    navigate(`/trainee/${id}/edit`)
  }

  const handleEditTraining = (trainingId) => {
    navigate(`/training/${trainingId}`)
  }

  useEffect(() => {
    if (id) {
      getTraineeView(id).then((res) => setTrainee(res.data))
      getContactInfos(id).then((res) => setContactInfos(res.data))
      getTrainings(id).then((res) => setTrainings(res.data))
    }
  }, [params, id])

  if (!trainee) {
    return <Loading />
  }
  const photoUrl = getPhoto(trainee.badge)

  return (
    <main className="trainee-view">
      <div>
        <Picture photoUrl={photoUrl} />
      </div>
      <div>
        <Trainee trainee={trainee} onEdit={handleEditTrainee} />
      </div>
      <div>
        <Training trainings={trainings} onEdit={handleEditTraining} />
        <Contact contactInfos={contactInfos} />
      </div>
    </main>
  )
}

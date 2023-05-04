import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
  const [trainee, setTrainee] = useState(null)
  const [contactInfos, setContactInfos] = useState([])
  const [trainings, setTrainings] = useState([])

  useEffect(() => {
    const id = params.id
    if (id) {
      getTraineeView(id).then((res) => setTrainee(res.data))
      getContactInfos(id).then((res) => setContactInfos(res.data))
      getTrainings(id).then((res) => setTrainings(res.data))
    }
  }, [params])

  if (!trainee) {
    return <Loading />
  }
  const photoUrl = getPhoto(trainee.badge)

  return (
    <main className="trainee-view">
      <div>
        <Picture photoUrl={photoUrl} />
        <Contact contactInfos={contactInfos} />
      </div>
      <div>
        <Trainee trainee={trainee} />
      </div>
      <div>
        <Training trainings={trainings} />
      </div>
    </main>
  )
}

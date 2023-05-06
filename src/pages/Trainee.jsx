import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {
  FormContainer,
  TraineeView,
  Trainee as TraineeComponent
} from '../components'
import { getTrainee } from '../services'

const Trainee = ({ isEditing }) => {
  const params = useParams()
  const [trainee, setTrainee] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getTrainee(id).then((res) => setTrainee(res.data))
    }
  }, [params])

  return (
    <>
      <main className="container">
        <nav aria-label="breadcrumb" className="breadcrumb">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/trainees">Trainees</Link>
            </li>
            <li>Trainee</li>
          </ul>
        </nav>

        {isEditing && (
          <FormContainer title="Trainee data">
            <TraineeComponent trainee={trainee} />
          </FormContainer>
        )}
        {!isEditing && <TraineeView trainee={trainee} />}
      </main>
    </>
  )
}

export default Trainee

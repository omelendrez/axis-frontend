import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Training as TrainingComponent } from '../components'
import { getTraining } from '../services'

const Training = () => {
  const params = useParams()
  const [training, setTraining] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getTraining(id).then((res) => setTraining(res.data))
    }
  }, [params])

  return (
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
            <Link to="/trainings">Trainings</Link>
          </li>
          <li>Training</li>
        </ul>
      </nav>
      <article className="form-container">
        <TrainingComponent training={training} />
      </article>
    </main>
  )
}

export default Training

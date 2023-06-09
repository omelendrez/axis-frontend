import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Loading, TrainingView } from '../components'
import { getTracking, getTrainingView } from '../services'
import useApiMessages from '../hooks/useApiMessages'

const Training = () => {
  const params = useParams()
  const { apiMessage } = useApiMessages()
  const [training, setTraining] = useState(null)
  const [tracking, setTracking] = useState([])

  useEffect(() => {
    const id = params?.id
    if (id) {
      getTrainingView(id)
        .then((res) => setTraining(res.data))
        .catch((e) => apiMessage(e))

      getTracking(id)
        .then((res) => setTracking(res.data))
        .catch((e) => apiMessage(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  if (!training) {
    return <Loading />
  }

  return (
    <main className="container">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Menu</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>Training</li>
        </ul>
      </nav>
      <TrainingView training={training} tracking={tracking} />
    </main>
  )
}

export default Training

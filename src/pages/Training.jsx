import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Loading, TrainingView } from '../components'
import { getTracking, getTrainingView } from '../services'
import useApiMessages from '../hooks/useApiMessages'

const Training = () => {
  const params = useParams()
  const { apiMessage } = useApiMessages()
  const [isLoading, setIsLoading] = useState(false)
  const [training, setTraining] = useState(null)
  const [tracking, setTracking] = useState([])

  useEffect(() => {
    const id = params?.id
    setIsLoading(true)
    if (id) {
      getTrainingView(id)
        .then((res) => {
          setTraining(res.data)

          getTracking(res.data.id)
            .then((res) => setTracking(res.data))
            .catch((e) => apiMessage(e))
        })
        .catch((e) => apiMessage(e))
        .finally(() => setIsLoading(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <Loading />
  }

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
          <li>Training</li>
        </ul>
      </nav>
      <TrainingView training={training} tracking={tracking} />
    </main>
  )
}

export default Training

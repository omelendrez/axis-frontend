import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Loading, TrainingView } from '../components'
import { getTrainingView } from '../services'
import useApiMessages from '../hooks/useApiMessages'
// TODO: This component is not in use
const Training = () => {
  const params = useParams()
  const { apiMessage } = useApiMessages()
  const [training, setTraining] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getTrainingView(id)
        .then((res) => setTraining(res.data))
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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>Training</li>
        </ul>
      </nav>
      <TrainingView training={training} />
    </main>
  )
}

export default Training

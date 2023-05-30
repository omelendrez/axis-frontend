import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loading, CardList } from '../components'
import useUser from '../hooks/useUser'
import { initialValues, log } from '../helpers'
import { getPhotoUrl, getTrainingsByStatus } from '../services'

import useApiMessages from '../hooks/useApiMessages'

import './card.css'
import './trainings-card.css'

const Card = ({ item, onView }) => {
  const photoUrl = getPhotoUrl(item.badge)
  const handleImageError = (e) => (e.target.src = 'assets/no-image-icon.png')

  return (
    <article className="card trainings" onClick={() => onView(item)}>
      <div className="date">{item.start}</div>
      <div className="card-avatar-root">
        <img
          src={photoUrl}
          alt={item.badge}
          className="card-avatar-img"
          onError={handleImageError}
        />
      </div>
      <div className="card-body">
        <div className="ellipsis course">{item.course}</div>
        <div className="ellipsis name">{item.full_name}</div>
        <div className="small-font">{item.company}</div>
        <div className={`small-font status status-${item.status_id}`}>
          {item.status}
        </div>
      </div>
    </article>
  )
}

const Dashboard = () => {
  const navigate = useNavigate()

  const { user } = useUser()

  const { apiMessage } = useApiMessages()

  useEffect(() => {
    const { roles } = user
    let status = []
    roles.forEach((r) => {
      switch (r.id) {
        case 1: // System Admin
          status.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)
          break
        case 3: // Front end
          status.push(1) // Admin done
          break
        case 5: // Medic
          status.push(2) // Frontend done
          break
        case 6: // Training coordinator
          status.push(3) // Medic done
          break
        case 7: // Instructor
          status.push(4) // Training coordinator done
          break
        case 8: // QA
          status.push(5) // Assesment done
          break
        case 9: // MD
          status.push(6) // QA done
          break
        case 10: // Printer
          status.push(7, 8, 9) // MD done
          break
        default:
          status = null
      }
    })
    setStatus(status)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [status, setStatus] = useState(null)

  const [pagination, setPagination] = useState(initialValues)

  const [isLoading, setIsLoading] = useState(false)

  const [records, setRecords] = useState({ rows: [], count: 0 })

  const handleView = (training) => {
    log.info(training)
    navigate(`/training/${training.id}`)
  }

  useEffect(() => {
    if (status?.length) {
      setIsLoading(true)
      const statuses = status.join('-')
      getTrainingsByStatus(statuses, pagination)
        .then((res) => setRecords(res.data))
        .catch((e) => apiMessage(e))
        .finally(() => setIsLoading(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, pagination])

  return (
    <main className="container-fluid trainings">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Dashboard</li>
        </ul>
      </nav>

      <CardList
        Card={Card}
        data={records}
        pagination={pagination}
        onPagination={setPagination}
        onView={handleView}
        isLoading={isLoading}
      />
    </main>
  )
}

export default Dashboard

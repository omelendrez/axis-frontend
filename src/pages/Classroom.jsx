import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Loading, CardList } from '@/components'
import { initialValues } from '@/helpers'
import {
  getClassroomView,
  getPhotoUrl,
  getTrainingsByClassroom
} from '@/services'

import useApiMessages from '@/hooks/useApiMessages'

import './trainings-card.css'
import './classroom.css'

const Header = ({ classroom: { course, start } }) =>
  course &&
  start && (
    <section className="classroom-header">
      <div>
        <div>{course}</div>
        <div>{start}</div>
      </div>
    </section>
  )

const Card = ({ item, onView }) => {
  const { badge, course, full_name, company, status_id, status } = item
  const photoUrl = badge ? getPhotoUrl(badge) : '/assets/no-image-icon.png'

  const handleError = (e) => (e.target.src = '/assets/no-image-icon.png')

  return (
    <article className="card trainings" onClick={() => onView(item)}>
      <div className="card-avatar-root">
        <img
          src={photoUrl}
          alt={badge}
          className="card-avatar-img"
          onError={handleError}
        />
      </div>
      <div className="card-body">
        <div className="ellipsis course">{course}</div>
        <div className="ellipsis name">{full_name}</div>
        <div className="small-font">{company}</div>
        <div className={`small-font status status-${status_id}`}>{status}</div>
      </div>
    </article>
  )
}

const Classroom = () => {
  const navigate = useNavigate()

  const params = useParams()

  const id = params?.id

  const { apiMessage } = useApiMessages()

  const [pagination, setPagination] = useState(initialValues)

  const [isLoading, setIsLoading] = useState(false)

  const [classroom, setClassoom] = useState({})

  const [records, setRecords] = useState({ rows: [], count: 0 })

  const handleView = (training) => navigate(`/training/${training.id}`)

  useEffect(() => {
    if (id) {
      setIsLoading(true)

      getClassroomView(id)
        .then((res) => {
          setClassoom(res.data)

          getTrainingsByClassroom(id, pagination)
            .then((res) => setRecords(res.data))
            .catch((e) => apiMessage(e))
            .finally(() => setIsLoading(false))
        })
        .catch((e) => apiMessage(e))
        .finally(() => setIsLoading(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  return (
    <main className="container trainings">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>Classroom</li>
        </ul>
      </nav>

      <Header classroom={classroom} />

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

export default Classroom

import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Loading, CardList } from '../components'
import { initialValues } from '../helpers'
import {
  getClassroomView,
  getPhotoUrl,
  getTrainingsByClassroom
} from '../services'

import useApiMessages from '../hooks/useApiMessages'

import './card.css'
import './trainings-card.css'

const Header = ({ classroom }) => (
  <center>
    <h6>
      <div>{classroom.course}</div>
      <div>{classroom.start}</div>
    </h6>
  </center>
)

const Card = ({ item, onView }) => {
  const photoUrl = item.badge
    ? getPhotoUrl(item.badge)
    : '/public/assets/no-image-icon.png'

  const handleError = (e) => (e.target.src = '/public/assets/no-image-icon.png')

  return (
    <article className="card trainings" onClick={() => onView(item)}>
      <div className="card-avatar-root">
        <img
          src={photoUrl}
          alt={item.badge}
          className="card-avatar-img"
          onError={handleError}
        />
      </div>
      <div className="card-body">
        <div className="ellipsis course">{item.course}</div>
        <div className="ellipsis name">{item.full_name}</div>
        <div className="small-font">{item.company}</div>
        <div className={`extra-small-font status status-${item.status_id}`}>
          {item.status}
        </div>
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

  const [classroom, setClassoom] = useState(null)

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  return (
    <main className="container-fluid trainings">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
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

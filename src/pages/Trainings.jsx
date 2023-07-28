import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loading, CardList } from '@/components'

import useTrainings from '@/hooks/useTrainings'

import { initialValues } from '@/helpers'
import { getPhotoUrl } from '@/services'

import './trainings-card.css'
import usePage from '@/hooks/usePage'

const Card = ({ item, onView }) => {
  const {
    badge,
    start,
    course_name,
    full_name,
    company_name,
    status_name,
    status
  } = item
  const photoUrl = badge ? getPhotoUrl(badge) : '/assets/no-image-icon.png'

  const handleError = (e) => (e.target.src = '/assets/no-image-icon.png')

  return (
    <article className="card trainings" onClick={() => onView(item.id)}>
      <div className="card-avatar-root">
        <img
          src={photoUrl}
          alt={badge}
          className="card-avatar-img"
          onError={handleError}
        />
      </div>
      <div className="card-body">
        <div className="ellipsis course">{course_name}</div>
        <div className="small-font">{start}</div>
        <div className="ellipsis name">{full_name}</div>
        <div className="small-font">{company_name}</div>
        <div className={`status status-${status} small-font`}>
          {status_name}
        </div>

        <div className="card-line-buttons">
          <div>
            <span className="material-icons thumb-up">thumb_up</span>
          </div>
          <div>
            <span className="material-icons thumb-down">thumb_down</span>
          </div>
        </div>
      </div>
    </article>
  )
}
const Trainings = () => {
  const { trainings, load: loadTrainings } = useTrainings()
  const navigate = useNavigate()
  const { data, isLoading } = trainings
  const [pagination, setPagination] = useState(initialValues)

  const { set: setPage } = usePage()

  useEffect(() => {
    loadTrainings({ pagination })
    setPage('Trainings')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  const handleView = (id) => {
    navigate(`/training/${id}`)
  }

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Trainings</li>
        </ul>
      </nav>

      <CardList
        Card={Card}
        data={data}
        onView={handleView}
        isLoading={isLoading}
        pagination={pagination}
        onPagination={setPagination}
      />
    </main>
  )
}

export default Trainings

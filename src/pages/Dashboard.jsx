import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CardList, Loading } from '../components'

import useClasses from '../hooks/useClasses'
import useNotification from '../hooks/useNotification'

import { initialValues } from '../helpers'

import './card.css'
import './classroom-card.css'

const Card = ({ item, onView }) => (
  <article className="card courses" onClick={() => onView(item)}>
    <div className="card-body">
      <div className="ellipsis course-name">{item.course_name}</div>
      <div className="date">{item.start}</div>
      <div className="learners">
        {item.learners} {item.learners > 1 ? 'learners' : 'learner'}
      </div>
    </div>
  </article>
)

const Dashboard = () => {
  const { classes, load: loadClasses } = useClasses()
  const { data, isLoading, isSuccess, isError, error } = classes

  const [pagination, setPagination] = useState(initialValues)

  const { set } = useNotification()
  const navigate = useNavigate()

  useEffect(() => {
    loadClasses(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    if (isError) {
      const notification = {
        type: 'error',
        message: error.message
      }
      set(notification)
    }
    if (isSuccess) {
      const notification = {
        type: 'success',
        message: 'Operation completed successfully'
      }
      set(notification)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess])

  const handleView = (classRoom) => {
    navigate(`/classroom/${classRoom.id}`)
  }

  return (
    <main className="container-fluid classrooms">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Menu</Link>
          </li>
          <li>Classrooms</li>
        </ul>
      </nav>

      <CardList
        Card={Card}
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        onView={handleView}
        isLoading={isLoading}
      />
    </main>
  )
}

export default Dashboard

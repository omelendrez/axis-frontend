import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loading, CardList, AddButton } from '../components'
import useLearners from '../hooks/useLearners'
import useNoficication from '../hooks/useNotification'
import { initialValues } from '../helpers'
import { Tag } from '../components/shared'
import { getPhoto } from '../services'
import './card.css'
import '../components/learner/learner-view/learner-card.css'

const Card = ({ item, onView }) => {
  const photoUrl = getPhoto(item.badge)

  const handleImageError = (e) => (e.target.src = 'assets/no-image-icon.png')

  return (
    <article className="card" onClick={() => onView(item)}>
      <div className="card-avatar-root">
        <img
          src={photoUrl}
          alt={item.badge}
          className="card-avatar-img"
          onError={handleImageError}
        />
      </div>
      <div className="card-body">
        <div className="ellipsis">{item.full_name}</div>
        <div className="small-font">{item.company}</div>
        <div style={{ display: 'flex' }}>
          <Tag className={item.type}>{item.type}</Tag>
          <div>{item.badge}</div>
        </div>
      </div>
    </article>
  )
}

const Learners = () => {
  const { learners, load: loadLearners } = useLearners()
  const { data, isLoading, isSuccess, isError, error, isFirstLoad } = learners

  const [pagination, setPagination] = useState(initialValues)

  const navigate = useNavigate()
  const { set } = useNoficication()

  useEffect(() => {
    loadLearners(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    if (isFirstLoad) {
      loadLearners(pagination)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstLoad])

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

  const handleView = (learner) => {
    navigate(`/learner/${learner.id}`)
  }

  const fields = [
    { name: 'type', label: 'Type' },
    { name: 'badge', label: 'Badge' },
    {
      name: 'full_name',
      label: 'Full name',
      noWrap: true,
      ellipsis: true,
      maxWidth: '12.5rem'
    },
    {
      name: 'company_name',
      label: 'Company',
      noWrap: true,
      ellipsis: true,
      maxWidth: '9.375rem'
    }
  ]

  return (
    <main className="container">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>Learners</li>
        </ul>
      </nav>

      <AddButton url="/learner/add" />

      <CardList
        Card={Card}
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onView={handleView}
        isLoading={isLoading}
        loadItems={loadLearners}
      />
    </main>
  )
}

export default Learners

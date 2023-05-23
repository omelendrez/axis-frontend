import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loading, CardList, Dropdown } from '../components'

import useStatuses from '../hooks/useStatuses'

import { initialValues, log } from '../helpers'
import { getPhotoUrl, getTrainingsByStatus } from '../services'
import { handleError } from '../reducers/error'

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
      </div>
    </article>
  )
}

const Dashboard = () => {
  const { statuses, load: loadStatuses } = useStatuses()
  const { data: statusesList } = statuses

  const [pagination, setPagination] = useState(initialValues)

  const [options, setOptions] = useState({ rows: [], count: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [records, setRecords] = useState({ rows: [], count: 0 })

  const handleStatusChange = (e) => setStatus(e.target.value)

  const handleView = (training) => {
    log.info(training)
  }

  useEffect(() => {
    loadStatuses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (statusesList.count) {
      const options = {
        rows: statusesList.rows
          .filter((s) => s.continue_flow)
          .map((s) => ({ id: s.id, name: s.status })),
        count: statusesList.count
      }
      setOptions(options)
    }
  }, [statusesList])

  useEffect(() => {
    if (status) {
      setIsLoading(true)
      getTrainingsByStatus(status)
        .then((res) => setRecords({ rows: res.data, count: res.data.length }))
        .catch((e) => handleError(e))
        .finally(() => setIsLoading(false))
    }
  }, [status])

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
      <section className="dropdown-container">
        <Dropdown
          id="status"
          label="Status"
          onChange={handleStatusChange}
          value={status}
          options={options}
        />
      </section>
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

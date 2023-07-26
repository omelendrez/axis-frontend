import { useEffect, useState } from 'react'

import { Loading, Calendar, CardList } from '@/components'

import usePage from '@/hooks/usePage'
import useTrainings from '@/hooks/useTrainings'
import useStatuses from '@/hooks/useStatuses'
import useNotification from '@/hooks/useNotification'

import {
  formatYMD,
  formatFullDate,
  isNewer,
  isEqual,
  initialValues
} from '@/helpers'
import { getPhotoUrl } from '@/services'

import './pendingTasks.css'
import { useNavigate } from 'react-router-dom'

const InputParameters = ({
  date,
  setToday,
  onCalendarChange,
  onStatusChange,
  statuses,
  selected,
  onConfirm
}) => (
  <article className="pending-tasks-container">
    <InputCalendar
      date={date}
      setToday={setToday}
      onChange={onCalendarChange}
    />
    <InputStatus
      statuses={statuses}
      onChange={onStatusChange}
      selected={selected}
    />
    <div className="pending-tasks-confirm-button-container">
      <button onClick={onConfirm}>Go</button>
    </div>
  </article>
)

const InputCalendar = ({ date, setToday, onChange }) => (
  <section className="pending-tasks-calendar">
    <Calendar
      onChange={onChange}
      date={date}
      tileDisabled={({ date }) => isNewer(date)}
    />
    <button
      className="calendar-today-button"
      onClick={setToday}
      disabled={isEqual(date)}
    >
      Today
    </button>
  </section>
)

const StatusSwitcher = ({ id, label, value, onChange }) => (
  <div className="pending-tasks-status-switch" key={id}>
    <input
      type="checkbox"
      id={id}
      role="switch"
      onChange={onChange}
      checked={value === 1}
    />
    <label htmlFor={id}>{label}</label>
  </div>
)

const InputStatus = ({ statuses, onChange, selected }) => (
  <section className="pending-tasks-statuses">
    <h6>Status to include</h6>
    {statuses.map((status) => (
      <StatusSwitcher
        key={status.id}
        id={status.id}
        label={`${status.status}, ${status.state}`}
        value={selected.includes(status.id) ? 1 : 0}
        onChange={onChange}
      />
    ))}
  </section>
)

const SelectedDateView = ({ date, onClick }) => (
  <div className="pending-tasks-date">
    <div>{formatFullDate(date)}</div>
    <div onClick={onClick}>
      <span className="material-icons">calendar_month</span>
    </div>
  </div>
)

const Card = ({ item, onView }) => {
  const {
    badge,
    course_name,
    full_name,
    company_name,
    status_name,
    state_name,
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
        <div className="ellipsis name">{full_name}</div>
        <div className="small-font">{company_name}</div>
        <div className={`status status-${status} small-font`}>
          {status_name} - {state_name}
        </div>

        {/* <div className="card-line-buttons">
          <div>
            <span className="material-icons thumb-up">thumb_up</span>
          </div>
          <div>
            <span className="material-icons thumb-down">thumb_down</span>
          </div>
        </div> */}
      </div>
    </article>
  )
}

const PendingTasks = () => {
  const [date, setDate] = useState(new Date())
  const [pagination, setPagination] = useState(initialValues)
  const [showInputParameters, setShowInputParameters] = useState(true)
  const [selectedStatuses, setSelectedStatuses] = useState([])

  const navigate = useNavigate()

  const { set: setPage } = usePage()

  const { set } = useNotification()

  const { statuses, load: loadStatuses } = useStatuses()
  const { data: statusList } = statuses

  const { trainings, load: loadTrainings } = useTrainings()
  const { data, isLoading } = trainings

  useEffect(() => {
    setPage('Pending Tasks')
    loadStatuses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleConfirm()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  const handleView = (training) => navigate(`/training/${training}`)

  const handleSelectedDateView = (e) => {
    e.preventDefault()
    setShowInputParameters(true)
  }

  const setToday = (e) => {
    e.preventDefault()
    handleCalendarChange(new Date())
  }

  const handleCalendarChange = (date) => setDate(date)

  const handleStatusChange = (e) => {
    const { id, checked } = e.target
    if (checked) {
      setSelectedStatuses((statuses) => [...statuses, parseInt(id, 10)])
    } else {
      setSelectedStatuses((statuses) =>
        statuses.filter((status) => status !== parseInt(id, 10))
      )
    }
  }

  const handleConfirm = (e) => {
    e?.preventDefault()
    if (selectedStatuses.length) {
      const payload = {
        date: formatYMD(date),
        statuses: selectedStatuses.join('-'),
        pagination
      }
      loadTrainings(payload)
      setShowInputParameters(false)
    } else {
      const notification = {
        type: 'info',
        message: 'Please select a status'
      }
      set(notification)
    }
  }

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      {!showInputParameters && date && (
        <SelectedDateView date={date} onClick={handleSelectedDateView} />
      )}
      {showInputParameters && (
        <InputParameters
          onCalendarChange={handleCalendarChange}
          onStatusChange={handleStatusChange}
          date={date}
          setToday={setToday}
          statuses={statusList.rows}
          selected={selectedStatuses}
          onConfirm={handleConfirm}
        />
      )}
      <CardList
        Card={Card}
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        onView={handleView}
        isLoading={isLoading}
        // loadItems={handleLoadItems}
      />
    </main>
  )
}

export default PendingTasks

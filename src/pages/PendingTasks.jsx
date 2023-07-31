import { useEffect, useState, useContext } from 'react'

import {
  Loading,
  CardList,
  SelectedDateView,
  InputParameters,
  Card
} from '@/components'

import usePage from '@/hooks/usePage'
import useTrainings from '@/hooks/useTrainings'
import useStatuses from '@/hooks/useStatuses'
import useNotification from '@/hooks/useNotification'

import { PendingTasksContext } from '@/context'

import { formatYMD, initialValues } from '@/helpers'

import { useNavigate } from 'react-router-dom'

import '../components/features/pending-tasks/pendingTasks.css'

const PendingTasks = () => {
  const { pendingTasksParams, setPendingTaksParams } =
    useContext(PendingTasksContext)

  const { date, selectedStatuses } = pendingTasksParams

  const [pagination, setPagination] = useState(initialValues)

  const [showInputParameters, setShowInputParameters] = useState(false)

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

  const handleCalendarChange = (date) =>
    setPendingTaksParams((p) => ({ ...p, date }))

  const handleStatusChange = (e) => {
    const { id, checked } = e.target
    if (checked) {
      setPendingTaksParams((p) => ({
        ...p,
        selectedStatuses: [...p.selectedStatuses, parseInt(id, 10)]
      }))
    } else {
      setPendingTaksParams((p) => ({
        ...p,
        selectedStatuses: p.selectedStatuses.filter(
          (status) => status !== parseInt(id, 10)
        )
      }))
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

  if (!data.rows) {
    return null
  }

  return (
    <main className="container-fluid pending-tasks">
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
      />
    </main>
  )
}

export default PendingTasks

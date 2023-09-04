import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Loading,
  CardList,
  SelectedDateView,
  InputParameters,
  Card,
  FloatingButtons,
  SelectAllRadioButtons
} from '@/components'

import usePage from '@/hooks/usePage'
import useTrainings from '@/hooks/useTrainings'
import useStatuses from '@/hooks/useStatuses'
import useUser from '@/hooks/useUser'

import { PendingTasksContext } from '@/context'

import { formatYMD, matchRoleStatus, initialValues, RADIO } from '@/helpers'

import '../components/features/pending-tasks/pendingTasks.css'

const PendingTasks = () => {
  const { pendingTasksParams, setPendingTaksParams } =
    useContext(PendingTasksContext)

  const { user } = useUser()

  const { date, selectedStatuses } = pendingTasksParams

  const [pagination, setPagination] = useState(initialValues)

  const [selectedRows, setSelectedRows] = useState([])

  const [showInputParameters, setShowInputParameters] = useState(false)

  const [radioSelected, setRadioSelected] = useState(RADIO.NONE)

  const navigate = useNavigate()

  const { set: setPage } = usePage()

  const { statuses, load: loadStatuses } = useStatuses()
  const { data: statusList } = statuses

  const [authorizedStatuses, setAuthorizedStatuses] = useState([])

  const { trainings, load: loadTrainings } = useTrainings()
  const { data, isLoading } = trainings

  useEffect(() => {
    setPage('My pending tasks')
    loadStatuses()

    return () => {
      setPendingTaksParams((params) => ({
        ...params,
        date: null
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (statusList.rows) {
      const authorizedStatuses = statusList.rows.filter((s) =>
        matchRoleStatus(user.roles, s.id)
      )
      setAuthorizedStatuses(authorizedStatuses)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusList.rows])

  useEffect(() => {
    if (authorizedStatuses.length) {
      const selectedStatuses = authorizedStatuses.map((status) =>
        parseInt(status.id, 10)
      )

      setPendingTaksParams((params) => ({
        ...params,
        selectedStatuses
      }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizedStatuses, pagination])

  useEffect(() => {
    if (!showInputParameters) handleConfirm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatuses])

  useEffect(() => {
    if (radioSelected === RADIO.NONE) {
      setSelectedRows([])
    } else {
      setSelectedRows(
        data.rows.filter((row) =>
          authorizedStatuses.find((r) => r.id === row.status)
        )
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioSelected])

  const handleView = (training) => {
    navigate(`/training/${training}`)
  }

  const handleSelectedDateView = (e) => {
    e.preventDefault()
    setShowInputParameters(true)
  }

  const setToday = (e) => {
    e.preventDefault()
    handleCalendarChange(new Date())
  }

  const handleCalendarChange = (date) =>
    setPendingTaksParams((params) => ({ ...params, date }))

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
    if (selectedStatuses?.length) {
      const payload = {
        date: formatYMD(date),
        statuses: selectedStatuses.join('-'),
        pagination
      }

      loadTrainings(payload)

      setShowInputParameters(false)
    }
  }

  const handleRadioButtonsChange = (option) => {
    setRadioSelected(option)
  }

  const handleApprove = () => {
    console.log('approve', selectedRows)
  }

  const handleReject = () => {
    console.log('reject', selectedRows)
  }

  if (!data.rows) {
    return null
  }

  return (
    <main className="container-fluid pending-tasks">
      {isLoading && <Loading />}
      {!showInputParameters && (
        <SelectedDateView date={date} onClick={handleSelectedDateView} />
      )}
      {showInputParameters && (
        <InputParameters
          onCalendarChange={handleCalendarChange}
          onStatusChange={handleStatusChange}
          date={date}
          setToday={setToday}
          statuses={authorizedStatuses}
          selectedStatuses={selectedStatuses}
          onConfirm={handleConfirm}
        />
      )}

      {data.count > 0 && (
        <SelectAllRadioButtons
          onChange={handleRadioButtonsChange}
          selected={radioSelected}
        />
      )}

      <CardList
        Card={Card}
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        onView={handleView}
        isLoading={isLoading}
        selectedItems={selectedRows}
        setSelected={setSelectedRows}
      />
      <FloatingButtons
        isVisible={selectedRows.length > 0}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </main>
  )
}

export default PendingTasks

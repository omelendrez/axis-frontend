import { useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  Loading,
  CardList,
  SelectedDateView,
  InputParameters,
  Card,
  FloatingButtons,
  SelectAllRadioButtons,
  Divider
} from '@/components'

import usePage from '@/hooks/usePage'
import useTrainings from '@/hooks/useTrainings'
import useStatuses from '@/hooks/useStatuses'
import useUser from '@/hooks/useUser'
import useApiMessages from '@/hooks/useApiMessages'

import {
  formatYMD,
  matchRoleStatus,
  RADIO,
  TRAINING_STATUS,
  USER_ROLE
} from '@/helpers'

import { approveMultiple, rejectMultiple } from '@/services'

import '../components/features/pending-tasks/pendingTasks.css'
import usePagination from '@/hooks/usePagination'
import usePending from '@/hooks/usePending'

const REDUCER_TYPES = {
  AUTHORIZED_STATUSES: 'AUTHORIZED_STATUSES',
  REFRESH: 'REFRESH'
}

const initialState = {
  authorizedStatuses: [],
  refresh: false
}

const reducer = (state, action) => {
  const { AUTHORIZED_STATUSES, REFRESH } = REDUCER_TYPES

  switch (action.type) {
    case AUTHORIZED_STATUSES:
      return {
        ...state,
        authorizedStatuses: action.payload
      }

    case REFRESH:
      return {
        ...state,
        refresh: action.payload
      }

    default:
      return state
  }
}

const PendingTasks = () => {
  const navigate = useNavigate()

  const { user } = useUser()
  const { roles: userRoles } = user

  const { apiMessage } = useApiMessages()

  const { set: setPage } = usePage()

  const [showInputParams, setShowInputParams] = useState(false)

  const { statuses, load: loadStatuses } = useStatuses()
  const { data: statusList } = statuses

  const { trainings, load: loadTrainings } = useTrainings()
  const { data, isLoading } = trainings

  const { pagination, setPagination } = usePagination()

  const { pending, setPending } = usePending()

  const { date, selectedStatuses } = pending

  const [selectedRows, setSelectedRows] = useState([])

  const [selectedRadioOption, setSelectedRadioOption] = useState(RADIO.NONE)

  const [state, dispatch] = useReducer(reducer, initialState)

  const { authorizedStatuses, refresh } = state

  const { AUTHORIZED_STATUSES, REFRESH } = REDUCER_TYPES

  useEffect(() => {
    setPage('My pending tasks')
    loadStatuses()

    return () => {
      setPending({
        ...pending
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (statusList.rows && userRoles) {
      const authorizedStatuses = statusList.rows.filter((s) =>
        matchRoleStatus(userRoles, s.id)
      )
      dispatch({
        type: AUTHORIZED_STATUSES,
        payload: authorizedStatuses
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusList])

  useEffect(() => {
    if (authorizedStatuses.length) {
      const selectedStatuses = authorizedStatuses.map((status) =>
        parseInt(status.id, 10)
      )

      setPending((pending) => ({
        ...pending,
        selectedStatuses
      }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizedStatuses, pagination])

  // useEffect(() => {
  //   if (!showInputParams) handleConfirm()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedStatuses])

  useEffect(() => {
    if (selectedRadioOption === RADIO.NONE) {
      setSelectedRows([])
    } else {
      const payload = data.rows.filter((row) =>
        authorizedStatuses.find((r) => r.id === row.status)
      )
      setSelectedRows(payload)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRadioOption, date])

  useEffect(() => {
    if (selectedStatuses.length) {
      loadTrainings({
        date: formatYMD(date),
        statuses: selectedStatuses.join('-'),
        pagination: { ...pagination }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, pending, refresh])

  const handleSelected = (payload) => setSelectedRows(payload)

  const handleView = (training) => navigate(`/training/${training}`)

  const handleSelectedDateView = (e) => {
    e.preventDefault()
    setShowInputParams(true)
  }

  const setToday = (e) => {
    e.preventDefault()
    handleCalendarChange(new Date())
  }

  const handleCalendarChange = (date) => setPending({ ...pending, date })

  const handleStatusChange = (e) => {
    const { id, checked } = e.target

    if (checked) {
      setPending({
        ...pending,
        selectedStatuses: [...selectedStatuses, parseInt(id, 10)]
      })
    } else {
      setPending({
        ...pending,
        selectedStatuses: selectedStatuses.filter(
          (status) => status !== parseInt(id, 10)
        )
      })
    }
  }

  const handleConfirm = (e) => {
    e?.preventDefault()
    if (selectedStatuses?.length) {
      dispatch({ type: REFRESH, payload: !refresh })
      setShowInputParams(false)
    }
  }

  const handleClose = (e) => {
    e.preventDefault()
    setShowInputParams(false)
  }

  const handleRadioButtonsChange = (option) => setSelectedRadioOption(option)

  const handleSelectAllNone = (selectedStatuses) =>
    setPending({
      ...pending,
      selectedStatuses
    })

  const buildPayload = (status) => ({
    records: selectedRows.map((r) => [r.id, status, user.id])
  })

  const handleApprove = () => {
    const payload = buildPayload(
      userRoles.find((r) => r.id === USER_ROLE.ACCOUNTS) // Either Accounts role or MD role
        ? TRAINING_STATUS.ACCOUNTS_DONE
        : TRAINING_STATUS.MD_DONE
    )

    approveMultiple(payload)
      .then((res) => {
        apiMessage(res)
        setSelectedRadioOption(RADIO.NONE)
        dispatch({ type: REFRESH, payload: !refresh })
        navigate('/pending-tasks')
      })
      .catch((e) => apiMessage(e))
  }

  const handleReject = () => {
    rejectMultiple(buildPayload(TRAINING_STATUS.CANCELLED))
      .then((res) => {
        apiMessage(res)

        setSelectedRadioOption(RADIO.NONE)

        dispatch({ type: REFRESH, payload: !refresh })

        navigate('/pending-tasks')
      })
      .catch((e) => apiMessage(e))
  }

  const multiApprover = Boolean(
    userRoles.find((r) => r.id === USER_ROLE.ACCOUNTS || r.id === USER_ROLE.MD)
  )

  if (!data.rows) {
    return null
  }

  return (
    <main className="container-fluid pending-tasks">
      {isLoading && <Loading />}

      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>My Pending Tasks</li>
        </ul>
      </nav>

      <Divider style={{ height: '1rem' }} />

      {!showInputParams && (
        <SelectedDateView date={date} onClick={handleSelectedDateView} />
      )}
      {showInputParams && (
        <InputParameters
          onCalendarChange={handleCalendarChange}
          onStatusChange={handleStatusChange}
          date={date}
          setToday={setToday}
          statuses={authorizedStatuses}
          selectedStatuses={selectedStatuses}
          onConfirm={handleConfirm}
          onClose={handleClose}
          onSelecteAllNone={handleSelectAllNone}
          records={data.count}
        />
      )}

      {data.count > 0 && multiApprover && (
        <SelectAllRadioButtons
          onChange={handleRadioButtonsChange}
          selected={selectedRadioOption}
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
        setSelected={multiApprover ? handleSelected : null}
      />
      <FloatingButtons
        isVisible={selectedRows?.length > 0}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </main>
  )
}

export default PendingTasks

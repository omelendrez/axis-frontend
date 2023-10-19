import { useEffect, useContext, useReducer, useState } from 'react'
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
import useApiMessages from '@/hooks/useApiMessages'

import { PendingTasksContext as PendingContext } from '@/context'

import {
  formatYMD,
  matchRoleStatus,
  initialValues,
  RADIO,
  TRAINING_STATUS,
  USER_ROLE
} from '@/helpers'

import { approveMultiple, rejectMultiple } from '@/services'

import '../components/features/pending-tasks/pendingTasks.css'

const REDUCER_TYPES = {
  AUTHORIZED_STATUSES: 'AUTHORIZED_STATUSES',
  REFRESH: 'REFRESH',
  SHOW_INPUT_PARAMS: 'SHOW_INPUT_PARAMS'
}

const initialState = {
  authorizedStatuses: [],
  refresh: false,
  showInputParameters: false
}

const reducer = (state, action) => {
  const { AUTHORIZED_STATUSES, REFRESH, SHOW_INPUT_PARAMS } = REDUCER_TYPES

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

    case SHOW_INPUT_PARAMS:
      return {
        ...state,
        showInputParameters: action.payload
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

  const { pendingTasksParams: pending, setPendingTaksParams: setPending } =
    useContext(PendingContext)
  const { date, selectedStatuses } = pending

  const { statuses, load: loadStatuses } = useStatuses()
  const { data: statusList } = statuses

  const { trainings, load: loadTrainings } = useTrainings()
  const { data, isLoading } = trainings

  const [pagination, setPagination] = useState(initialValues)
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRadioOption, setSelectedRadioOption] = useState(RADIO.NONE)

  const [state, dispatch] = useReducer(reducer, initialState)

  const { authorizedStatuses, showInputParameters, refresh } = state

  const { AUTHORIZED_STATUSES, REFRESH, SHOW_INPUT_PARAMS } = REDUCER_TYPES

  useEffect(() => {
    setPage('My pending tasks')
    loadStatuses()

    return () => {
      setPending((params) => ({
        ...params,
        date: null
      }))
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

      setPending((params) => ({
        ...params,
        selectedStatuses
      }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizedStatuses, pagination])

  // useEffect(() => {
  //   if (!showInputParameters) handleConfirm()
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
  }, [selectedRadioOption])

  useEffect(() => {
    const payload = {
      date: formatYMD(date),
      statuses: selectedStatuses.join('-'),
      pagination: { ...pagination }
    }

    if (selectedStatuses.length) {
      loadTrainings(payload)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, selectedStatuses, refresh])

  const handleSelected = (payload) => {
    setSelectedRows(payload)
  }

  const handleView = (training) => navigate(`/training/${training}`)

  const handleSelectedDateView = (e) => {
    e.preventDefault()
    dispatch({ type: SHOW_INPUT_PARAMS, payload: true })
  }

  const setToday = (e) => {
    e.preventDefault()
    handleCalendarChange(new Date())
  }

  const handleCalendarChange = (date) =>
    setPending((params) => ({ ...params, date }))

  const handleStatusChange = (e) => {
    const { id, checked } = e.target
    if (checked) {
      setPending((p) => ({
        ...p,
        selectedStatuses: [...p.selectedStatuses, parseInt(id, 10)]
      }))
    } else {
      setPending((p) => ({
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
      dispatch({ type: REFRESH, payload: !refresh })
      dispatch({ type: SHOW_INPUT_PARAMS, payload: false })
    }
  }

  const handleRadioButtonsChange = (option) => setSelectedRadioOption(option)

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

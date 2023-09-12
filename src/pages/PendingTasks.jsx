import { useEffect, useContext, useReducer } from 'react'
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

import { PendingTasksContext } from '@/context'

import {
  formatYMD,
  matchRoleStatus,
  initialValues,
  RADIO,
  TRAINING_STATUS
} from '@/helpers'

import { approveMultiple, rejectMultiple } from '@/services'

import '../components/features/pending-tasks/pendingTasks.css'

const REDUCER_TYPE = {
  PAGINATION: 'PAGINATION',
  SELECTED_ROWS: 'SELECTED_ROWS',
  SHOW_INPUT_PARAMS: 'SHOW_INPUT_PARAMS',
  REFRESH: 'REFRESH',
  SELECTED_RADIO: 'SELECTED_RADIO',
  AUTHORIZED_STATUSES: 'AUTHORIZED_STATUSES'
}

const initialState = {
  pagination: initialValues,
  selectedRows: [],
  showInputParameters: false,
  refresh: false,
  selectedRadioOption: RADIO.NONE,
  authorizedStatuses: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case REDUCER_TYPE.PAGINATION:
      return {
        ...state,
        pagination: action.payload
      }

    case REDUCER_TYPE.SELECTED_ROWS:
      return {
        ...state,
        selectedRows: action.payload
      }

    case REDUCER_TYPE.SHOW_INPUT_PARAMS:
      return {
        ...state,
        showInputParameters: action.payload
      }

    case REDUCER_TYPE.REFRESH:
      return {
        ...state,
        refresh: action.payload
      }

    case REDUCER_TYPE.SELECTED_RADIO:
      return {
        ...state,
        selectedRadioOption: action.payload
      }

    case REDUCER_TYPE.AUTHORIZED_STATUSES:
      return {
        ...state,
        authorizedStatuses: action.payload
      }

    default:
      return state
  }
}

const PendingTasks = () => {
  const navigate = useNavigate()

  const { user } = useUser()
  const { apiMessage } = useApiMessages()
  const { set: setPage } = usePage()

  const { pendingTasksParams, setPendingTaksParams } =
    useContext(PendingTasksContext)
  const { date, selectedStatuses } = pendingTasksParams

  const { statuses, load: loadStatuses } = useStatuses()
  const { data: statusList } = statuses

  const { trainings, load: loadTrainings } = useTrainings()
  const { data, isLoading } = trainings

  const [state, dispatch] = useReducer(reducer, initialState)

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
      dispatch({
        type: REDUCER_TYPE.AUTHORIZED_STATUSES,
        payload: authorizedStatuses
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusList.rows])

  useEffect(() => {
    if (state.authorizedStatuses.length) {
      const selectedStatuses = state.authorizedStatuses.map((status) =>
        parseInt(status.id, 10)
      )

      setPendingTaksParams((params) => ({
        ...params,
        selectedStatuses
      }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.authorizedStatuses.length, state.pagination])

  useEffect(() => {
    if (!state.showInputParameters) handleConfirm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatuses])

  useEffect(() => {
    if (state.selectedRadioOption === RADIO.NONE) {
      dispatch({ type: REDUCER_TYPE.SELECTED_ROWS, payload: [] })
    } else {
      dispatch({
        type: REDUCER_TYPE.SELECTED_ROWS,
        payload: data.rows.filter((row) =>
          state.authorizedStatuses.find((r) => r.id === row.status)
        )
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedRadioOption])

  useEffect(() => {
    const payload = {
      date: formatYMD(date),
      statuses: selectedStatuses.join('-'),
      pagination: state.pagination
    }

    loadTrainings(payload)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.refresh])

  const handleView = (training) => {
    navigate(`/training/${training}`)
  }

  const handleSelectedDateView = (e) => {
    e.preventDefault()
    dispatch({ type: REDUCER_TYPE.SHOW_INPUT_PARAMS, payload: true })
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
      dispatch({ type: REDUCER_TYPE.REFRESH, payload: !state.refresh })
      dispatch({ type: REDUCER_TYPE.SHOW_INPUT_PARAMS, payload: false })
    }
  }

  const handleRadioButtonsChange = (option) => {
    dispatch({ type: REDUCER_TYPE.SELECTED_RADIO, payload: option })
  }

  const buildPayload = (status) => ({
    records: state.selectedRows.map((r) => [r.id, status, user.id])
  })

  const handleApprove = () => {
    approveMultiple(buildPayload(8))
      .then((res) => {
        apiMessage(res)
        dispatch({ type: REDUCER_TYPE.SELECTED_RADIO, payload: RADIO.NONE })
        dispatch({ type: REDUCER_TYPE.REFRESH, payload: !state.refresh })
      })
      .catch((e) => apiMessage(e))
  }

  const handleReject = () => {
    rejectMultiple(buildPayload(TRAINING_STATUS.CANCELLED))
      .then((res) => {
        apiMessage(res)
        dispatch({ type: REDUCER_TYPE.SELECTED_RADIO, payload: RADIO.NONE })
        dispatch({ type: REDUCER_TYPE.REFRESH, payload: !state.refresh })
      })
      .catch((e) => apiMessage(e))
  }

  if (!data.rows) {
    return null
  }

  return (
    <main className="container-fluid pending-tasks">
      {isLoading && <Loading />}
      {!state.showInputParameters && (
        <SelectedDateView date={date} onClick={handleSelectedDateView} />
      )}
      {state.showInputParameters && (
        <InputParameters
          onCalendarChange={handleCalendarChange}
          onStatusChange={handleStatusChange}
          date={date}
          setToday={setToday}
          statuses={state.authorizedStatuses}
          selectedStatuses={selectedStatuses}
          onConfirm={handleConfirm}
        />
      )}

      {data.count > 0 && (
        <SelectAllRadioButtons
          onChange={handleRadioButtonsChange}
          selected={state.selectedRadioOption}
        />
      )}

      <CardList
        Card={Card}
        data={data}
        pagination={state.pagination}
        onPagination={(pagination) =>
          dispatch({ type: REDUCER_TYPE.PAGINATION, payload: pagination })
        }
        onView={handleView}
        isLoading={isLoading}
        selectedItems={state.selectedRows}
        setSelected={(rows) =>
          dispatch({ type: REDUCER_TYPE.SELECTED_ROWS, payload: rows })
        }
      />
      <FloatingButtons
        isVisible={state.selectedRows.length > 0}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </main>
  )
}

export default PendingTasks

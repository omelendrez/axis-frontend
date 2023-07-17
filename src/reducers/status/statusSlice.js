import { createSlice } from '@reduxjs/toolkit'
import {
  createStatus,
  updateStatus,
  getStatuses,
  deleteStatus
} from '@/services'
import { handleError } from '../error'

const initialState = {
  data: { rows: [], count: 0 },
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const statusSlice = createSlice({
  name: 'statuses',
  initialState: initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.error = null
    },
    setData(state, action) {
      state.data = action.payload
    },
    setSuccess(state) {
      state.isSuccess = true
      state.isLoading = false
      state.isError = false
    },
    setError(state, action) {
      state.isSuccess = false
      state.isLoading = false
      state.isError = true
      state.error = action.payload
    },
    reset(state) {
      state.isSuccess = false
      state.isLoading = false
      state.isError = false
    }
  }
})

export default statusSlice.reducer

let lastPagination = null

export function loadStatuses(pagination) {
  const { setLoading, setData, reset } = statusSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      lastPagination = pagination
      const { data } = await getStatuses(pagination)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeStatus(id) {
  const { setLoading, setSuccess, reset } = statusSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteStatus(id)
      dispatch(loadStatuses(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addStatus(payload) {
  const { setLoading, setSuccess, reset } = statusSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createStatus(payload)
      dispatch(loadStatuses(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyStatus(id, payload) {
  const { setLoading, setSuccess, reset } = statusSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateStatus(id, payload)
      dispatch(loadStatuses(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

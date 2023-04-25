import { createSlice } from '@reduxjs/toolkit'
import {
  createState,
  updateState,
  getStates,
  deleteState
} from '../../services'
import { handleError } from '../error'

const initialState = {
  data: { rows: [], count: 0 },
  isFirstLoad: true,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const stateSlice = createSlice({
  name: 'states',
  initialState: initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.error = null
    },
    setData(state, action) {
      state.isFirstLoad = false
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

export default stateSlice.reducer

export function loadStates(search) {
  const { setLoading, setData, reset } = stateSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const { data } = await getStates(search)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeState(id) {
  const { setLoading, setSuccess, reset } = stateSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteState(id)
      dispatch(loadStates())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addState(payload) {
  const { setLoading, setSuccess, reset } = stateSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createState(payload)
      dispatch(loadStates())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyState(id, payload) {
  const { setLoading, setSuccess, reset } = stateSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateState(id, payload)
      dispatch(loadStates())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

import { createSlice } from '@reduxjs/toolkit'
import {
  getLearners,
  deleteLearner,
  createLearner,
  updateLearner
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

export const learnerSlice = createSlice({
  name: 'learners',
  initialState: initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.error = null
    },
    setSuccess(state) {
      state.isSuccess = true
      state.isLoading = false
      state.isError = false
    },
    setData(state, action) {
      state.isFirstLoad = false
      state.data = action.payload
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

export default learnerSlice.reducer

export function loadLearners(pagination) {
  const { setLoading, setData, reset } = learnerSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const { data } = await getLearners(pagination)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeLearner(id) {
  const { setLoading, setSuccess, reset } = learnerSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteLearner(id)
      dispatch(loadLearners())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addLearner(payload) {
  const { setLoading, setSuccess, reset } = learnerSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createLearner(payload)
      dispatch(loadLearners())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyLearner(id, payload) {
  const { setLoading, setSuccess, reset } = learnerSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateLearner(id, payload)
      dispatch(loadLearners())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

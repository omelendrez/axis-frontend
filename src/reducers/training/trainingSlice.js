import { createSlice } from '@reduxjs/toolkit'
import {
  createTraining,
  updateTraining,
  getTrainings,
  deleteTraining
} from '../../services'
import { handleError } from '../error'

let learner = null

const initialState = {
  data: { rows: [], count: 0 },
  isFirstLoad: true,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const trainingSlice = createSlice({
  name: 'trainings',
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

export default trainingSlice.reducer

export function loadTrainings(id) {
  const { setLoading, setData, reset } = trainingSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      learner = id
      const { data } = await getTrainings(id)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeTraining(id) {
  const { setLoading, setSuccess, reset } = trainingSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteTraining(id)
      dispatch(loadTrainings(learner))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addTraining(payload) {
  const { setLoading, setSuccess, reset } = trainingSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createTraining(payload)
      dispatch(loadTrainings(learner))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyTraining(id, payload) {
  const { setLoading, setSuccess, reset } = trainingSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateTraining(id, payload)
      dispatch(loadTrainings(learner))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

import { createSlice } from '@reduxjs/toolkit'
import {
  createTraining,
  deleteTraining,
  getLearnerTrainings,
  getTrainingView,
  getTrainings,
  updateTraining
} from '@/services'
import { handleError } from '../error'

let learner = null

const initialState = {
  data: { rows: [], count: 0 },
  learnerTrainings: { rows: [], count: 0 },
  view: {},
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
      state.data = action.payload
    },
    setLearnerTrainings(state, action) {
      state.data = action.payload
    },
    setView(state, action) {
      state.view = action.payload
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

export function loadTrainings({ date, statuses, pagination }) {
  const { setLoading, setData, reset } = trainingSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const { data } = await getTrainings({ date, statuses, pagination })
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function loadLearnerTrainings(id) {
  const { setLoading, setLearnerTrainings, reset } = trainingSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      learner = id
      const { data } = await getLearnerTrainings(id)
      dispatch(setLearnerTrainings(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function loadTrainingView(id) {
  const { setView, reset } = trainingSlice.actions

  return async (dispatch) => {
    try {
      const { data } = await getTrainingView(id)
      dispatch(setView(data))
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
      dispatch(loadLearnerTrainings(learner))
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
      dispatch(loadLearnerTrainings(learner))
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
      dispatch(loadLearnerTrainings(learner))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

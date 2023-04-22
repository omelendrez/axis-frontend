import { createSlice } from '@reduxjs/toolkit'
import {
  getTrainees,
  deleteTrainee,
  createTrainee,
  updateTrainee
} from '../../services'
import { handleError } from '../error'

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const userSlice = createSlice({
  name: 'trainees',
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

export default userSlice.reducer

export function loadTrainees(search) {
  const { setLoading, setData, reset } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const { data } = await getTrainees(search)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeTrainee(id) {
  const { setLoading, setSuccess, reset } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteTrainee(id)
      dispatch(loadTrainees())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addTrainee(payload) {
  const { setLoading, setSuccess, reset } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createTrainee(payload)
      dispatch(loadTrainees())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyTrainee(id, payload) {
  const { setLoading, setSuccess, reset } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateTrainee(id, payload)
      dispatch(loadTrainees())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

import { createSlice } from '@reduxjs/toolkit'
import {
  createState,
  updateState,
  getStates,
  deleteState
} from '../../services'
import { getApiErrorMessage, log } from '../../helpers'
import { setMessage } from '../notification/notificationSlice'

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const userSlice = createSlice({
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

export default userSlice.reducer

export function loadStates(search) {
  const { setLoading, setData, reset } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const { data } = await getStates(search)
      dispatch(setData(data))
      setTimeout(() => {
        dispatch(reset())
      }, 1000)
    } catch (error) {
      const message = {
        type: 'error',
        message: getApiErrorMessage(error)
      }
      log.error(error)
      dispatch(setMessage(message))
      setTimeout(() => {
        dispatch(reset())
      }, 1000)
    }
  }
}

export function removeState(id) {
  const { setLoading, setSuccess, reset } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteState(id)
      dispatch(loadStates())
      dispatch(setSuccess())
    } catch (error) {
      const message = {
        type: 'error',
        message: getApiErrorMessage(error)
      }
      log.error(error)
      dispatch(setMessage(message))
      setTimeout(() => {
        dispatch(reset())
      }, 1000)
    }
  }
}

export function addState(payload) {
  const { setLoading, setSuccess, reset } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createState(payload)
      dispatch(loadStates())
      dispatch(setSuccess())
    } catch (error) {
      const message = {
        type: 'error',
        message: getApiErrorMessage(error)
      }
      log.error(error)
      dispatch(setMessage(message))
      setTimeout(() => {
        dispatch(reset())
      }, 1000)
    }
  }
}

export function modifyState(id, payload) {
  const { setLoading, setSuccess, reset } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateState(id, payload)
      dispatch(loadStates())
      dispatch(setSuccess())
    } catch (error) {
      const message = {
        type: 'error',
        message: error?.message
      }
      log.error(error)
      dispatch(setMessage(message))
      setTimeout(() => {
        dispatch(reset())
      }, 1000)
    }
  }
}

import { createSlice } from '@reduxjs/toolkit'
import { createRole, updateRole, getRoles, deleteRole } from '../../services'
import { getApiErrorMessage, log } from '../../helpers'
import { setMessage } from '../notification/notificationSlice'

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const roleSlice = createSlice({
  name: 'roles',
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

export default roleSlice.reducer

export function loadRoles(search) {
  const { setLoading, setData, reset } = roleSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const { data } = await getRoles(search)
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

export function removeRole(id) {
  const { setLoading, setSuccess, reset } = roleSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteRole(id)
      dispatch(loadRoles())
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

export function addRole(payload) {
  const { setLoading, setSuccess, reset } = roleSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createRole(payload)
      dispatch(loadRoles())
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

export function modifyRole(id, payload) {
  const { setLoading, setSuccess, reset } = roleSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateRole(id, payload)
      dispatch(loadRoles())
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

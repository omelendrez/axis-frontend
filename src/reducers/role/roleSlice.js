import { createSlice } from '@reduxjs/toolkit'
import { createRole, updateRole, getRoles, deleteRole } from '@/services'
import { handleError } from '../error'

const initialState = {
  data: { rows: [], count: 0 },
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

let lastPagination = null

export function loadRoles(pagination) {
  const { setLoading, setData, reset } = roleSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      lastPagination = pagination
      const { data } = await getRoles(pagination)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeRole(id) {
  const { setLoading, setSuccess, reset } = roleSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteRole(id)
      dispatch(loadRoles(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addRole(payload) {
  const { setLoading, setSuccess, reset } = roleSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createRole(payload)
      dispatch(loadRoles(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyRole(id, payload) {
  const { setLoading, setSuccess, reset } = roleSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateRole(id, payload)
      dispatch(loadRoles(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

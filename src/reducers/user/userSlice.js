import { createSlice } from '@reduxjs/toolkit'
import { createUser, updateUser, getUsers, deleteUser } from '../../services'
import { handleError } from '../error'

const initialState = {
  data: { rows: [], count: 0 },
  isFirstLoad: true,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const userSlice = createSlice({
  name: 'users',
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

export default userSlice.reducer

let lastPagination = null

export function loadUsers(pagination) {
  const { setLoading, setData, reset } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      lastPagination = pagination
      const { data } = await getUsers(pagination)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeUser(id) {
  const { setLoading, setSuccess, reset } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteUser(id)
      dispatch(loadUsers(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addUser(payload) {
  const { setLoading, setSuccess, reset } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createUser(payload)
      dispatch(loadUsers(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyUser(id, payload) {
  const { setLoading, setSuccess, reset } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateUser(id, payload)
      dispatch(loadUsers(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

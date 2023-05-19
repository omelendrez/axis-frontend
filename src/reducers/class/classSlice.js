import { createSlice } from '@reduxjs/toolkit'
import {
  createClass,
  updateClass,
  getClasses,
  deleteClass
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

export const classSlice = createSlice({
  name: 'classes',
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

export default classSlice.reducer

let lastPagination = null

export function loadClasses(pagination) {
  const { setLoading, setData, reset } = classSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      lastPagination = pagination
      const { data } = await getClasses(pagination)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeClass(id) {
  const { setLoading, setSuccess, reset } = classSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteClass(id)
      dispatch(loadClasses(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addClass(payload) {
  const { setLoading, setSuccess, reset } = classSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createClass(payload)
      dispatch(loadClasses(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyClass(id, payload) {
  const { setLoading, setSuccess, reset } = classSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateClass(id, payload)
      dispatch(loadClasses(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

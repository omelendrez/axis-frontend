import { createSlice } from '@reduxjs/toolkit'
import {
  createClassroom,
  updateClassroom,
  getClassrooms,
  deleteClassroom
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

export function loadClassrooms(pagination) {
  const { setLoading, setData, reset } = classSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      lastPagination = pagination
      const { data } = await getClassrooms(pagination)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeClassroom(id) {
  const { setLoading, setSuccess, reset } = classSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteClassroom(id)
      dispatch(loadClassrooms(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addClassroom(payload) {
  const { setLoading, setSuccess, reset } = classSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createClassroom(payload)
      dispatch(loadClassrooms(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyClassroom(id, payload) {
  const { setLoading, setSuccess, reset } = classSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateClassroom(id, payload)
      dispatch(loadClassrooms(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

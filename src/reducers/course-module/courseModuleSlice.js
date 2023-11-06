import { createSlice } from '@reduxjs/toolkit'
import {
  createCourseModule,
  updateCourseModule,
  getCourseModules,
  deleteCourseModule
} from '@/services'
import { handleError } from '../error'

const initialState = {
  data: { rows: [], count: 0 },
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const courseModuleSlice = createSlice({
  name: 'course-modules',
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

export default courseModuleSlice.reducer

let lastPagination = null

export function loadCourseModules(pagination) {
  const { setLoading, setData, reset } = courseModuleSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      lastPagination = pagination
      const { data } = await getCourseModules(pagination)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeCourseModule(id) {
  const { setLoading, setSuccess, reset } = courseModuleSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteCourseModule(id)
      dispatch(loadCourseModules(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addCourseModule(payload) {
  const { setLoading, setSuccess, reset } = courseModuleSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createCourseModule(payload)
      dispatch(loadCourseModules(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyCourseModule(id, payload) {
  const { setLoading, setSuccess, reset } = courseModuleSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateCourseModule(id, payload)
      dispatch(loadCourseModules(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}
